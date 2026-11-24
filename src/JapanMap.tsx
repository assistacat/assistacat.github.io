import photoCredits from './japan-scenic-photos.json';
import { useEffect, useRef, useState } from 'react';
import { select as selectElement } from 'd3-selection';
import 'd3-transition';
import { zoom, zoomIdentity } from 'd3-zoom';
import savedPlaces from './japan-places.json';
import shapes from './japan-shapes.json';

type Place = { name: string; prefecture: string; lists: string[]; url: string; visited?: boolean; photo?: string; note?: string };
const photos: Record<string, { src: string; source: string; credit: string; license: string; licenseUrl: string }> = photoCredits;
const places: Place[] = savedPlaces;
const scenicName = /\b(?:mount(?:ain)?|mt\.?|lake|waterfalls?|falls|beach|coast(?:line)?|cape|gorge|valley|marsh|wetlands?|dunes?|plateau|observator(?:y|ies)|viewpoint|lookout|garden|national park|botanical park|nature park|canyon|scenic|forest|volcano|crater|island|peninsula|terraces?)\b|展望|渓谷|滝|海岸|岬|高原|湿原|庭園|砂丘/iu;
const commercialName = /\b(?:hotel|hostel|store|shop|restaurant|cafe|station|airport|rentals?)\b/iu;
const scenicPlaces = places.filter(place => (Boolean(photos[place.name]) || scenicName.test(place.name)) && !commercialName.test(place.name));

function ScenicPhoto({ place }: { place: Place }) {
  const photo = photos[place.name];
  const [open, setOpen] = useState(false);
  return (
    <div className="japan-scenic-preview"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setOpen(false); }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
      <h4><a href={place.url} target="_blank" rel="noopener noreferrer"
        onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setOpen(true); }}>
        {place.name} <span aria-hidden="true">↗</span>
      </a></h4>
      {open && <figure>
        <img src={photo.src} alt={place.name} />
        <figcaption>
          {photo.credit && <details><summary>Image source</summary><a href={photo.source}>{photo.credit}</a> · <a href={photo.licenseUrl}>{photo.license}</a></details>}
        </figcaption>
      </figure>}
    </div>
  );
}

// Use the largest land polygon so offshore islands don't pull labels off the map.
const prefectureLabels = shapes.flatMap(({ name, d }) => {
  let best: { x: number; y: number; area: number } | undefined;
  for (const ring of d.matchAll(/M([^Z]+)Z/g)) {
    const points = ring[1].split('L').map(point => point.split(',').map(Number));
    let area = 0;
    let x = 0;
    let y = 0;
    points.forEach(([ax, ay], index) => {
      const [bx, by] = points[(index + 1) % points.length];
      const cross = ax * by - bx * ay;
      area += cross;
      x += (ax + bx) * cross;
      y += (ay + by) * cross;
    });
    if (area && (!best || Math.abs(area) > best.area)) {
      best = { x: x / (3 * area), y: y / (3 * area), area: Math.abs(area) };
    }
  }
  return best ? [{ name, ...best }] : [];
}).sort((a, b) => b.area - a.area);

function visiblePrefectureLabels(transform: typeof zoomIdentity, selected: string) {
  if (transform.k < 1.65 && !selected) {
    const regions = [
      { name: 'Hokkaido', x: 501, y: 116 },
      { name: 'Tohoku', x: 423, y: 251 },
      { name: 'Kanto', x: 383, y: 378 },
      { name: 'Chubu', x: 316, y: 349 },
      { name: 'Kansai', x: 252, y: 421 },
      { name: 'Chugoku', x: 171, y: 415 },
      { name: 'Shikoku', x: 164, y: 484 },
      { name: 'Kyushu', x: 79, y: 516 },
    ];
    return regions.flatMap(({ name, x, y }) => {
      const [screenX, screenY] = transform.apply([x, y]);
      return screenX > 40 && screenX < 580 && screenY > 62 && screenY < 623
        ? [{ name, x: screenX, y: screenY }]
        : [];
    });
  }

  const ordered = [
    ...prefectureLabels.filter(label => label.name === selected),
    ...prefectureLabels.filter(label => label.name !== selected),
  ];
  const visible: { name: string; x: number; y: number; width: number }[] = [];
  for (const label of ordered) {
    const [x, y] = transform.apply([label.x, label.y]);
    const width = label.name.length * 8 + 12;
    if (x < width / 2 || x > 620 - width / 2 || y < 62 || y > 623) continue;
    if (visible.some(other => Math.abs(y - other.y) < 26 && Math.abs(x - other.x) < (width + other.width) / 2)) continue;
    visible.push({ name: label.name, x, y, width });
  }
  return visible;
}

