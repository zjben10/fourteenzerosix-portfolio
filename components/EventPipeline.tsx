"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { dateRange, initials, avatarColor, type TrackedEvent } from "@/lib/roeblingEvents";
import {
  ROLE_META,
  STATUS_META,
  STATUS_ORDER,
  STATUS_NEXT,
  REPS,
  salesReps,
  repName,
  pipelineEvents,
  eventById,
  DEMO_EVENT_ID,
  STORAGE_KEY,
  MockCrmClient,
  previewPayload,
  rollup,
  evaluatorSignal,
  parseDelimited,
  guessMapping,
  IMPORT_FIELDS,
  newContactId,
  nowIso,
  buildSeedContacts,
  type Role,
  type Contact,
  type ContactStatus,
  type ContactField,
  type CrmPayload,
} from "@/lib/eventPipeline";

const MONO = '"Aptos Mono", var(--font-mono), ui-monospace, SFMono-Regular, monospace';
type CSS = React.CSSProperties;

// ── shared style helpers (match the tracker) ─────────────────────────────
const cardStyle: CSS = {
  background: "#fff",
  border: "1px solid rgba(35,35,35,0.08)",
  borderRadius: 10,
  boxShadow: "0 1px 2px rgba(35,35,35,0.05)",
};
const labelStyle: CSS = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#6a6a6a",
  marginBottom: 7,
};
const inputStyle: CSS = {
  width: "100%",
  padding: "10px 12px",
  background: "#f2f2f2",
  border: "1px solid rgba(35,35,35,0.1)",
  borderRadius: 7,
  fontSize: 13.5,
  color: "#232323",
};
const eyebrowStyle: CSS = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#5a5a5a",
};

function chip(bg: string, fg: string): CSS {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "3px 9px",
    borderRadius: 5,
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: "0.03em",
    background: bg,
    color: fg,
    whiteSpace: "nowrap",
  };
}
function statusChip(s: ContactStatus): CSS {
  const m = STATUS_META[s];
  return chip(m.bg, m.fg);
}
function avatarStyle(name: string, size = 26): CSS {
  return {
    width: size,
    height: size,
    borderRadius: "50%",
    background: avatarColor(name),
    color: "#f7f9f8",
    fontSize: size * 0.38,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };
}

// A small, always-visible tag that names a stub honestly.
function MockTag({ label = "mock" }: { label?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        borderRadius: 4,
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: "#fff0e2",
        color: "#b3560f",
        border: "1px dashed rgba(179,86,15,0.4)",
      }}
    >
      {label}
    </span>
  );
}

const btnPrimary: CSS = {
  padding: "12px 18px",
  background: "#1e90ff",
  color: "#f7f9f8",
  border: "none",
  cursor: "pointer",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
};
const btnGhost: CSS = {
  padding: "12px 16px",
  background: "#fff",
  color: "#5a5a5a",
  border: "1px solid rgba(35,35,35,0.16)",
  cursor: "pointer",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
};

// ── Stateful pieces live at module scope so their local state (a form, an
// import in progress, an expanded payload) survives every parent re-render.
// Nested render helpers below use only hoisted state, so they stay inline.

type NewContact = Omit<Contact, "id" | "event_id" | "created_at" | "updated_at">;

