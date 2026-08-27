import { useState } from 'react';

const projects = [
  {
    no: '01',
    kicker: 'HR ANALYTICS · PYTHON · POWER BI',
    title: 'Attendance, decoded.',
    stat: '86K+',
    statLabel: 'records consolidated',
    body: 'A Python analytics pipeline that brought together 131 leave files, employee shift calendars and monthly attendance ratios — producing clean, reliable reporting for workforce decisions.',
    tone: 'red',
  },
  {
    no: '02',
    kicker: 'AUTOMATION · POWER APPS · SHAREPOINT',
    title: 'Coaching at scale.',
    stat: '2,000+',
    statLabel: 'employees supported',
    body: 'An automated employee development system spanning submissions, approvals, learning records and progress monitoring — designed to remove friction from a company-wide process.',
    tone: 'blue',
  },
  {
    no: '03',
    kicker: 'MARKETING ANALYTICS · R · TABLEAU',
    title: 'Finding the buying pattern.',
    stat: '58K+',
    statLabel: 'subscriptions analysed',
    body: 'Corporate subscription behaviour transformed into pricing and targeting insights, helping a B2B marketing team make clearer decisions across publications and school segments.',
    tone: 'yellow',
  },
];

const experience = [
  ['2026', 'Murata Electronics Singapore', 'HR Data Analytics Intern'],
  ['2026', 'TÜV SÜD', 'Global Marketing Intern'],
  ['2025—26', 'NUS Computing', 'Data Management & Visualisation TA'],
  ['2025', 'SPH Media', 'B2B Marketing Analytics Intern'],
];

export default function Home() {
  const [mode, setMode] = useState<'focus' | 'play'>('focus');

  return (
    <main className={mode === 'play' ? 'play-mode' : ''}>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Ethan Ong, home"><span>EO</span><b>ETHAN ONG</b></a>
        <div className="nav-links"><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a></div>
        <a className="resume-pill" href="/Ethan_Ong_CV.pdf" target="_blank" rel="noreferrer">RÉSUMÉ <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> DATA, DESIGN &amp; DETERMINATION</p>
          <h1 aria-label="Looking beyond the data">
            <span className="jp-line">データの向こう側へ</span>
            <span className="display-line">BEYOND</span>
            <span className="display-line outline">THE DATA.</span>
          </h1>
          <div className="intro-row">
            <p>Hi, I&apos;m <strong>Ethan</strong> — a Business Analytics student at NUS. I turn messy information into clear, useful decisions.</p>
            <a className="spring-button" href="#work"><span>SEE MY WORK</span><b>↓</b></a>
          </div>
        </div>

        <div className="hero-collage" aria-label="A playful collage about Ethan">
          <div className="data-buddy" aria-hidden="true">
            <i className="buddy-antenna" />
            <span className="buddy-eye left" /><span className="buddy-eye right" />
            <span className="buddy-mouth" />
            <b>HI!</b>
          </div>
          <i className="cute-star star-one" aria-hidden="true">★</i>
          <i className="cute-star star-two" aria-hidden="true">✦</i>
          <div className="stamp">分析<br /><b>ANALYSE</b></div>
          <article className="photo-card portrait-card"><div className="portrait-placeholder"><span>EO</span></div><p>ETHAN, IN PROGRESS</p></article>
          <article className="photo-card data-card">
            <div className="data-viz" aria-hidden="true"><i style={{height:'38%'}} /><i style={{height:'72%'}} /><i style={{height:'55%'}} /><i style={{height:'92%'}} /><i style={{height:'64%'}} /></div>
            <p>MAKING SIGNAL FROM NOISE</p>
          </article>
          <div className="scribble">curious<br />by default ↗</div>
          <div className="burst">86K+<small>RECORDS</small></div>
        </div>
        <p className="scroll-note">SCROLL TO EXPLORE <span>↓↓</span></p>
      </section>

      <section className="work section-pad" id="work">
        <header className="section-heading">
          <p><span>02</span> SELECTED WORK</p>
          <h2>MESSY IN.<br /><i>MEANING</i> OUT.</h2>
          <p className="section-note">Three snapshots of how I approach real problems: get curious, get specific, and keep going until the answer is useful.</p>
        </header>
        <div className="project-stack">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.no}>
              <div className="project-top"><b>{project.no}</b><span>{project.kicker}</span><i>↗</i></div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.body}</p>
                <div className="project-stat"><strong>{project.stat}</strong><span>{project.statLabel}</span></div>
              </div>
              <div className="project-corner" aria-hidden="true">{project.no}</div>
            </article>
          ))}
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div>PYTHON ◆ SQL ◆ POWER BI ◆ TABLEAU ◆ R ◆ EXCEL ◆ AUTOMATION ◆ STORYTELLING ◆&nbsp;</div><div>PYTHON ◆ SQL ◆ POWER BI ◆ TABLEAU ◆ R ◆ EXCEL ◆ AUTOMATION ◆ STORYTELLING ◆&nbsp;</div></div>

      <section className="about section-pad" id="about">
        <div className="about-title">
          <p className="eyebrow"><span>03</span> THE PERSON BEHIND THE PIVOT TABLE</p>
          <h2>STUBBORNLY<br /><em>CURIOUS.</em></h2>
          <div className="about-sticker">しぶとく<br /><b>KEEP AT IT</b></div>
        </div>
        <div className="about-copy">
          <p className="lead">I care about the moment when a pile of numbers finally becomes a decision someone can act on.</p>
          <p>I&apos;m studying Business Analytics at NUS with a minor in Japanese Language Studies. Along the way, I&apos;ve worked across HR, marketing, education and automation — different contexts, same instinct: understand the problem properly before reaching for the tool.</p>
          <p>This site is also a work in progress. It&apos;s where the analytical side of me meets the part that likes typography, motion, travel, language, and making things feel good to use.</p>
          <button className="mode-toggle" onClick={() => setMode(mode === 'focus' ? 'play' : 'focus')} aria-pressed={mode === 'play'}>
            <span>{mode === 'focus' ? 'UNLEASH THE SILLY' : 'OKAY, FOCUS!'}</span><b>{mode === 'focus' ? '★' : '×'}</b>
          </button>
        </div>
      </section>

      <section className="experience section-pad">
        <header className="mini-heading"><p><span>04</span> PLACES I&apos;VE LEARNED</p><h2>THE JOURNEY<br />SO FAR.</h2></header>
        <div className="experience-list">
          {experience.map(([year, company, role], index) => (
            <article key={company}><span>{year}</span><h3>{company}</h3><p>{role}</p><b>0{index + 1}</b></article>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <p className="eyebrow light"><span>05</span> LET&apos;S MAKE THE NUMBERS MEAN SOMETHING</p>
        <h2>GOT A MESSY<br />PROBLEM?</h2>
        <div className="contact-bottom">
          <a href="mailto:ethanong@u.nus.edu">LET&apos;S TALK <b>↗</b></a>
          <div><a href="https://www.linkedin.com/in/ethanjohnong" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="/Ethan_Ong_CV.pdf" target="_blank" rel="noreferrer">RÉSUMÉ ↗</a></div>
        </div>
        <footer><span>ETHAN ONG © 2026</span><span>BUILT WITH CURIOSITY + CAFFEINE</span><span>SINGAPORE</span></footer>
      </section>
    </main>
  );
}
