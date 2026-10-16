import React, { useState, useEffect } from 'react';
import './App.css';

const ROLES = [
  "Python & Database Architectures",
  "CTF Challenges & Security Tools",
  "Desktop Software with Tkinter",
  "Core Systems Problem Solving"
];

const SIGNAL_DATA = [
  {
    id: "identity",
    label: "About Me",
    icon: "⚡",
    headline: "Pragmatic Builder & Developer",
    detail: "Tech enthusiast who loves turning logic into functional software. I focus on clean database schemas, fast Python automation, and reliable desktop systems."
  },
  {
    id: "passion",
    label: "Passions & Interests",
    icon: "🎯",
    headline: "CTF Competitions & Cryptography",
    detail: "Passionate about competing in Capture The Flag (CTF) security contests, deciphering cryptography puzzles, analyzing network traffic, and building resilient database architectures."
  },
  {
    id: "strengths",
    label: "Core Strengths",
    icon: "💎",
    headline: "Rapid & Methodical Execution",
    detail: "Fast problem decomposition, sharp debugging under pressure, structured teamwork, and a continuous hunger to explore unfamiliar stacks."
  }
];

export default function App() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeSignal, setActiveSignal] = useState(0);
  const [apiLatency, setApiLatency] = useState(null);

  // Interactive CTF Terminal Simulation
  const [ctfInput, setCtfInput] = useState('');
  const [ctfResult, setCtfResult] = useState('Hint: Type "flag" or "help" and press Enter');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', error: false });
  const [loading, setLoading] = useState(false);

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse spotlight tracker
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter Loop
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  // Fetch projects from local MySQL backend and measure latency
  useEffect(() => {
    const start = performance.now();
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setApiLatency(Math.round(performance.now() - start));
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => setApiLatency(null));
  }, []);

  const handleCtfCommand = (e) => {
    e.preventDefault();
    const cmd = ctfInput.trim().toLowerCase();
    if (cmd === 'flag') {
      setCtfResult('🏆 CTF{monisha_sec_pass_2026} — Challenge solved!');
    } else if (cmd === 'help') {
      setCtfResult('Available commands: flag, ctf, stack, clear');
    } else if (cmd === 'ctf') {
      setCtfResult('Active participant in jeopardy-style web & crypto challenges.');
    } else if (cmd === 'stack') {
      setCtfResult('Python, MySQL 9.0, Tkinter, React, Express, Bash');
    } else if (cmd === 'clear') {
      setCtfResult('');
    } else {
      setCtfResult(`Unknown command: "${cmd}". Try "flag" or "help".`);
    }
    setCtfInput('');
  };

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: '', error: false });

    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus({ message: 'Delivered directly into MySQL Database table [messages]!', error: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: result.error || 'Submission error.', error: true });
      }
    } catch {
      setStatus({ message: 'Backend unreachable on port 5000.', error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="cursor-spotlight" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>
      <div className="glow-bg"></div>

      <div className="container">
        
        {/* Sticky Fixed Navbar */}
        <header className="navbar">
          <a href="#home" className="nav-brand-text">&lt;Monisha.dev /&gt;</a>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact" className="contact-btn">Contact</a>
          </nav>
        </header>

        {/* Hero Section with Large Centered Logo */}
        <section className="hero" id="home">
          
          <div className="hero-logo-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto 1.5rem' }}>
            <div className="hero-logo-ring"></div>
            <div className="hero-logo-box" style={{ width: '82px', height: '82px', maxWidth: '82px', maxHeight: '82px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg 
                className="hero-logo-svg" 
                width="80" 
                height="80" 
                style={{ width: '80px', height: '80px', maxWidth: '80px', maxHeight: '80px', display: 'block' }}
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="heroLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <polygon 
                  points="20,2 36,11 36,29 20,38 4,29 4,11" 
                  stroke="url(#heroLogoGrad)" 
                  strokeWidth="2.4" 
                  fill="rgba(147, 51, 234, 0.16)" 
                />
                <path 
                  d="M12 28 V14 L20 22 L28 14 V28" 
                  stroke="url(#heroLogoGrad)" 
                  strokeWidth="2.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <circle cx="20" cy="11" r="1.8" fill="#06b6d4" />
              </svg>
            </div>
            <span className="hero-logo-tag">DEV · SEC · SYSTEMS</span>
          </div>

          <div className="status-container">
            <div className="status-pill">
              <span className="live-dot"></span> Ready for Software & Internship Roles
            </div>
            {apiLatency !== null && (
              <div className="latency-badge">
                <span className="latency-dot"></span> MySQL Latency: {apiLatency}ms
              </div>
            )}
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Monisha</span>
          </h1>

          <h2 className="typewriter-sub">
            Focused on <span className="typed-highlight">{text}</span>
            <span className="cursor">|</span>
          </h2>

          <p className="hero-desc">
            Building Python tools, secure data pipelines, and desktop systems.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-action">Explore My Work ↘</a>
            <a href="#contact" className="secondary-action">Contact Me ↗</a>
          </div>

          {/* Dynamic Signal Deck */}
          <div className="signal-deck">
            <div className="signal-selector">
              {SIGNAL_DATA.map((signal, idx) => (
                <button
                  key={signal.id}
                  className={`signal-pill ${activeSignal === idx ? 'active' : ''}`}
                  onClick={() => setActiveSignal(idx)}
                >
                  <span className="pill-icon">{signal.icon}</span>
                  {signal.label}
                </button>
              ))}
            </div>

            <div className="signal-display">
              <div className="signal-top">
                <span className="signal-indicator">SIGNAL_ACTIVE // 0{activeSignal + 1}</span>
                <span className="signal-badge">INTERACTIVE CONSOLE</span>
              </div>
              <h3 className="signal-title">{SIGNAL_DATA[activeSignal].headline}</h3>
              <p className="signal-text">{SIGNAL_DATA[activeSignal].detail}</p>
            </div>
          </div>

          {/* Mini Interactive CTF Challenge Terminal Widget */}
          <div className="ctf-terminal">
            <div className="ctf-header">
              <span className="ctf-dot red"></span>
              <span className="ctf-dot yellow"></span>
              <span className="ctf-dot green"></span>
              <span className="ctf-title">security_challenge@monisha:~$</span>
            </div>
            <div className="ctf-body">
              <p className="ctf-msg">{ctfResult}</p>
              <form onSubmit={handleCtfCommand} className="ctf-form">
                <span className="ctf-prompt">&gt;</span>
                <input
                  type="text"
                  placeholder="type command..."
                  value={ctfInput}
                  onChange={(e) => setCtfInput(e.target.value)}
                  className="ctf-input"
                />
              </form>
            </div>
          </div>
        </section>

        {/* Technical & Social Skills Section */}
        <section className="section" id="skills">
          <h2 className="section-title">Core Competencies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <div className="skill-cat-header">
                <span className="cat-icon">⚡</span>
                <h3>Technical Proficiencies</h3>
              </div>
              <div className="tags">
                <span className="tag glow-tag">Python</span>
                <span className="tag glow-tag">MySQL 9.0</span>
                <span className="tag glow-tag">Tkinter GUI</span>
                <span className="tag glow-tag">CTF Challenges</span>
                <span className="tag glow-tag">Relational Database Schemas</span>
                <span className="tag glow-tag">React.js</span>
                <span className="tag glow-tag">Node / Express REST APIs</span>
                <span className="tag glow-tag">Git & Version Control</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-cat-header">
                <span className="cat-icon">🤝</span>
                <h3>Professional & Social Skills</h3>
              </div>
              <div className="tags">
                <span className="tag social-tag">Analytical Problem Solving</span>
                <span className="tag social-tag">Fast Technology Adoption</span>
                <span className="tag social-tag">Collaborative Team Spirit</span>
                <span className="tag social-tag">Technical Communication</span>
                <span className="tag social-tag">Self-Driven Initiative</span>
                <span className="tag social-tag">Debugging Under Constraints</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects">
          <div className="section-head">
            <div>
              <h2 className="section-title">Projects Showcase</h2>
              <p className="section-subtitle">Real records served dynamically from local MySQL</p>
            </div>
            <div className="filters">
              {['All', 'Cybersecurity', 'Python / Core', 'Desktop Utility', 'Web Application'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {filteredProjects.map((item) => (
              <div key={item.id} className="card interactive-card">
                <div>
                  <div className="card-top">
                    <span className="card-badge">{item.category}</span>
                    <span className="card-dot"></span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="tags">
                    {item.technologies?.split(',').map((tech, i) => (
                      <span key={i} className="tag">{tech.trim()}</span>
                    ))}
                  </div>
                </div>

                <div className="card-footer">
                  {/* Direct hardcoded check for Mystic Vault link */}
                  {item.title.toLowerCase().includes('mystic') ? (
                    <a 
                      href="https://github.com/MonishaaM/mystic-vault" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="action-link live-link"
                    >
                      View Mystic Password Generator Repository ↗
                    </a>
                  ) : item.github_url && item.github_url.trim() !== '' ? (
                    <a 
                      href={item.github_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="action-link live-link"
                    >
                      View {item.title} Repository ↗
                    </a>
                  ) : item.demo_url ? (
                    <span className="action-link local-link">Live on Port 5173</span>
                  ) : (
                    <span className="action-link offline-tag">Desktop Standalone System</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MySQL Contact Section */}
        <section className="section" id="contact">
          <div className="contact-box">
            <h2>Contact</h2>
            <p>Validated via Express and stored directly into MySQL database table.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                rows="4"
                placeholder="Your Message..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Writing to MySQL...' : 'Send Message 🚀'}
              </button>
            </form>
            {status.message && (
              <div className="status-msg" style={{ color: status.error ? '#f87171' : '#4ade80' }}>
                {status.message}
              </div>
            )}
          </div>
        </section>

        <footer>
          <p>© 2026 Monisha · Python, CTF & Database Developer · Built with React, Express & MySQL</p>
        </footer>

      </div>
    </div>
  );
}