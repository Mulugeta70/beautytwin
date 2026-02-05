
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  SprayCan,
  Wand2,
  Leaf,
  Globe2,
  ShieldCheck,
  ArrowRight,
  X,
  Check,
  ChevronRight,
  MessageSquare,
} from "lucide-react";


const LS_KEY = "beautytwin_profile_v1";

export default function App() {
  const [toast, setToast] = useState("");
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isTwinModalOpen, setTwinModalOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!profile) return;
    localStorage.setItem(LS_KEY, JSON.stringify(profile));
  }, [profile]);

  const features = useMemo(
    () => [
      {
        icon: Brain,
        title: "Understands you",
        desc: "Emotion + lifestyle mapping",
      },
      {
        icon: SprayCan,
        title: "Designs your scent",
        desc: "Identity-based matching",
      },
      {
        icon: Wand2,
        title: "Guides your beauty",
        desc: "Looks, skin, rituals",
      },
    ],
    []
  );

  const experienceCards = useMemo(
    () => [
      {
        key: "signature",
        title: "Signature Fragrance",
        subtitle: "Create your personal scent DNA",
        bullets: ["Archetype matching", "Mood-based blends", "Name + engraving"],
        detail:
          "Build a signature scent concept from your identity. The Twin outputs a scent direction (families + mood), recommended formats (EDP/solid/travel), and a personalized naming/engraving concept.",
      },
      {
        key: "moment",
        title: "Moment Scents",
        subtitle: "Fragrance for life events",
        bullets: ["Interview / date / travel", "Seasonal evolutions", "Memory journaling"],
        detail:
          "Choose an event or feeling. The Twin adapts intensity, freshness, and longevity to match the moment. It can save “Scent Moments” so your profile evolves over time.",
      },
      {
        key: "smart",
        title: "Smart Beauty Layer",
        subtitle: "Makeup, skin & style guidance",
        bullets: ["Routine builder", "Look suggestions", "Future integrations"],
        detail:
          "The Twin becomes the personalization layer across beauty experiences. In Phase 2, this connects to existing smart services and advisors. For now, we simulate guidance based on your archetype + preferences.",
      },
    ],
    []
  );

  function openDetail(card) {
    setDetailCard(card);
    setDetailOpen(true);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetTwin() {
    localStorage.removeItem(LS_KEY);
    setProfile(null);
    setToast("Twin cleared.");
  }

  return (
    <div className="page">
      <Noise />

      <TopNav
        hasTwin={!!profile}
        onCreate={() => setTwinModalOpen(true)}
        onGoExperience={() => scrollTo("chat")}
        onGoImpact={() => scrollTo("impact")}
      />

      <main>
        <Hero
          profile={profile}
          onCreate={() => setTwinModalOpen(true)}
          onPreview={() => scrollTo("chat")}
        />

        <section className="section" aria-label="Features">
          <div className="container">
            <div className="featureGrid">
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="chat" aria-label="Chat preview">
          <div className="container split">
            <div>
              <h2 className="h2">Conversation becomes identity</h2>
              <p className="muted">
                Fully interactive demo (frontend-only). Your Twin is saved locally.
              </p>

              <div className="pillRow">
                <Pill icon={Sparkles} text="Emotional scent mapping" />
                <Pill icon={ShieldCheck} text="Privacy-by-design" />
                <Pill icon={Globe2} text="Global & scalable" />
              </div>

              <div className="ctaRow">
                <button className="btn btnPrimary" onClick={() => setTwinModalOpen(true)}>
                  {profile ? "Edit My Twin" : "Create My Twin"}
                  <ArrowRight size={18} />
                </button>
                <button className="btn btnGhost" onClick={() => scrollTo("impact")}>
                  See Impact
                </button>
                {profile ? (
                  <button className="btn btnGhost" onClick={resetTwin}>
                    Reset Twin
                  </button>
                ) : null}
              </div>

              <div className={`miniTag ${profile ? "" : "dim"}`}>
                {profile ? (
                  <>
                    Active Twin: <span className="mono">{profile.twinId}</span>
                    <div className="miniSub">
                      {profile.archetype} • {profile.scentFamily} • {profile.intensity}
                    </div>
                  </>
                ) : (
                  "No Twin yet — create one to personalize."
                )}
              </div>
            </div>

            <ChatPanel profile={profile} onNeedTwin={() => setTwinModalOpen(true)} />
          </div>
        </section>

        <section className="section" aria-label="Experiences">
          <div className="container">
            <div className="sectionHeader">
              <h2 className="h2">Luxury experiences, not funnels</h2>
              <p className="muted">Cards are clickable — open details and flows.</p>
            </div>

            <div className="cardGrid">
              {experienceCards.map((c) => (
                <BigCard key={c.key} card={c} onOpen={() => openDetail(c)} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="impact" aria-label="Impact">
          <div className="container">
            <div className="impactWrap">
              <div className="impactHead">
                <h2 className="h2">Luxury that lasts</h2>
                <p className="muted">Designed to align with sustainability + inclusivity.</p>
              </div>

              <div className="impactGrid">
                <ImpactCard icon={Leaf} title="Sustainable" items={["Refill nudges", "Less blind buying", "Lower waste"]} />
                <ImpactCard icon={Sparkles} title="Inclusive" items={["Identity-led", "Gender-neutral", "Accessible-by-design"]} />
                <ImpactCard icon={Globe2} title="Scalable" items={["Digital platform", "Global rollout", "Omnichannel-ready"]} />
                <ImpactCard icon={ShieldCheck} title="Feasible" items={["Software-first", "Low marginal cost", "Higher loyalty"]} />
              </div>

              <div className="bottomCTA">
                <div>
                  <div className="kpiTitle">KPIs</div>
                  <div className="kpis">
                    Twin creation • Time in experience • Conversion • Refill adoption • Repeat usage
                  </div>
                </div>
                <button className="btn btnPrimary" onClick={() => setTwinModalOpen(true)}>
                  Start Your Twin <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

     
      <AnimatePresence>
        {isTwinModalOpen ? (
          <TwinModal
            initialProfile={profile}
            onClose={() => setTwinModalOpen(false)}
            onSave={(p) => {
              setProfile(p);
              setTwinModalOpen(false);
              setToast(profile ? "Twin updated ✨" : "Twin created ✨");
            }}
          />
        ) : null}
      </AnimatePresence>

      
      <AnimatePresence>
        {isDetailOpen ? (
          <DetailModal
            title={detailCard?.title}
            subtitle={detailCard?.subtitle}
            body={detailCard?.detail}
            bullets={detailCard?.bullets || []}
            onClose={() => setDetailOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function TopNav({ hasTwin, onCreate, onGoExperience, onGoImpact }) {
  return (
    <header className="topNav">
      <div className="container navRow">
        <div className="brand" role="button" tabIndex={0} onClick={onGoExperience}>
          <div className="logoDot" />
          <span className="brandText">BEAUTY TWIN</span>
        </div>

        <nav className="navLinks">
          <button className="linkBtn" onClick={onGoExperience}>Experience</button>
          <button className="linkBtn" onClick={onGoImpact}>Impact</button>
        </nav>

        <div className="navActions">
          <span className={`badge ${hasTwin ? "" : "dim"}`}>{hasTwin ? "Twin active" : "No twin"}</span>
          <button className="btn btnPrimary small" onClick={onCreate}>
            {hasTwin ? "Edit My Twin" : "Create My Twin"}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ profile, onCreate, onPreview }) {
  return (
    <section className="hero">
      <div className="container heroGrid">
        <div className="heroCopy">
          <motion.h1
            className="h1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            Meet Your Beauty Twin
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            Your AI identity for fragrance & self-expression.
          </motion.p>

          <div className="heroButtons">
            <button className="btn btnPrimary" onClick={onCreate}>
              {profile ? "Edit My Twin" : "Create My Twin"} <ArrowRight size={18} />
            </button>
            <button className="btn btnGhost" onClick={onPreview}>
              Preview Experience
            </button>
          </div>

          <div className="heroMeta">
            <span className={`chip ${profile ? "" : "dim"}`}>
              {profile ? `Active: ${profile.twinId}` : "No Twin yet"}
            </span>
            {profile ? (
              <span className="chip dim">
                {profile.archetype} • {profile.scentFamily}
              </span>
            ) : (
              <span className="chip dim">Luxury • Tech • Emotion</span>
            )}
          </div>
        </div>

        <div className="heroVisual" aria-hidden="true">
          <div className="orb" />
          <div className="orb2" />
          <div className="silhouette" />
          <div className="spark" />
          <div className="spark s2" />
          <div className="spark s3" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="featureCard" role="group" aria-label={title}>
      <div className="iconWrap">
        <Icon size={20} />
      </div>
      <div>
        <div className="cardTitle">{title}</div>
        <div className="cardDesc">{desc}</div>
      </div>
    </div>
  );
}

function Pill({ icon: Icon, text }) {
  return (
    <div className="pill">
      <Icon size={16} />
      <span>{text}</span>
    </div>
  );
}

function BigCard({ card, onOpen }) {
  return (
    <button className="bigCard bigCardBtn" onClick={onOpen}>
      <div className="bigTopRow">
        <div>
          <div className="bigTitle">{card.title}</div>
          <div className="bigSub">{card.subtitle}</div>
        </div>
        <div className="bigArrow" aria-hidden="true">
          <ChevronRight size={18} />
        </div>
      </div>

      <ul className="bigList">
        {card.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className="bigHint">Click to open details</div>
    </button>
  );
}

function ImpactCard({ icon: Icon, title, items }) {
  return (
    <div className="impactCard">
      <div className="impactIcon">
        <Icon size={18} />
      </div>
      <div className="impactTitle">{title}</div>
      <ul className="impactList">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}



function ChatPanel({ profile, onNeedTwin }) {
  const [messages, setMessages] = useState(() => {
    return [
      { role: "twin", text: "What scent feels like home?" },
      { role: "user", text: "Soft florals + clean musks." },
      { role: "twin", text: "Daily comfort or a special moment?" },
      { role: "user", text: "Daily comfort, but elegant." },
    ];
  });

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);

  
    await new Promise((r) => setTimeout(r, 650));

    const reply = generateTwinReply(profile, text);
    setMessages((m) => [...m, { role: "twin", text: reply }]);
    setThinking(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") send();
  }

  return (
    <div className="chatCard">
      <div className="chatHead">
        <div className="dot" />
        <div>
          <div className="chatTitle">Beauty Twin</div>
          <div className="chatSub">{profile ? "Personalized mode" : "Demo mode"}</div>
        </div>

        {!profile ? (
          <button className="btn btnGhost small" onClick={onNeedTwin} title="Create Twin for personalization">
            Create Twin
          </button>
        ) : (
          <span className="chatChip">
            <Check size={14} /> Linked
          </span>
        )}
      </div>

      <div className="chatBody" ref={listRef}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`bubble ${m.role === "user" ? "right" : "left"} ${m.role === "twin" ? "glow" : ""}`}
          >
            {m.text}
          </div>
        ))}
        {thinking ? <div className="bubble left glow">Thinking…</div> : null}
      </div>

      <div className="chatFooter chatInputRow">
        <div className="chatInputWrap">
          <MessageSquare size={16} />
          <input
            className="chatInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={profile ? "Ask your Twin about a scent or moment…" : "Create a Twin to personalize…"}
          />
        </div>
        <button className="btn btnPrimary small" onClick={send} disabled={!input.trim() || thinking}>
          Send
        </button>
      </div>
    </div>
  );
}

function generateTwinReply(profile, userText) {
  const base = profile
    ? {
        archetype: profile.archetype,
        family: profile.scentFamily,
        intensity: profile.intensity,
        values: profile.values,
      }
    : {
        archetype: "Modern Minimalist",
        family: "Fresh Musks",
        intensity: "Soft glow",
        values: ["refill-first"],
      };

  const t = userText.toLowerCase();

  
  if (t.includes("interview") || t.includes("work") || t.includes("office")) {
    return `For an interview, keep it confident but controlled. Based on your profile (${base.archetype}), choose ${base.family} with ${base.intensity}. Try: clean musk + subtle iris, very low projection. Want “fresh & bright” or “warm & creamy”?`;
  }

  if (t.includes("date") || t.includes("night") || t.includes("party")) {
    return `For a night moment: keep your DNA, add warmth. Layer ${base.family} with soft amber/vanilla in the base (still elegant). If you want a twist: add a spicy spark (pink pepper) for presence.`;
  }

  if (t.includes("refill") || t.includes("sustain")) {
    return `I’ll prioritize refill-first options. We’ll choose one “hero bottle” and keep refills visible in your journey — luxury that lasts, less waste.`;
  }

  if (t.includes("recommend") || t.includes("suggest") || t.includes("what should i")) {
    return `Your scent direction: ${base.family}. I recommend a “comfort-elegance” profile: airy florals + clean musk, with a soft warm base. For format: travel spray for daily, refill-ready bottle for signature.`;
  }

  return `I hear you. Based on your Twin (${base.archetype} • ${base.family}), I’d map this to a ${base.intensity} profile. Tell me: do you want it more “fresh & bright” or “warm & creamy”?`;
}



function TwinModal({ initialProfile, onClose, onSave }) {
  const [step, setStep] = useState(0);

  const [name, setName] = useState(initialProfile?.name || "");
  const [archetype, setArchetype] = useState(initialProfile?.archetype || "Modern Minimalist");
  const [scentFamily, setScentFamily] = useState(initialProfile?.scentFamily || "Fresh Musks");
  const [intensity, setIntensity] = useState(initialProfile?.intensity || "Soft glow");
  const [values, setValues] = useState(initialProfile?.values || ["refill-first"]);

  const archetypes = [
    "Modern Minimalist",
    "Bold Icon",
    "Soft Romantic",
    "Sporty Clean",
    "Artistic Edge",
  ];

  const families = ["Fresh Musks", "Floral", "Amber", "Woody", "Citrus"];

  const intensities = ["Soft glow", "Medium aura", "Statement"];

  const valueOptions = [
    { key: "refill-first", label: "Refill-first" },
    { key: "clean-luxury", label: "Clean-luxury" },
    { key: "inclusive", label: "Inclusive by design" },
    { key: "long-wear", label: "Long-wear performance" },
  ];

  function toggleValue(v) {
    setValues((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  function next() {
    setStep((s) => Math.min(s + 1, 3));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function save() {
    const twinId = initialProfile?.twinId || `twin_${Math.random().toString(16).slice(2, 10)}`;
    onSave({
      twinId,
      name: name.trim() || "Guest",
      archetype,
      scentFamily,
      intensity,
      values: values.length ? values : ["refill-first"],
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <ModalShell title="Create your Beauty Twin" onClose={onClose}>
      <div className="steps">
        <StepDot active={step === 0} />
        <StepDot active={step === 1} />
        <StepDot active={step === 2} />
        <StepDot active={step === 3} />
      </div>

      {step === 0 ? (
        <div className="modalBody">
          <div className="modalLabel">Your name</div>
          <input
            className="modalInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Mulugeta"
          />
          <div className="modalHint">Used only for your Twin profile (saved locally).</div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="modalBody">
          <div className="modalLabel">Choose an archetype</div>
          <div className="chipGrid">
            {archetypes.map((a) => (
              <button
                key={a}
                className={`choiceChip ${archetype === a ? "active" : ""}`}
                onClick={() => setArchetype(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="modalBody">
          <div className="modalLabel">Scent direction</div>
          <div className="choiceRow">
            <div className="choiceCol">
              <div className="modalSmall">Family</div>
              <select className="modalSelect" value={scentFamily} onChange={(e) => setScentFamily(e.target.value)}>
                {families.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div className="choiceCol">
              <div className="modalSmall">Intensity</div>
              <select className="modalSelect" value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                {intensities.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="modalBody">
          <div className="modalLabel">Your values</div>
          <div className="checkGrid">
            {valueOptions.map((v) => (
              <button
                key={v.key}
                className={`checkItem ${values.includes(v.key) ? "on" : ""}`}
                onClick={() => toggleValue(v.key)}
              >
                <span className="checkBox">{values.includes(v.key) ? <Check size={14} /> : null}</span>
                <span>{v.label}</span>
              </button>
            ))}
          </div>
          <div className="modalHint">These guide recommendations and sustainability nudges.</div>
        </div>
      ) : null}

      <div className="modalActions">
        <button className="btn btnGhost" onClick={onClose}>Cancel</button>
        <div className="modalRight">
          {step > 0 ? (
            <button className="btn btnGhost" onClick={back}>
              Back
            </button>
          ) : null}
          {step < 3 ? (
            <button className="btn btnPrimary" onClick={next}>
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btnPrimary" onClick={save}>
              Save Twin <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </ModalShell>
  );
}

function StepDot({ active }) {
  return <div className={`stepDot ${active ? "active" : ""}`} />;
}



function DetailModal({ title, subtitle, body, bullets, onClose }) {
  return (
    <ModalShell title={title || "Details"} onClose={onClose}>
      <div className="modalBody">
        <div className="detailSub">{subtitle}</div>
        <p className="detailText">{body}</p>
        <div className="detailListTitle">Included:</div>
        <ul className="detailList">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="modalActions">
        <button className="btn btnPrimary" onClick={onClose}>
          Close <ArrowRight size={18} />
        </button>
      </div>
    </ModalShell>
  );
}

function ModalShell({ title, onClose, children }) {
  return (
    <motion.div
      className="modalOverlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target.classList.contains("modalOverlay")) onClose();
      }}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.18 }}
      >
        <div className="modalHeader">
          <div className="modalTitle">{title}</div>
          <button className="iconBtn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footerRow">
        <div className="brand smallBrand">
          <div className="logoDot" />
          <span className="brandText">BEAUTY TWIN</span>
        </div>
        <div className="footerText">
          Frontend prototype • Twin saved locally • Backend comes next
        </div>
      </div>
    </footer>
  );
}

function Noise() {
  
  return <div className="noise" aria-hidden="true" />;
}

























