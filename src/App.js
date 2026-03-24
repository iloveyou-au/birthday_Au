import { useState, useEffect, useRef } from "react";
import "./App.css";

const PHOTOS = [
  "./assest/1.jpeg",
  "./assest/2.jpeg",
  "./assest/3.jpeg",
  "./assest/4.jpeg",
  "./assest/5.jpeg",
  "./assest/6.jpeg",
];

const CAPTIONS = [
  "Every moment with you is purrfect 🐾",
  "You're the reason I smile every day 💕",
  "My heart belongs to you, always 🌸",
  "Forever and always, you're my person 💫",
  "You make my world so much brighter ✨",
  "Still falling for you, every single day 🌷",
];

const MESSAGES = [
  { icon: "🐱", text: "You are my favourite human in the whole universe" },
  { icon: "💖", text: "Every day I get to love you is the best day of my life" },
  { icon: "🌸", text: "You are softer than any kitten and sweeter than any dream" },
  { icon: "✨", text: "Being yours is my greatest adventure" },
  { icon: "🐾", text: "Like a cat finds its way home — I always find my way to you" },
  { icon: "💫", text: "Happy Birthday to the girl who stole my heart completely" },
];

const CONFETTI_COLORS = ["#ff69b4", "#ffd700", "#ff4081", "#c084fc", "#38bdf8"];