export default function JapanMap() {
  const [prefecture, select] = useState('');
  const [highlightPage, setHighlightPage] = useState(0);
  const [transform, setTransform] = useState(zoomIdentity);
  const scale = transform.k;
  const atlas = useRef<SVGSVGElement>(null);
  const layer = useRef<SVGGElement>(null);
  const behavior = useRef<ReturnType<typeof zoom<SVGSVGElement, unknown>> | null>(null);

  useEffect(() => {
    if (!atlas.current || !layer.current) return;
    const surface = selectElement(atlas.current);
    const artwork = selectElement(layer.current);
    const interaction = zoom<SVGSVGElement, unknown>()
      .extent([[0, 0], [620, 640]])
      .translateExtent([[-100, -100], [720, 740]])
      .scaleExtent([1, 16])
      .clickDistance(5)
      .on('zoom', event => {
        artwork.attr('transform', event.transform.toString());
        setTransform(event.transform);
      });
    behavior.current = interaction;
    surface.call(interaction).on('wheel.zoom', null).on('dblclick.zoom', null);
    return () => {
      surface.interrupt().on('.zoom', null);
      behavior.current = null;
    };
  }, []);

  function controlMap(action: (surface: NonNullable<typeof atlas.current>, interaction: NonNullable<typeof behavior.current>) => void) {
    if (atlas.current && behavior.current) action(atlas.current, behavior.current);
  }

  function zoomBy(factor: number) {
    controlMap((node, interaction) => {
      const surface = selectElement(node).interrupt();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) surface.call(interaction.scaleBy, factor);
      else surface.transition().duration(220).call(interaction.scaleBy, factor);
    });
  }

  function choose(name: string) {
    select(name);
    setHighlightPage(0);
    controlMap((node, interaction) => {
      const region = [...node.querySelectorAll<SVGPathElement>('path[data-prefecture]')]
        .find(path => path.dataset.prefecture === name);
      let target = zoomIdentity;
      if (region) {
        const { x, y, width, height } = region.getBBox();
        const magnification = Math.max(1, Math.min(12, 480 / Math.max(width, height, 1)));
        target = target.translate(310, 320).scale(magnification).translate(-x - width / 2, -y - height / 2);
      }
      const surface = selectElement(node).interrupt();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) surface.call(interaction.transform, target);
      else surface.transition().duration(320).call(interaction.transform, target);
    });
  }

  const counts = new Map<string, number>();
  for (const place of scenicPlaces) counts.set(place.prefecture, (counts.get(place.prefecture) ?? 0) + 1);
  const highlights = scenicPlaces
    .filter(place => prefecture ? place.prefecture === prefecture : Boolean(photos[place.name]))
    .sort((a, b) => Number(Boolean(photos[b.name])) - Number(Boolean(photos[a.name])))
    ;
  const visibleHighlights = highlights.slice(highlightPage * 4, highlightPage * 4 + 4);
  const featured = places.filter(place => place.visited && place.photo).slice(0, 5);
  return <section className="japan section-pad" id="japan" aria-labelledby="japan-title">
    <header className="japan-heading">
      <div>
        <h2 id="japan-title">Explore Japan</h2>
        <p>Scenic places I’ve saved for future trips to Japan.</p>
      </div>
      <span className="japan-atlas-mark" lang="ja" aria-hidden="true">日本</span>
    </header>
    {!!featured.length && <ul className="japan-photos">{featured.map(place => <li key={place.url}>
      <figure><img src={place.photo} alt={place.name} loading="lazy" /><figcaption>{place.name}{place.note && <p>{place.note}</p>}</figcaption></figure>
    </li>)}</ul>}
    <div className="japan-layout">
      <div className="japan-map-panel">
        <div className="japan-atlas">
          <div className="japan-compass" aria-hidden="true"><span>N</span><b>✦</b></div>

          <div className="japan-map-controls" aria-label="Map controls">
            <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.5)} disabled={scale >= 16}>+</button>
            <button type="button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.5)} disabled={scale <= 1}>−</button>
            <button type="button" onClick={() => choose('')}>Reset</button>
          </div>
          <svg ref={atlas} viewBox="0 0 620 640" aria-label="Interactive map of Japan" role="group">
            <g ref={layer}>
            <rect className="japan-inset" x="20" y="145" width="148" height="108" rx="10" />
            <text x="29" y="171">OKINAWA</text>
            <text x="162" y="255">SEA OF JAPAN</text>
            <text x="405" y="487">PACIFIC OCEAN</text>
            {shapes.map(({ name, d }) => {
              const count = counts.get(name) ?? 0;
              const activate = () => choose(prefecture === name ? '' : name);
              return <path key={name} d={d} data-prefecture={name} role="button" tabIndex={0}
                aria-label={name + ', ' + count + ' places'}
                aria-pressed={prefecture === name}
                data-density={count === 0 ? 0 : count < 10 ? 1 : count < 50 ? 2 : 3}
                onClick={activate} onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activate();
                  }
                }}>
                <title>{name} · {count} saved places</title>
              </path>;
            })}
            </g>
            <g className="japan-prefecture-labels" aria-hidden="true">
              {visiblePrefectureLabels(transform, prefecture).map(label => (
                <text key={label.name} x={label.x} y={label.y}
                  textAnchor="middle" dominantBaseline="central"
                  className={label.name === prefecture ? 'is-selected' : undefined}>
                  {label.name}
                </text>
              ))}
            </g>
          </svg>
          <div className="japan-map-footer">
            <p className="japan-caption">Select a prefecture · Drag to pan · Pinch to zoom</p>
            <a href="https://github.com/dataofjapan/land">Boundary data</a>
          </div>
        </div>
      </div>
      <aside className="japan-highlights" aria-labelledby="japan-highlights-title">
        <div className="japan-panel-heading">
          <h3 id="japan-highlights-title" aria-live="polite">{prefecture || 'Scenic highlights'}</h3>
          {prefecture && <p>{counts.get(prefecture) ?? 0} saved scenic spots</p>}
        </div>
        <label htmlFor="japan-prefecture">Prefecture</label>
        <select id="japan-prefecture" value={prefecture} onChange={event => choose(event.target.value)}>
          <option value="">All Japan</option>
          {shapes.map(shape => shape.name).sort().map(name => <option key={name}>{name}</option>)}
        </select>
        {!highlights.length && <p>No saved scenic spots here yet. Select another prefecture.</p>}
        {visibleHighlights.map(place => <article className="japan-highlight" key={place.url}>
          <div className="japan-spot-meta"><small>{place.prefecture}</small>
            {photos[place.name] && <span className="japan-photo-marker" aria-label="Photo available" />}
          </div>
          {photos[place.name] ? <ScenicPhoto place={place} /> : <h4><a href={place.url} target="_blank" rel="noopener noreferrer">{place.name} <span aria-label="on Google Maps">↗</span></a></h4>}
        </article>)}
        {highlights.length > 4 && <button className="japan-next-highlights" type="button"
          onClick={() => setHighlightPage(page => (page + 1) % Math.ceil(highlights.length / 4))}>
          More scenic spots <span aria-hidden="true">→</span>
        </button>}
      </aside>
    </div>
  </section>;
}
