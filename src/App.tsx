import { useState } from 'react';
import JapanMap from './JapanMap';
const projects = [
  { no: '01', type: 'TEAM PROJECT · BT3103', title: 'StudySpot', tag: 'CAMPUS LIFE', body: 'Built noise ratings from student reports to colour campus map pins and rank quieter study spots.', href: 'https://github.com/BT3103AppDev1/L1_Group_19', color: 'mint' },
  { no: '02', type: 'TEAM PROJECT · BT4222', title: 'Personalised product search', tag: 'RECOMMENDER SYSTEMS', body: 'Improved how shopper activity informed product rankings and evaluated results across 20,000 shoppers.', color: 'peach' },
  { no: '03', type: 'TEAM PROJECT · BT4211', title: 'What people say vs. choose', tag: 'CONSUMER INSIGHT', body: 'Compared stated preferences with actual choices using speed-dating records.', href: 'https://github.com/KTAP8/BrainOverLooksBT4211', color: 'butter' },
  { no: '04', type: 'NUS DATATHON 2026', title: 'Finding comparable companies', tag: 'DATA STORYTELLING', body: 'Team prototype that groups similar companies for revenue and headcount comparisons.', href: 'https://github.com/wk142003/rowlet-regression', color: 'sky' },
  { no: '05', type: 'PYTHON · LLM EVALUATION', title: 'FreddyFazbytes', tag: 'TEXT ANALYSIS', body: 'Evaluated AI review moderation by testing prompts and models against labelled Google Maps reviews.', href: 'https://github.com/assistacat/FreddyFazbytes', color: 'cream' },
  { no: '06', type: 'REACT · FLASK', title: 'TrekSavvy', tag: 'TRAVEL · MAPS', body: 'Trip planner with saved map pins, itineraries and location exports.', href: 'https://github.com/assistacat/treksavvy', color: 'mint' },
];

const experience = [
  ['2026', 'Murata Electronics Singapore', 'HR Data Analytics Intern'],
  ['2026', 'TÜV SÜD', 'Global Marketing Intern'],
  ['2025—26', 'NUS Computing', 'Data Management & Visualisation TA'],
  ['2025', 'SPH Media', 'B2B Marketing Analytics Intern'],
];


const internshipSteps = [
  [
    ['Combine records', '131 leave files and employee shift calendars brought into one Python pipeline.'],
    ['Calculate attendance', 'Calculated monthly attendance ratios from leave and scheduled shifts.'],
    ['Prepare reporting', 'Prepared monthly figures for HR reporting in Power BI.'],
  ],
  [
    ['Submit', 'Employees submit coaching information through Power Apps.'],
    ['Approve', 'Route coaching submissions through an approval workflow.'],
    ['Record & track', 'Maintain learning records and track programme progress in SharePoint.'],
  ],
];

function WorkDiagram({ project }: { project: number }) {
  const [step, setStep] = useState(0);
  const steps = internshipSteps[project];
  return <div className="work-demo">
    <div className="work-demo-controls" role="group" aria-label={project === 0 ? 'Attendance pipeline stages' : 'Coaching workflow stages'}>
      {steps.map(([label], index) => <button key={label} type="button"
        aria-pressed={step === index} onClick={() => setStep(index)}><span className="step-indicator" aria-hidden="true">{index + 1}</span><span>{label}</span></button>)}
    </div>
    <div className="work-demo-readout"><span className="readout-icon" aria-hidden="true">↳</span><p className="work-demo-detail" aria-live="polite">{steps[step][1]}</p></div>
  </div>;
}

function SubscriptionDemo() {
  const [detail, setDetail] = useState(false);
  return <div className="work-demo">
    <strong className="work-demo-stat">58,000+<span>subscriptions analysed</span></strong>
    <button className="work-detail-toggle" type="button" aria-expanded={detail} onClick={() => setDetail(!detail)}>
      What did I look for? <span aria-hidden="true">{detail ? '−' : '+'}</span>
    </button>
    {detail && <p className="work-demo-detail">Buying patterns across publications and school segments to inform B2B pricing and targeting.</p>}
  </div>;
}

function RankingDemo() {
  const [shopper, setShopper] = useState('travel');
  const products = shopper === 'travel' ? ['Noise-cancelling headphones', 'Gaming headset'] : ['Gaming headset', 'Noise-cancelling headphones'];
  return <div className="ranking-demo">
    <p className="demo-caption">Illustrative ranking · Search “headphones”</p>
    <div className="work-demo-controls" role="group" aria-label="Example shopper interests">
      <button type="button" aria-pressed={shopper === 'travel'} onClick={() => setShopper('travel')}>Travel shopper</button>
      <button type="button" aria-pressed={shopper === 'gaming'} onClick={() => setShopper('gaming')}>Gaming shopper</button>
    </div>
    <ol aria-live="polite">{products.map((product, index) => <li key={product}><span className="ranking-position" aria-hidden="true">{index + 1}</span><span>{product}</span></li>)}</ol>
  </div>;
}

function Medal({ children }: { children: string }) {
  return <span className="medal" aria-hidden="true"><span>{children}</span></span>;
}