export default function App() {
  const [page, setPage] = useState("loading");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [gfName, setGfName] = useState("My Love");
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 95),
      y: Math.floor(Math.random() * 95),
      size: Math.floor(Math.random() * 14) + 14,
      delay: parseFloat((Math.random() * 6).toFixed(2)),
      duration: parseFloat((Math.random() * 3 + 3).toFixed(2)),
      emoji: i % 3 === 0 ? "🐾" : i % 3 === 1 ? "💕" : "💗",
    }))
  );
  const [stars] = useState(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: parseFloat((Math.random() * 100).toFixed(2)),
      y: parseFloat((Math.random() * 100).toFixed(2)),
      size: parseFloat((Math.random() * 2.5 + 0.5).toFixed(2)),
      delay: parseFloat((Math.random() * 4).toFixed(2)),
      duration: parseFloat((Math.random() * 3 + 2).toFixed(2)),
    }))
  );
  const [confetti] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: parseFloat((Math.random() * 100).toFixed(2)),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: Math.floor(Math.random() * 8) + 5,
      delay: parseFloat((Math.random() * 4).toFixed(2)),
      duration: parseFloat((Math.random() * 2 + 3).toFixed(2)),
    }))
  );
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setPage("intro"), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (page === "gallery") {
      timerRef.current = setInterval(() => {
        setPhotoIndex((i) => (i + 1) % PHOTOS.length);
      }, 3200);
    }
    return () => clearInterval(timerRef.current);
  }, [page]);

  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % PHOTOS.length);

  const saveName = () => {
    if (nameInput.trim()) setGfName(nameInput.trim());
    setEditing(false);
  };

  const getPolClass = (i) => {
    if (i === photoIndex) return "polaroid pol-active";
    const prev = (photoIndex - 1 + PHOTOS.length) % PHOTOS.length;
    const next = (photoIndex + 1) % PHOTOS.length;
    if (i === prev) return "polaroid pol-left";
    if (i === next) return "polaroid pol-right";
    return "polaroid pol-hidden";
  };

  return (
    <div className="app">

      {/* Stars */}
      <div className="stars-wrap">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.x + "%",
              top: s.y + "%",
              width: s.size + "px",
              height: s.size + "px",
              animationDelay: s.delay + "s",
              animationDuration: s.duration + "s",
            }}
          />
        ))}
      </div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x + "%",
            top: p.y + "%",
            fontSize: p.size + "px",
            animationDelay: p.delay + "s",
            animationDuration: p.duration + "s",
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* LOADING */}
      {page === "loading" && (
        <div className="page">
          <div className="big-cat">🐱</div>
          <p className="loading-text">Preparing something special…</p>
        </div>
      )}

      {/* INTRO */}
      {page === "intro" && (
        <div className="page">
          <div className="ring ring1" />
          <div className="ring ring2" />
          <div className="intro-card">
            <p className="label">✨ a little surprise ✨</p>
            <h1 className="big-title">Happy Birthday</h1>
            {!editing ? (
              <>
                <div className="gf-name" onClick={() => { setEditing(true); setNameInput(gfName); }}>
                  {gfName} 🐾
                </div>
                <p className="small-hint">tap to enter her name</p>
              </>
            ) : (
              <div className="name-row">
                <input
                  className="name-input"
                  value={nameInput}
                  autoFocus
                  placeholder="Her name…"
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                />
                <button className="btn" onClick={saveName}>Save</button>
              </div>
            )}
            <p className="quote-small">"You are my today and all of my tomorrows 💕"</p>
            <button className="btn big-btn" onClick={() => setPage("gallery")}>
              Open Your Surprise 🎁
            </button>
          </div>
        </div>
      )}

      {/* GALLERY */}
      {page === "gallery" && (
        <div className="page">
          <p className="label">📸 our memories</p>
          <h2 className="section-title">Every picture tells our story 🌸</h2>
          <div className="polaroid-area">
            {PHOTOS.map((src, i) => (
              <div key={i} className={getPolClass(i)} onClick={() => setPhotoIndex(i)}>
                <img src={src} alt={"memory " + i} />
                <p className="pol-caption">{CAPTIONS[i]}</p>
              </div>
            ))}
          </div>
          <div className="nav-row">
            <button className="circle-btn" onClick={prevPhoto}>‹</button>
            <div className="dots-row">
              {PHOTOS.map((_, i) => (
                <div
                  key={i}
                  className={"dot" + (i === photoIndex ? " dot-on" : "")}
                  onClick={() => setPhotoIndex(i)}
                />
              ))}
            </div>
            <button className="circle-btn" onClick={nextPhoto}>›</button>
          </div>
          <p className="hint-text">💡 Swap the photo URLs in App.js with your real couple photos!</p>
          <button className="btn big-btn" onClick={() => setPage("messages")}>Read my heart 💌</button>
        </div>
      )}

      {/* MESSAGES */}
      {page === "messages" && (
        <div className="page">
          <p className="label">💌 from my heart to yours</p>
          <h2 className="section-title">Things I want you to know, {gfName} 🐱</h2>
          <div className="msg-grid">
            {MESSAGES.map((m, i) => (
              <div key={i} className="msg-card" style={{ animationDelay: i * 0.1 + "s" }}>
                <span className="msg-icon">{m.icon}</span>
                <p className="msg-text">{m.text}</p>
              </div>
            ))}
          </div>
          <button className="btn big-btn" onClick={() => setPage("final")}>See the finale 🎉</button>
        </div>
      )}

      {/* FINAL */}
      {page === "final" && (
        <div className="page">
          {confetti.map((c) => (
            <div
              key={c.id}
              className="confetti"
              style={{
                left: c.x + "%",
                width: c.size + "px",
                height: Math.floor(c.size * 0.45) + "px",
                background: c.color,
                animationDelay: c.delay + "s",
                animationDuration: c.duration + "s",
              }}
            />
          ))}
          <div className="final-card">
            <div className="cat-row">
              {["🐱", "🎂", "🐱", "🎊"].map((e, i) => (
                <span key={i} className="cat-bounce" style={{ animationDelay: i * 0.15 + "s" }}>{e}</span>
              ))}
            </div>
            <h2 className="final-title">Happy Birthday,<br />{gfName}!</h2>
            <div className="big-heart">💖</div>
            <p className="final-msg">
              On this special day and every day after,<br />
              loving you is the greatest gift I have ever received. 🌸<br /><br />
              Here is to you — beautiful, wonderful,<br />
              and forever my favourite person on earth. 🐾
            </p>
            <div className="glow-card">
              <p className="glow-quote">
                "You are my sunshine, my moonlight,<br />
                and my entire galaxy —<br />
                all in one purrfect human 🌙"
              </p>
            </div>
            <div className="final-btns">
              <button className="btn" onClick={() => setPage("intro")}>Start over 🔄</button>
              <button className="btn-ghost" onClick={() => setPage("gallery")}>Photos again 📸</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