function SingleAdd({
  onAdd,
  onFlash,
}: {
  onAdd: (c: NewContact) => void;
  onFlash: (m: string) => void;
}) {
  const [f, setF] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    source_campaign: "Reindustrialize outbound — Detroit",
    owner_id: "u_david",
    status: "responded" as ContactStatus,
  });
  const [err, setErr] = useState("");
  const bind =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setF((s) => ({ ...s, [k]: e.target.value }));
  const submit = () => {
    if (!f.name.trim() || !f.company.trim()) {
      setErr("name and company are required.");
      return;
    }
    onAdd({
      name: f.name.trim(),
      company: f.company.trim(),
      title: f.title.trim() || null,
      email: f.email.trim() || null,
      source_campaign: f.source_campaign,
      owner_id: f.owner_id,
      status: f.status,
      next_step: null,
      notes: null,
    });
    setF((s) => ({ ...s, name: "", company: "", title: "", email: "" }));
    setErr("");
    onFlash("contact added");
  };
  return (
    <div style={{ ...cardStyle, padding: 22 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>Add a contact</h2>
      <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 4 }}>
        the in-event capture step — optimized for speed
      </div>
      <div className="pl-addgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>name *</label>
          <input value={f.name} onChange={bind("name")} placeholder="Jane Doe" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>company *</label>
          <input value={f.company} onChange={bind("company")} placeholder="Acme Industrial" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>title</label>
          <input value={f.title} onChange={bind("title")} placeholder="VP Engineering" style={inputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>email</label>
          <input value={f.email} onChange={bind("email")} placeholder="jane@acme.com" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>owner</label>
          <select value={f.owner_id} onChange={bind("owner_id")} style={inputStyle}>
            {REPS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>status</label>
          <select value={f.status} onChange={bind("status")} style={inputStyle}>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>source campaign</label>
          <input value={f.source_campaign} onChange={bind("source_campaign")} style={inputStyle} />
        </div>
      </div>
      {err && <div style={{ fontSize: 12.5, color: "#d13a4f", marginTop: 12 }}>{err}</div>}
      <button onClick={submit} className="pl-primary" style={{ ...btnPrimary, marginTop: 16, width: "100%" }}>
        + add to pipeline
      </button>
    </div>
  );
}

function BulkImport({
  eventId,
  onImport,
  onFlash,
}: {
  eventId: string;
  onImport: (created: Contact[]) => void;
  onFlash: (m: string) => void;
}) {
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [mapping, setMapping] = useState<ContactField[]>([]);
  const [owner, setOwner] = useState("u_david");
  const [status, setStatus] = useState<ContactStatus>("targeted");
  const [campaign, setCampaign] = useState("Reindustrialize outbound — Detroit");

  const doParse = () => {
    const p = parseDelimited(raw);
    if (!p.headers.length) return;
    setParsed(p);
    setMapping(p.headers.map((h) => guessMapping(h)));
  };
  const setCol = (i: number, field: ContactField) =>
    setMapping((m) => m.map((x, idx) => (idx === i ? field : x)));

  const doImport = () => {
    if (!parsed) return;
    const created: Contact[] = [];
    for (const row of parsed.rows) {
      const rec: Partial<Record<ContactField, string>> = {};
      mapping.forEach((field, i) => {
        if (field !== "ignore" && row[i]) rec[field] = row[i];
      });
      if (!rec.name && !rec.company) continue;
      created.push({
        id: newContactId(),
        event_id: eventId,
        name: rec.name || "(no name)",
        company: rec.company || "(no company)",
        title: rec.title || null,
        email: rec.email || null,
        source_campaign: rec.source_campaign || campaign,
        owner_id: owner,
        status,
        next_step: null,
        notes: rec.notes || null,
        created_at: nowIso(),
        updated_at: nowIso(),
      });
    }
    if (!created.length) {
      onFlash("nothing to import — map at least name or company");
      return;
    }
    onImport(created);
    setRaw("");
    setParsed(null);
    setMapping([]);
    onFlash(`imported ${created.length} contacts`);
  };

  return (
    <div style={{ ...cardStyle, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>Bulk import</h2>
        <MockTag label="migration path" />
      </div>
      <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 4 }}>
        paste spreadsheet rows (CSV or straight from a sheet), map the columns
      </div>

      {!parsed ? (
        <>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={7}
            placeholder={"name, company, title, email, campaign\nJane Doe, Acme Industrial, VP Eng, jane@acme.com, Detroit outbound"}
            style={{ ...inputStyle, marginTop: 14, resize: "vertical", lineHeight: 1.5, fontFamily: MONO, fontSize: 12 }}
          />
          <button onClick={doParse} className="pl-primary" style={{ ...btnPrimary, marginTop: 12, width: "100%" }}>
            parse &amp; map columns
          </button>
        </>
      ) : (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 12, color: "#6a6a6a", marginBottom: 10 }}>
            {parsed.rows.length} rows · map each column to a field
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
            {parsed.headers.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    flex: 1,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "#232323",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={`${h} · e.g. "${parsed.rows[0]?.[i] ?? ""}"`}
                >
                  {h || `column ${i + 1}`}
                  <span style={{ color: "#a0a0a0", fontWeight: 400 }}>
                    {" "}
                    {parsed.rows[0]?.[i] ? `· ${parsed.rows[0][i]}` : ""}
                  </span>
                </div>
                <span style={{ color: "#c0c0c0" }}>→</span>
                <select
                  value={mapping[i]}
                  onChange={(e) => setCol(i, e.target.value as ContactField)}
                  style={{ ...inputStyle, width: 150, padding: "7px 10px", fontSize: 12.5 }}
                >
                  {IMPORT_FIELDS.map((fld) => (
                    <option key={fld.key} value={fld.key}>
                      {fld.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            <div>
              <label style={labelStyle}>default owner</label>
              <select value={owner} onChange={(e) => setOwner(e.target.value)} style={{ ...inputStyle, padding: "8px 10px" }}>
                {REPS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>default status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ContactStatus)} style={{ ...inputStyle, padding: "8px 10px" }}>
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>default campaign (if unmapped)</label>
              <input value={campaign} onChange={(e) => setCampaign(e.target.value)} style={{ ...inputStyle, padding: "8px 10px" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button onClick={doImport} className="pl-primary" style={{ ...btnPrimary, flex: 1 }}>
              import {parsed.rows.length} contacts
            </button>
            <button
              onClick={() => {
                setParsed(null);
                setMapping([]);
              }}
              className="pl-ghost"
              style={btnGhost}
            >
              back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CrmCard({ c }: { c: Contact }) {
  const [open, setOpen] = useState(false);
  const ev = eventById(c.event_id);
  const payload: CrmPayload | null = c.crm?.payload || (ev ? previewPayload(c, ev) : null);
  const synced = !!c.crm?.synced;
  return (
    <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>
            {c.company} — {c.name}
          </div>
          <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 2 }}>
            {STATUS_META[c.status].label} · owner {repName(c.owner_id).split(" ")[0]}
          </div>
        </div>
        {synced ? (
          <span style={chip("#e4f7e8", "#1a7d2a")}>✓ synced to HubSpot</span>
        ) : (
          <span style={chip("#fff0e2", "#b3560f")}>pending push</span>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="pl-ghost"
          style={{ ...btnGhost, padding: "7px 12px", fontSize: 12 }}
        >
          {open ? "hide payload" : "view payload"}
        </button>
      </div>
      {open && payload && (
        <div style={{ borderTop: "1px solid rgba(35,35,35,0.08)", background: "#232323" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderBottom: "1px solid rgba(247,249,248,0.1)",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(247,249,248,0.6)" }}>
              POST /crm/v3/objects/deals
            </span>
            <MockTag label="no real call" />
          </div>
          <pre
            style={{
              margin: 0,
              padding: "16px 20px",
              fontFamily: MONO,
              fontSize: 11.5,
              lineHeight: 1.55,
              color: "#c9e6ff",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
export default function EventPipeline() {
  const [loaded, setLoaded] = useState(false);
  const [role, setRole] = useState<Role>("bd");
  const [eventId, setEventId] = useState<string>(DEMO_EVENT_ID);
  const [salesUserId, setSalesUserId] = useState<string>("u_david");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crm = useRef(new MockCrmClient());

  const events = pipelineEvents();

  // ── load / persist ──
  useEffect(() => {
    let saved: Contact[] | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {}
    setContacts(saved && saved.length ? saved : buildSeedContacts());
    // Deep-link support: a tracker event detail links in with ?event=<id>, so
    // the pipeline opens on that event rather than always the demo one.
    try {
      const q = new URLSearchParams(window.location.search).get("event");
      if (q && events.some((e) => e.id === q)) setEventId(q);
    } catch {}
    setLoaded(true);
    // events is derived from static seed data — stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (next: Contact[]) => {
    setContacts(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  };

  const reseed = () => {
    persist(buildSeedContacts());
    flash("re-seeded the sample pipeline");
  };

  // ── derived ──
  const event = eventById(eventId) as TrackedEvent | undefined;
  const eventContacts = useMemo(
    () => contacts.filter((c) => c.event_id === eventId),
    [contacts, eventId]
  );

  // ── writes ──
  const updateContact = (id: string, patch: Partial<Contact>) => {
    persist(contacts.map((c) => (c.id === id ? { ...c, ...patch, updated_at: nowIso() } : c)));
  };

  // The one place status changes flow through — so the CRM push fires exactly
  // once, on the transition into `opportunity`, and every view re-lenses off
  // the same record with no second data entry.
  const setStatus = (id: string, status: ContactStatus) => {
    const c = contacts.find((x) => x.id === id);
    if (!c || !event) return;
    if (status === "opportunity" && !c.crm?.synced) {
      const updated: Contact = { ...c, status, updated_at: nowIso() };
      crm.current.pushOpportunity(updated, event).then((res) => {
        persist(
          contacts.map((x) =>
            x.id === id
              ? {
                  ...updated,
                  crm: {
                    synced: true,
                    system: res.system,
                    syncedAt: res.syncedAt,
                    payload: res.payload,
                  },
                }
              : x
          )
        );
        flash(`pushed ${c.company} to HubSpot (mock)`);
      });
      return;
    }
    updateContact(id, { status });
    flash(`${c.name} → ${STATUS_META[status].label}`);
  };

  const addContact = (partial: NewContact) => {
    const c: Contact = {
      id: newContactId(),
      event_id: eventId,
      created_at: nowIso(),
      updated_at: nowIso(),
      ...partial,
    };
    persist([c, ...contacts]);
  };

  const enrollNurture = (id: string) => {
    const c = contacts.find((x) => x.id === id);
    if (!c) return;
    updateContact(id, { nurture: { queued: true, segment: "post-event nurture", at: nowIso() } });
    flash(`${c.name} queued for nurture`);
  };

  // ─────────────────────────────────────────────────────────────────────
  return (
    <div
      data-pl
      style={{
        minHeight: "100dvh",
        background: "#eaeaea",
        color: "#232323",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <style>{`
        [data-pl] *{box-sizing:border-box;}
        [data-pl] .pl-primary{transition:background 140ms;}
        [data-pl] .pl-primary:hover{background:#0f74d4 !important;}
        [data-pl] .pl-ghost:hover{background:#f2f2f2 !important;}
        [data-pl] .pl-fade{animation:plFade 320ms cubic-bezier(0.22,0.61,0.36,1);}
        @keyframes plFade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
        @keyframes plToast{from{opacity:0;transform:translate(-50%,12px);}to{opacity:1;transform:translate(-50%,0);}}
        [data-pl] :focus-visible{outline:2px solid #1e90ff;outline-offset:2px;border-radius:5px;}
        [data-pl] [style*="uppercase"]{font-family:"Aptos Mono",var(--font-mono),ui-monospace,SFMono-Regular,monospace;}
        [data-pl] button{font-family:"Aptos Mono",var(--font-mono),ui-monospace,SFMono-Regular,monospace;text-transform:uppercase;letter-spacing:0.06em;}
        [data-pl] input:focus,[data-pl] select:focus,[data-pl] textarea:focus{border-color:rgba(30,144,255,0.55);}
        @media (prefers-reduced-motion: reduce){[data-pl] .pl-fade{animation:none;}[data-pl] *{transition:none !important;}}
        @media (max-width:820px){
          [data-pl] .pl-crumb{padding:10px 16px 0 !important;}
          [data-pl] .pl-topgrid{flex-direction:column !important;align-items:stretch !important;padding:14px 16px !important;gap:14px !important;}
          [data-pl] .pl-topsub{padding:0 16px 12px !important;}
          [data-pl] .pl-main{padding:20px 16px 72px !important;}
          [data-pl] .pl-2col{grid-template-columns:1fr !important;}
          [data-pl] .pl-brandrow{flex-wrap:wrap !important;gap:12px !important;}
          [data-pl] .pl-divider{display:none !important;}
          [data-pl] .pl-eventwrap{flex:1 1 100% !important;}
          [data-pl] .pl-eventselect{max-width:100% !important;width:100% !important;}
          [data-pl] .pl-controls{width:100% !important;justify-content:space-between !important;align-items:flex-end !important;gap:10px !important;}
          [data-pl] .pl-viewas [role="tab"]{padding:8px 12px !important;}
        }
        @media (max-width:560px){
          [data-pl] .pl-addgrid{grid-template-columns:1fr !important;}
          [data-pl] .pl-h1{font-size:23px !important;}
          [data-pl] .pl-attrgrid{grid-template-columns:1fr 1fr !important;}
          [data-pl] .pl-salesbtns > button{width:100% !important;}
          [data-pl] .pl-viewas{flex-wrap:wrap !important;}
          [data-pl] .pl-viewas [role="tab"]{font-size:11px !important;padding:8px 10px !important;}
        }
      `}</style>

      {TopBar()}

      <main className="pl-main" style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 32px 80px" }}>
        {!loaded && (
          <div style={{ padding: 80, textAlign: "center", color: "#6a6a6a", fontSize: 14 }}>
            loading the pipeline…
          </div>
        )}
        {loaded && !event && (
          <div style={{ padding: 60, textAlign: "center", color: "#6a6a6a" }}>no event selected.</div>
        )}
        {loaded && event && role === "bd" && CaptureSurface(event)}
        {loaded && event && role === "marketing" && MarketingSurface(event)}
        {loaded && event && role === "sales" && SalesSurface(event)}
      </main>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 26,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#232323",
            color: "#f7f9f8",
            padding: "13px 22px",
            borderRadius: 8,
            fontSize: 13.5,
            fontWeight: 500,
            boxShadow: "0 10px 30px rgba(35,35,35,0.25)",
            animation: "plToast 260ms cubic-bezier(0.22,0.61,0.36,1)",
            zIndex: 50,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );

  // ─── Top bar: event + View-as switcher (the demo control) ──────────────
  function TopBar() {
    return (
      <header style={{ background: "#232323", color: "#f7f9f8", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
        <div
          className="pl-crumb"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "10px 32px 0",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "rgba(247,249,248,0.5)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/projects/roebling-gtm" style={{ color: "rgba(247,249,248,0.7)", textDecoration: "none", fontWeight: 600 }}>
            ← case study
          </Link>
          <span style={{ opacity: 0.4 }}>·</span>
          <Link href="/projects/roebling-gtm/events" style={{ color: "rgba(247,249,248,0.7)", textDecoration: "none", fontWeight: 600 }}>
            events tracker
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "#1e90ff", fontWeight: 600 }}>pipeline</span>
        </div>
        <div
          className="pl-topgrid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div className="pl-brandrow" style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>roebling</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#1e90ff",
                  marginTop: 5,
                }}
              >
                event pipeline
              </div>
            </div>
            <div className="pl-divider" style={{ height: 34, width: 1, background: "rgba(247,249,248,0.16)", flexShrink: 0 }} />
            <div className="pl-eventwrap" style={{ minWidth: 0 }}>
              <label
                style={{
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(247,249,248,0.45)",
                }}
              >
                event
              </label>
              <select
                aria-label="Select event"
                className="pl-eventselect"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                style={{
                  display: "block",
                  marginTop: 3,
                  maxWidth: 320,
                  background: "rgba(247,249,248,0.08)",
                  color: "#f7f9f8",
                  border: "1px solid rgba(247,249,248,0.14)",
                  borderRadius: 6,
                  padding: "6px 10px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id} style={{ color: "#232323" }}>
                    {ev.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pl-controls" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div className="pl-viewas-wrap">
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(247,249,248,0.45)",
                  marginBottom: 5,
                }}
              >
                view as
              </div>
              <div
                role="tablist"
                aria-label="View as role"
                className="pl-viewas"
                style={{ display: "flex", background: "rgba(247,249,248,0.07)", borderRadius: 8, padding: 3 }}
              >
                {(["bd", "sales", "marketing"] as Role[]).map((r) => {
                  const on = role === r;
                  return (
                    <button
                      key={r}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setRole(r)}
                      style={{
                        padding: "8px 15px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: 6,
                        fontSize: 12.5,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        transition: "all 140ms",
                        background: on ? "#1e90ff" : "transparent",
                        color: on ? "#f7f9f8" : "rgba(247,249,248,0.62)",
                      }}
                    >
                      {ROLE_META[r].label}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={reseed}
              className="pl-ghost"
              style={{
                alignSelf: "flex-end",
                padding: "8px 14px",
                background: "rgba(247,249,248,0.08)",
                color: "rgba(247,249,248,0.8)",
                border: "1px solid rgba(247,249,248,0.14)",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ↺ reset data
            </button>
          </div>
        </div>
        <div
          className="pl-topsub"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 32px 14px",
            fontSize: 12.5,
            color: "rgba(247,249,248,0.5)",
          }}
        >
          one event object · {ROLE_META[role].blurb}
        </div>
      </header>
    );
  }

  // ─── shared: funnel bar ────────────────────────────────────────────────
  function FunnelBar(list: Contact[]) {
    const r = rollup(list);
    return (
      <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
        {STATUS_ORDER.map((s) => {
          const n = r.byStatus[s];
          const pct = r.total ? (n / r.total) * 100 : 0;
          if (!n) return null;
          return (
            <div
              key={s}
              title={`${STATUS_META[s].label}: ${n}`}
              style={{ width: `${pct}%`, minWidth: 8, height: 10, background: STATUS_META[s].dot, borderRadius: 2 }}
            />
          );
        })}
      </div>
    );
  }

  function SurfaceHeader({
    ev,
    eyebrow,
    title,
    blurb,
  }: {
    ev: TrackedEvent;
    eyebrow: string;
    title: string;
    blurb: string;
  }) {
    return (
      <div>
        <div style={eyebrowStyle}>{eyebrow}</div>
        <h1 className="pl-h1" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em", margin: "8px 0 0", lineHeight: 1.1 }}>
          {title}
        </h1>
        <p style={{ fontSize: 14.5, color: "#5a5a5a", margin: "10px 0 0", maxWidth: 640, lineHeight: 1.5 }}>{blurb}</p>
        <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 12 }}>
          {ev.name} · {dateRange(ev.start, ev.end)} · {ev.location}
        </div>
      </div>
    );
  }

  function BackToTracker() {
    return (
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(35,35,35,0.1)" }}>
        <Link href="/projects/roebling-gtm/events" style={{ fontSize: 13, fontWeight: 600, color: "#1e90ff", textDecoration: "none" }}>
          ← back to the events tracker
        </Link>
      </div>
    );
  }

  // ─── Surface 1 · BD capture ────────────────────────────────────────────
  function CaptureSurface(ev: TrackedEvent) {
    return (
      <div className="pl-fade">
        <SurfaceHeader
          ev={ev}
          eyebrow="in-event · capture"
          title="Log responders as they come in"
          blurb="The spreadsheet, replaced — same manual logging, but into a live record every view reads from. Add one, or paste a whole list to migrate an event's history in."
        />
        <div className="pl-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          <SingleAdd onAdd={addContact} onFlash={flash} />
          <BulkImport
            eventId={eventId}
            onImport={(created) => persist([...created, ...contacts])}
            onFlash={flash}
          />
        </div>
        {ContactTable()}
      </div>
    );
  }

  function ContactTable() {
    const cols = "1.6fr 1.4fr 1.3fr 1fr 1.3fr";
    return (
      <div style={{ ...cardStyle, marginTop: 20, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(35,35,35,0.08)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{eventContacts.length} contacts on this event</h2>
            <span style={{ fontSize: 12, color: "#6a6a6a" }}>status changes flow to every view</span>
          </div>
          {FunnelBar(eventContacts)}
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 720 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: cols,
                gap: 12,
                padding: "11px 22px",
                background: "#f2f2f2",
                borderBottom: "1px solid rgba(35,35,35,0.08)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#6a6a6a",
              }}
            >
              <div>contact</div>
              <div>company</div>
              <div>campaign</div>
              <div>owner</div>
              <div>status</div>
            </div>
            {eventContacts.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: cols,
                  gap: 12,
                  alignItems: "center",
                  padding: "12px 22px",
                  borderBottom: "1px solid rgba(35,35,35,0.06)",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#232323" }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: "#6a6a6a" }}>{c.title || "—"}</div>
                </div>
                <div style={{ fontSize: 13, color: "#333" }}>{c.company}</div>
                <div style={{ fontSize: 12, color: "#6a6a6a" }}>{c.source_campaign}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={avatarStyle(repName(c.owner_id), 22)}>{initials(repName(c.owner_id))}</div>
                  <span style={{ fontSize: 12, color: "#5a5a5a" }}>{repName(c.owner_id).split(" ")[0]}</span>
                </div>
                <div>
                  <select
                    aria-label={`Status for ${c.name}`}
                    value={c.status}
                    onChange={(e) => setStatus(c.id, e.target.value as ContactStatus)}
                    style={{ ...statusChip(c.status), padding: "5px 8px", fontSize: 11.5, border: "none", cursor: "pointer" }}
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s} style={{ background: "#fff", color: "#232323" }}>
                        {STATUS_META[s].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            {!eventContacts.length && (
              <div style={{ padding: 40, textAlign: "center", color: "#6a6a6a", fontSize: 13.5 }}>
                no contacts yet — add one above.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Surface 2 · Marketing ─────────────────────────────────────────────
  function MarketingSurface(ev: TrackedEvent) {
    const r = rollup(eventContacts);
    const sig = evaluatorSignal(ev, r);
    const nurture = eventContacts.filter((c) =>
      (["targeted", "responded", "no_show"] as ContactStatus[]).includes(c.status)
    );
    return (
      <div className="pl-fade">
        <SurfaceHeader
          ev={ev}
          eyebrow="marketing tracking"
          title="Nurture segments & attribution, off the same records"
          blurb="No re-keying, no export. The nurture list is a filter on status; attribution is a count of it. Both update the instant sales moves a contact."
        />

        <div style={{ ...cardStyle, padding: 24, marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>Attribution — this event</h2>
            <div style={{ fontSize: 12.5, color: "#6a6a6a" }}>
              {r.total} contacts · {r.responded} engaged · {r.opportunities} opps · {r.won} won
            </div>
          </div>
          <div style={{ marginTop: 14 }}>{FunnelBar(eventContacts)}</div>
          <div className="pl-attrgrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginTop: 20 }}>
            {STATUS_ORDER.map((s) => (
              <div key={s} style={{ background: "#f7f7f7", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_META[s].dot }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#6a6a6a" }}>{STATUS_META[s].label}</span>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 28, lineHeight: 1, marginTop: 8, color: "#232323" }}>
                  {r.byStatus[s]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pl-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
          <div style={{ ...cardStyle, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Feeds the evaluator</h2>
              <MockTag label="display only" />
            </div>
            <p style={{ fontSize: 13, color: "#5a5a5a", lineHeight: 1.5, marginTop: 8 }}>
              Next time the team asks &ldquo;is {ev.name.split(" ").slice(0, 2).join(" ")}{" "}worth it,&rdquo; the score can
              be grounded in what actually happened — not a guess.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, padding: "16px 18px", background: "#f7f7f7", borderRadius: 9 }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6a6a6a" }}>
                  Fuel &amp; Engine
                </div>
                <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 4 }}>scored {sig.prior ?? "–"}/5 before the event</div>
              </div>
              <div style={{ fontSize: 22, color: "#c0c0c0" }}>→</div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 34, lineHeight: 1, color: "#1a7d2a" }}>
                  {sig.grounded ?? "–"}
                  <span style={{ fontSize: 15, color: "#6a6a6a" }}>/5</span>
                </div>
                <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 4 }}>
                  grounded in {r.opportunities} opps, {r.meetings} meetings
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 12 }}>
              {sig.delta == null
                ? "no prior score to compare."
                : sig.delta > 0
                ? `pipeline says this event earned +${sig.delta} vs. the pre-event guess.`
                : sig.delta < 0
                ? `pipeline says this event ran ${sig.delta} below the pre-event guess.`
                : "pipeline confirms the pre-event guess."}{" "}
              Auto-feeding the score is a later phase.
            </div>
          </div>

          <div style={{ ...cardStyle, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Nurture segment</h2>
              <MockTag label="no sending" />
            </div>
            <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 4 }}>
              status in targeted · responded · no-show — {nurture.length} contacts
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
              {nurture.map((c) => (
                <div
                  key={c.id}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 4px", borderBottom: "1px solid rgba(35,35,35,0.06)" }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 11.5, color: "#6a6a6a" }}>{c.company}</div>
                  </div>
                  <span style={statusChip(c.status)}>{STATUS_META[c.status].short}</span>
                  {c.nurture?.queued ? (
                    <span style={chip("#e4f7e8", "#1a7d2a")}>✓ queued</span>
                  ) : (
                    <button
                      onClick={() => enrollNurture(c.id)}
                      className="pl-ghost"
                      style={{
                        padding: "6px 12px",
                        background: "#fff",
                        color: "#1268c9",
                        border: "1px solid rgba(30,144,255,0.4)",
                        borderRadius: 6,
                        fontSize: 11.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      enroll
                    </button>
                  )}
                </div>
              ))}
              {!nurture.length && (
                <div style={{ fontSize: 13, color: "#6a6a6a", padding: "12px 0" }}>no one in the nurture segment right now.</div>
              )}
            </div>
          </div>
        </div>

        {BackToTracker()}
      </div>
    );
  }

  // ─── Surface 3 · Sales copilot ─────────────────────────────────────────
  function SalesSurface(ev: TrackedEvent) {
    const me = salesUserId;
    const myFollowUp = eventContacts.filter(
      (c) => c.owner_id === me && (["meeting_booked", "met"] as ContactStatus[]).includes(c.status)
    );
    const myOpps = eventContacts.filter(
      (c) => c.owner_id === me && (["opportunity", "won", "lost"] as ContactStatus[]).includes(c.status)
    );

    return (
      <div className="pl-fade">
        <SurfaceHeader
          ev={ev}
          eyebrow="follow-ups"
          title="Your follow-up list, with marketing's context attached"
          blurb="Only what's yours and actionable — booked and met. Each card carries the event, the campaign that sourced them, and everyone else you're touching at the same company. A sales-only tool structurally can't show that."
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12.5, color: "#6a6a6a", fontWeight: 600 }}>you are</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {salesReps().map((r) => {
              const on = r.id === me;
              return (
                <button
                  key={r.id}
                  onClick={() => setSalesUserId(r.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 12px 6px 6px",
                    borderRadius: 20,
                    border: on ? "1px solid #1e90ff" : "1px solid rgba(35,35,35,0.14)",
                    background: on ? "#e7f2ff" : "#fff",
                    cursor: "pointer",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: on ? "#1268c9" : "#5a5a5a",
                  }}
                >
                  <div style={avatarStyle(r.name, 22)}>{initials(r.name)}</div>
                  {r.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          {myFollowUp.map((c) => SalesCard(c, ev))}
          {!myFollowUp.length && (
            <div style={{ ...cardStyle, padding: 44, textAlign: "center", color: "#6a6a6a", fontSize: 14 }}>
              nothing booked or met for {repName(me).split(" ")[0]} on this event. try another rep, or switch to In-Event to
              log some.
            </div>
          )}
        </div>

        {myOpps.length > 0 && (
          <div style={{ marginTop: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>Pushed to HubSpot</h2>
              <MockTag />
            </div>
            <div style={{ fontSize: 12.5, color: "#6a6a6a", marginTop: 4 }}>
              becoming an opportunity fires the CRM push once — replacing marketing&apos;s manual re-entry
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              {myOpps.map((c) => (
                <CrmCard key={c.id} c={c} />
              ))}
            </div>
          </div>
        )}

        {BackToTracker()}
      </div>
    );
  }

  function SalesCard(c: Contact, ev: TrackedEvent) {
    const sameCompany = eventContacts.filter((x) => x.company === c.company && x.id !== c.id);
    const nexts = STATUS_NEXT[c.status];
    return (
      <div key={c.id} style={{ ...cardStyle, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 12, minWidth: 0 }}>
            <div style={avatarStyle(c.name, 40)}>{initials(c.name)}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.name}</div>
              <div style={{ fontSize: 13, color: "#5a5a5a" }}>
                {c.title ? `${c.title} · ` : ""}
                {c.company}
              </div>
            </div>
          </div>
          <span style={statusChip(c.status)}>{STATUS_META[c.status].label}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 14,
            padding: "10px 12px",
            background: "#f7f7f7",
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          <span style={{ color: "#6a6a6a" }}>
            from <b style={{ color: "#232323" }}>{ev.name}</b>
          </span>
          <span style={{ color: "#c0c0c0" }}>·</span>
          <span style={{ color: "#6a6a6a" }}>
            campaign <b style={{ color: "#232323" }}>{c.source_campaign}</b>
          </span>
          {sameCompany.length > 0 && (
            <>
              <span style={{ color: "#c0c0c0" }}>·</span>
              <span style={{ color: "#6a6a6a" }}>
                also at {c.company}:{" "}
                {sameCompany.map((s, i) => (
                  <span key={s.id} style={{ color: "#232323" }}>
                    <b>{s.name.split(" ")[0]}</b>
                    <span style={{ color: "#8a8a8a" }}> ({STATUS_META[s.status].short})</span>
                    {i < sameCompany.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>

        <div className="pl-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          <div>
            <label style={labelStyle}>next step</label>
            <input
              value={c.next_step || ""}
              onChange={(e) => updateContact(c.id, { next_step: e.target.value })}
              placeholder="what's the next move?"
              style={{ ...inputStyle, fontSize: 13 }}
            />
          </div>
          <div>
            <label style={labelStyle}>notes</label>
            <input
              value={c.notes || ""}
              onChange={(e) => updateContact(c.id, { notes: e.target.value })}
              placeholder="context…"
              style={{ ...inputStyle, fontSize: 13 }}
            />
          </div>
        </div>

        <div className="pl-salesbtns" style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
          {nexts.map((s) => {
            const opp = s === "opportunity";
            return (
              <button
                key={s}
                onClick={() => setStatus(c.id, s)}
                className={opp ? "pl-primary" : "pl-ghost"}
                style={{
                  padding: "9px 16px",
                  borderRadius: 7,
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: opp ? "none" : "1px solid rgba(35,35,35,0.16)",
                  background: opp ? "#2ac33c" : "#fff",
                  color: opp ? "#0f3d17" : "#5a5a5a",
                }}
              >
                {opp ? "→ mark opportunity (push to CRM)" : `→ ${STATUS_META[s].label}`}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