export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="nav">
      <a className="brand" href="#top" aria-label="Ethan Ong, home"><span className="brand-mark">EO</span><span>ETHAN ONG<small>BUSINESS ANALYTICS</small></span></a>
      <nav className="nav-links" aria-label="Primary navigation"><a href="#work">Work</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#japan">Japan</a><a href="#about">About</a></nav>
      <a className="resume-pill" href="/Ethan_Ong_CV.pdf" target="_blank" rel="noreferrer">Résumé <span>↗</span></a>
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> BUSINESS ANALYTICS · NUS · SINGAPORE</p>
          <h1 id="hero-title">Ethan Ong</h1>
          <p className="intro">Business Analytics student at NUS with internship experience in marketing analytics, HR reporting and workflow automation.</p>
          <div className="hero-actions"><a className="button primary" href="#work">View analytics work <span>↓</span></a><a className="button text-button" href="mailto:ethanong@u.nus.edu">Email me <span>↗</span></a></div>
        </div>
        <div className="hero-art">
          <figure className="portrait"><img src="/ethan-ong.jpg" alt="Ethan Ong on a rocky coastline" fetchPriority="high" /></figure>
          <div className="art-sticker sticker-spark" aria-hidden="true">✳</div><div className="art-sticker sticker-note" aria-hidden="true">✦</div>

        </div>
      </section>

      <section className="work section-pad" id="work" aria-labelledby="work-title">
        <div className="section-intro"><p className="eyebrow"><Medal>01</Medal> INTERNSHIP WORK</p><h2 id="work-title">Marketing &amp; HR analytics</h2></div>
        <div className="case-grid">
          <article className="case-card case-green"><div className="case-head"><span>01 · MURATA / HR ANALYTICS</span><Medal>HR</Medal></div><WorkDiagram project={0} /><h3>Attendance reporting pipeline</h3><p>Combined 131 leave files and shift calendars to calculate monthly attendance ratios for Power BI reporting.</p><div className="case-foot"><span>PYTHON</span><span>POWER BI</span><span>HR REPORTING</span></div></article>
          <article className="case-card case-yellow"><div className="case-head"><span>02 · MURATA / AUTOMATION</span><Medal>FLOW</Medal></div><WorkDiagram project={1} /><h3>Coaching approvals workflow</h3><p>Automated coaching submissions, approvals and learning records for a development programme covering 2,000+ employees.</p><div className="case-foot"><span>POWER APPS</span><span>SHAREPOINT</span><span>PROCESS DESIGN</span></div></article>
          <article className="case-card case-blue"><div className="case-head"><span>03 · SPH MEDIA / MARKETING</span><Medal>58K</Medal></div><SubscriptionDemo /><h3>B2B subscription analysis</h3><p>Analysed 58,000+ subscriptions to inform B2B pricing and targeting across publications and school segments.</p><div className="case-foot"><span>R</span><span>TABLEAU</span><span>MARKETING</span></div></article>
        </div>
      </section>

      <section className="projects-section section-pad" id="projects" aria-labelledby="projects-title">
        <div className="section-intro projects-intro"><p className="eyebrow"><Medal>02</Medal> COURSEWORK &amp; SIDE PROJECTS</p><h2 id="projects-title">Selected projects</h2></div>
        <div className="project-grid">{projects.map((project) => <article className={`project-card ${project.color}`} key={project.no}>
          <div className="project-head"><Medal>{project.no}</Medal><span>{project.type}</span><span className="project-tag">{project.tag}</span></div>
          {project.no === '01' && <figure className="project-image"><img src="/studyspot.png" alt="StudySpot campus map with marked study locations and a search panel" loading="lazy" /><figcaption>My contribution: noise ratings that colour the pins and rank quiet spots.</figcaption></figure>}
          <h3>{project.title}</h3>{project.no === '02' && <RankingDemo />}<p>{project.body}</p>{project.href && <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View repository for ${project.title}`}>View repository <span aria-hidden="true">↗</span></a>}<span className="project-number" aria-hidden="true">{project.no}</span>
        </article>)}</div>
      </section>

      <JapanMap />
      <section className="about section-pad" id="about" aria-labelledby="about-title">
        <div className="about-title"><p className="eyebrow"><Medal>03</Medal> BACKGROUND</p><h2 id="about-title">About me</h2></div>
        <div className="about-copy"><p>I’m studying Business Analytics at the National University of Singapore, with a minor in Japanese Language Studies. Along the way, I’ve worked across HR, marketing, education and automation.</p><p>Outside work, I collect ideas from travel, maps, language and the playful worlds of anime and games. </p><div className="interest-chips"><span>Japanese language</span><span>Maps &amp; travel</span><span>Anime &amp; games</span><span>Making things</span></div></div>
      </section>

      <section className="experience section-pad" id="experience" aria-labelledby="experience-title"><div className="experience-heading"><p className="eyebrow"><Medal>04</Medal> INTERNSHIPS &amp; TEACHING</p><h2 id="experience-title">Experience</h2></div><div className="experience-list">{experience.map(([year, company, role], index) => <article key={company}><span className="experience-year">{year}</span><h3>{company}</h3><p>{role}</p><Medal>{`0${index + 1}`}</Medal></article>)}</div></section>

      <footer className="contact section-pad" id="contact"><div><p className="eyebrow"><Medal>05</Medal> CONTACT</p><h2>Get in touch</h2><p className="contact-summary">I’d love to hear what you’re working on.</p><a className="button contact-button" href="mailto:ethanong@u.nus.edu">Email Ethan <span>↗</span></a></div><div className="contact-links"><a href="https://www.linkedin.com/in/ethanjohnong" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/assistacat" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href="/Ethan_Ong_CV.pdf" target="_blank" rel="noreferrer">Résumé <span>↗</span></a><p>ETHAN ONG · SINGAPORE · 2026</p></div></footer>
    </main>
  </>;
}
