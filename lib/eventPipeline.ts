// ── The contact layer ────────────────────────────────────────────────────
// One event object, one store. A Contact is always a child of an Event
// (the tracker's TrackedEvent), tied by event_id. Sales and marketing are
// two *views* of these same records — never a second synced system.
//
// This is prototype mode: persistence is localStorage, "auth" is a View-as
// switcher, and the CRM push is mocked behind the CrmClient interface so it
// swaps to real HubSpot later without touching a single caller.

import { seedEvents, type TrackedEvent } from "./roeblingEvents";

// ── Roles (stubbed auth) ─────────────────────────────────────────────────
export type Role = "bd" | "sales" | "marketing";

export const ROLE_META: Record<Role, { label: string; blurb: string }> = {
  bd: {
    label: "In-Event",
    blurb: "captures responders as they come in — the intake step before sales",
  },
  sales: {
    label: "Follow-Ups",
    blurb: "works the follow-ups after capture — a personal list with marketing context attached",
  },
  marketing: {
    label: "Marketing Tracking",
    blurb: "runs nurture segments and reads attribution off the same records",
  },
};

// ── Status enum — the spine ──────────────────────────────────────────────
// targeted → responded → meeting_booked → met → opportunity → won
//                                      ↘ no_show           ↘ lost
export type ContactStatus =
  | "targeted"
  | "responded"
  | "meeting_booked"
  | "met"
  | "no_show"
  | "opportunity"
  | "won"
  | "lost";

// Ordered spine used for rollups, the funnel bar, and "progress".
export const STATUS_SPINE: ContactStatus[] = [
  "targeted",
  "responded",
  "meeting_booked",
  "met",
  "opportunity",
  "won",
];

// Every status, in a sensible display order (branches included).
export const STATUS_ORDER: ContactStatus[] = [
  "targeted",
  "responded",
  "meeting_booked",
  "met",
  "no_show",
  "opportunity",
  "won",
  "lost",
];

export type StatusMeta = {
  label: string;
  short: string;
  bg: string;
  fg: string;
  dot: string;
  who: string; // who sets it, per the spec
};

export const STATUS_META: Record<ContactStatus, StatusMeta> = {
  targeted: {
    label: "Targeted",
    short: "Targeted",
    bg: "#ededed",
    fg: "#5a5a5a",
    dot: "#909090",
    who: "Marketing, on import",
  },
  responded: {
    label: "Responded",
    short: "Responded",
    bg: "#e7f2ff",
    fg: "#1268c9",
    dot: "#1e90ff",
    who: "BD, at capture",
  },
  meeting_booked: {
    label: "Meeting booked",
    short: "Booked",
    bg: "#e7f2ff",
    fg: "#0f5fb8",
    dot: "#1878e6",
    who: "BD / Sales",
  },
  met: {
    label: "Met",
    short: "Met",
    bg: "#e9edff",
    fg: "#3b3fb0",
    dot: "#4a4fd0",
    who: "Sales",
  },
  no_show: {
    label: "No-show",
    short: "No-show",
    bg: "#fff0e2",
    fg: "#b3560f",
    dot: "#ff882d",
    who: "Sales",
  },
  opportunity: {
    label: "Opportunity",
    short: "Opp",
    bg: "#e4f7e8",
    fg: "#1a7d2a",
    dot: "#2ac33c",
    who: "Sales — pushes to CRM",
  },
  won: {
    label: "Won",
    short: "Won",
    bg: "#d6f5dd",
    fg: "#0f6b22",
    dot: "#1aa338",
    who: "Sales",
  },
  lost: {
    label: "Lost",
    short: "Lost",
    bg: "#f7e4e7",
    fg: "#a8283c",
    dot: "#c0304f",
    who: "Sales",
  },
};

// Which follow-on statuses each state can move to. Keeps the demo honest to
// the spine without hard-locking (a reviewer can always correct a mistake).
export const STATUS_NEXT: Record<ContactStatus, ContactStatus[]> = {
  targeted: ["responded", "meeting_booked", "lost"],
  responded: ["meeting_booked", "lost"],
  meeting_booked: ["met", "no_show", "lost"],
  met: ["opportunity", "lost"],
  no_show: ["meeting_booked", "lost"],
  opportunity: ["won", "lost"],
  won: [],
  lost: ["responded"],
};

// ── Model ────────────────────────────────────────────────────────────────
export type CrmSync = {
  synced: boolean;
  system: "HubSpot";
  syncedAt: string;
  payload: CrmPayload;
};

export type Contact = {
  id: string;
  event_id: string; // FK → Event; a contact never exists without one
  name: string;
  company: string;
  title?: string | null;
  email?: string | null;
  source_campaign: string; // which outbound campaign pulled them in
  owner_id: string; // the BD/sales rep; powers "my" in the sales view
  status: ContactStatus;
  next_step?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  crm?: CrmSync; // set once the opportunity push fires
  nurture?: NurtureState; // set when marketing enrolls them in nurture
};

// "Enroll in nurture" sets a segment flag and shows a queued state. There is
// no email provider in the prototype — we demonstrate the trigger, not sending.
export type NurtureState = { queued: boolean; segment: string; at: string };

// The reps who can own a contact. owner_id references these.
export type Rep = { id: string; name: string; role: Role };

export const REPS: Rep[] = [
  { id: "u_zoei", name: "Zoei Benzon", role: "marketing" },
  { id: "u_kelsey", name: "Kelsey Reed", role: "bd" },
  { id: "u_david", name: "David Okafor", role: "sales" },
  { id: "u_marcus", name: "Marcus Lang", role: "sales" },
  { id: "u_priya", name: "Priya Nair", role: "sales" },
];

export const repName = (id: string) => REPS.find((r) => r.id === id)?.name || id;
export const salesReps = () => REPS.filter((r) => r.role === "sales");

// The event this prototype's pipeline hangs off. Reindustrialize 3.0 is a
// US-hub industrial conference already scheduled in the tracker — exactly the
// kind of event Roebling runs outbound for.
export const DEMO_EVENT_ID = "e99";

export function pipelineEvents(): TrackedEvent[] {
  // Events eligible for a pipeline: anything scheduled (approved & happening).
  // The demo event is pinned first so the surface loads populated.
  const scheduled = seedEvents.filter((e) => e.status === "scheduled");
  const demo = scheduled.find((e) => e.id === DEMO_EVENT_ID);
  const rest = scheduled.filter((e) => e.id !== DEMO_EVENT_ID);
  return demo ? [demo, ...rest] : scheduled;
}

export function eventById(id: string): TrackedEvent | undefined {
  return seedEvents.find((e) => e.id === id);
}

export const STORAGE_KEY = "roebling_pipeline_v1";

// ── CRM push — mocked behind an interface ────────────────────────────────
// The whole point of the interface: every caller depends on CrmClient, not on
// HubSpot. Swap MockCrmClient for a real HubSpot client later and no caller
// changes. The mock records the call and returns the exact payload it *would*
// send, plus a synced flag — no credentials, no network.
export type CrmPayload = {
  object: "contact" | "deal";
  properties: Record<string, string>;
  associations: { event: string; sourceCampaign: string };
};

export type CrmResult = {
  ok: boolean;
  system: "HubSpot";
  syncedAt: string;
  payload: CrmPayload;
  mock: true;
};

export interface CrmClient {
  // Called once when a contact becomes an opportunity.
  pushOpportunity(contact: Contact, event: TrackedEvent): Promise<CrmResult>;
}

function buildPayload(contact: Contact, event: TrackedEvent): CrmPayload {
  return {
    object: "deal",
    properties: {
      dealname: `${contact.company} — ${event.name}`,
      contact_name: contact.name,
      contact_title: contact.title || "",
      email: contact.email || "",
      company: contact.company,
      dealstage: "opportunity",
      hubspot_owner: repName(contact.owner_id),
      source_event: event.name,
      source_campaign: contact.source_campaign,
      next_step: contact.next_step || "",
    },
    associations: {
      event: event.name,
      sourceCampaign: contact.source_campaign,
    },
  };
}

// The mock. Records every call it receives so the UI can show the log.
export class MockCrmClient implements CrmClient {
  readonly calls: CrmResult[] = [];

  async pushOpportunity(contact: Contact, event: TrackedEvent): Promise<CrmResult> {
    const result: CrmResult = {
      ok: true,
      system: "HubSpot",
      syncedAt: new Date().toISOString(),
      payload: buildPayload(contact, event),
      mock: true,
    };
    this.calls.push(result);
    return result;
  }
}

// Pure helper so a synchronous UI (or a test) can render the payload preview
// without invoking the async client.
export function previewPayload(contact: Contact, event: TrackedEvent): CrmPayload {
  return buildPayload(contact, event);
}

// ── Per-event outcome rollup ─────────────────────────────────────────────
export type Rollup = {
  total: number;
  byStatus: Record<ContactStatus, number>;
  opportunities: number;
  won: number;
  lost: number;
  meetings: number; // met + opportunity + won + lost that got past a meeting
  responded: number; // engaged at all (everything past targeted)
  winRate: number; // won / (won + lost), 0 when nothing closed
};

export function rollup(contacts: Contact[]): Rollup {
  const byStatus = STATUS_ORDER.reduce(
    (acc, s) => ((acc[s] = 0), acc),
    {} as Record<ContactStatus, number>
  );
  for (const c of contacts) byStatus[c.status] = (byStatus[c.status] || 0) + 1;

  const won = byStatus.won;
  const lost = byStatus.lost;
  const opportunities = byStatus.opportunity + won + lost; // reached opp stage
  const meetings = byStatus.met + byStatus.opportunity + won + lost;
  const responded = contacts.length - byStatus.targeted;
  const closed = won + lost;

  return {
    total: contacts.length,
    byStatus,
    opportunities,
    won,
    lost,
    meetings,
    responded,
    winRate: closed ? Math.round((won / closed) * 100) : 0,
  };
}

// ── Evaluator feedback (honest stub) ─────────────────────────────────────
// The tracker already scores events 1–5 on "Fuel & Engine Fit" — can we make
// content and drive pipeline. Once an event has actually run, the pipeline is
// the ground truth for that guess. MVP: compute what the grounded signal would
// be and *display* it. We do not mutate the evaluator score yet (out of scope).
export function evaluatorSignal(event: TrackedEvent, r: Rollup) {
  const prior = event.scores?.fuelEngine ?? null;
  // A simple, legible rule: opportunities are the strongest evidence the event
  // fuels pipeline. Cap the suggested score at 5.
  let grounded: number | null = null;
  if (r.total > 0) {
    if (r.opportunities >= 3) grounded = 5;
    else if (r.opportunities === 2) grounded = 4;
    else if (r.opportunities === 1 || r.meetings >= 3) grounded = 3;
    else if (r.meetings >= 1) grounded = 2;
    else grounded = 1;
  }
  const delta = prior != null && grounded != null ? grounded - prior : null;
  return { prior, grounded, delta };
}

// ── CSV / paste import (the migration path) ──────────────────────────────
// Parses pasted spreadsheet rows. Handles quoted fields and both comma- and
// tab-separated input (tab = pasted straight from a spreadsheet). Returns the
// header row plus the data rows; column→field mapping happens in the UI.
export type ParsedCsv = { headers: string[]; rows: string[][] };

export function parseDelimited(text: string): ParsedCsv {
  const clean = text.replace(/\r\n?/g, "\n").trim();
  if (!clean) return { headers: [], rows: [] };
  const lines = clean.split("\n").filter((l) => l.trim().length);
  if (!lines.length) return { headers: [], rows: [] };
  // Sniff the delimiter from the first line: tabs win if present (spreadsheet
  // paste), else comma.
  const delim = lines[0].includes("\t") ? "\t" : ",";
  const parseLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (line[i + 1] === '"') {
            cur += '"';
            i++;
          } else inQuotes = false;
        } else cur += ch;
      } else if (ch === '"') inQuotes = true;
      else if (ch === delim) {
        out.push(cur);
        cur = "";
      } else cur += ch;
    }
    out.push(cur);
    return out.map((c) => c.trim());
  };
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows };
}

// Fields the importer can map columns onto.
export type ContactField =
  | "name"
  | "company"
  | "title"
  | "email"
  | "source_campaign"
  | "notes"
  | "ignore";

export const IMPORT_FIELDS: { key: ContactField; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  { key: "title", label: "Title" },
  { key: "email", label: "Email" },
  { key: "source_campaign", label: "Source campaign" },
  { key: "notes", label: "Notes" },
  { key: "ignore", label: "— ignore —" },
];

// Best-effort guess of which field a header maps to, so the mapping UI opens
// pre-filled the way a person would expect.
export function guessMapping(header: string): ContactField {
  const h = header.toLowerCase().replace(/[^a-z]/g, "");
  if (/(^|_)name|fullname|contact/.test(h)) return "name";
  if (/company|account|org|employer/.test(h)) return "company";
  if (/title|role|position|jobtitle/.test(h)) return "title";
  if (/email|mail/.test(h)) return "email";
  if (/campaign|source|list/.test(h)) return "source_campaign";
  if (/note|comment/.test(h)) return "notes";
  return "ignore";
}

// ── ID + timestamp helpers ───────────────────────────────────────────────
let idSeq = 0;
export function newContactId() {
  idSeq += 1;
  return `c_${Date.now().toString(36)}_${idSeq}`;
}
export const nowIso = () => new Date().toISOString();

// ── Seed data ────────────────────────────────────────────────────────────
// ~19 contacts for Reindustrialize 3.0, spread across every status so every
// view tells a story the moment it loads. Includes same-company pairs so the
// sales surface's "others from this company" context has something to show,
// and pre-synced CRM records on the opportunities.
function seedContact(
  partial: Omit<Contact, "id" | "event_id" | "created_at" | "updated_at"> &
    Partial<Pick<Contact, "crm">>
): Contact {
  const id = newContactId();
  const base = "2026-06-18T15:00:00.000Z"; // day after the event
  return {
    id,
    event_id: DEMO_EVENT_ID,
    created_at: base,
    updated_at: base,
    title: null,
    email: null,
    next_step: null,
    notes: null,
    ...partial,
  };
}

function syncedCrm(c: {
  company: string;
  name: string;
  title: string;
  email: string;
  owner_id: string;
  source_campaign: string;
  next_step: string;
}): CrmSync {
  const ev = eventById(DEMO_EVENT_ID)!;
  const payload = buildPayload(
    {
      ...seedContact({
        name: c.name,
        company: c.company,
        title: c.title,
        email: c.email,
        source_campaign: c.source_campaign,
        owner_id: c.owner_id,
        status: "opportunity",
        next_step: c.next_step,
      }),
    },
    ev
  );
  return {
    synced: true,
    system: "HubSpot",
    syncedAt: "2026-06-22T17:30:00.000Z",
    payload,
  };
}

export function buildSeedContacts(): Contact[] {
  const REI = "Reindustrialize outbound — Detroit"; // primary outbound campaign
  const LI = "LinkedIn — industrial founders";
  const SPK = "Speaker session follow-up";
  const WARM = "Portfolio warm intro";
  const SCAN = "Booth conversation (logged by BD)";

  return [
    // — targeted: on the pre-event list, not yet engaged (marketing loaded) —
    seedContact({
      name: "Dana Whitfield",
      company: "Cerulean Materials",
      title: "VP Process Engineering",
      email: "dana.whitfield@ceruleanmat.com",
      source_campaign: REI,
      owner_id: "u_david",
      status: "targeted",
    }),
    seedContact({
      name: "Owen Petrakis",
      company: "Foundry Bio",
      title: "Head of Scale-Up",
      email: "owen@foundrybio.co",
      source_campaign: REI,
      owner_id: "u_marcus",
      status: "targeted",
    }),
    seedContact({
      name: "Renee Salcedo",
      company: "Ironvale Manufacturing",
      title: "Director, CapEx Planning",
      email: "r.salcedo@ironvale.com",
      source_campaign: LI,
      owner_id: "u_priya",
      status: "targeted",
    }),
    seedContact({
      name: "Hugo Marchetti",
      company: "Terrafix Energy",
      title: "Plant Manager",
      email: "hmarchetti@terrafix.energy",
      source_campaign: LI,
      owner_id: "u_david",
      status: "targeted",
    }),

    // — responded: replied to outbound; BD logged them at capture —
    seedContact({
      name: "Alice Nkemdirim",
      company: "Kalyx Chemicals",
      title: "Technical Founder & CEO",
      email: "alice@kalyxchem.com",
      source_campaign: REI,
      owner_id: "u_david",
      status: "responded",
      next_step: "Send the reactor case study, propose 20 min at the event.",
      notes: "Replied same day — asked whether we handle continuous flow.",
    }),
    seedContact({
      name: "Bradford Keyes",
      company: "Reforge Metals",
      title: "COO",
      email: "brad.keyes@reforgemetals.com",
      source_campaign: SPK,
      owner_id: "u_marcus",
      status: "responded",
      notes: "Came in off Joshua's panel. Wants to compare our approach to their incumbent.",
    }),
    seedContact({
      name: "Sofia Reyes",
      company: "Cascade Minerals",
      title: "Head of Commercial",
      email: "sreyes@cascademinerals.com",
      source_campaign: LI,
      owner_id: "u_priya",
      status: "responded",
      next_step: "Book 30 min the week after the conference.",
    }),

    // — meeting_booked: scheduled, on a rep's calendar —
    seedContact({
      name: "Marcus Bell",
      company: "Novabuild Systems",
      title: "VP Engineering",
      email: "mbell@novabuild.io",
      source_campaign: REI,
      owner_id: "u_david",
      status: "meeting_booked",
      next_step: "Tues 3:00pm at the Roebling booth — bring the pilot timeline.",
      notes: "Evaluating a retrofit line for Q4. CapEx already earmarked.",
    }),
    seedContact({
      name: "Priyanka Rao",
      company: "Helix Bioworks",
      title: "Director of Manufacturing",
      email: "prao@helixbioworks.com",
      source_campaign: REI,
      owner_id: "u_david",
      status: "meeting_booked",
      next_step: "Wed 10:30am — walk through the fermentation scale-up deck.",
      notes: "Second contact we've made at Helix (see Nolan).",
    }),
    seedContact({
      name: "Gregory Tan",
      company: "Brightloop Decarbon",
      title: "Founder",
      email: "greg@brightloop.co",
      source_campaign: WARM,
      owner_id: "u_marcus",
      status: "meeting_booked",
      next_step: "Coffee Tues AM — warm intro via portfolio, keep it exploratory.",
    }),

    // — met: the meeting happened, now needs a follow-up —
    seedContact({
      name: "Nolan Frame",
      company: "Helix Bioworks",
      title: "Head of Process Development",
      email: "nolan.frame@helixbioworks.com",
      source_campaign: REI,
      owner_id: "u_david",
      status: "met",
      next_step: "Send techno-economic model by Friday; loop in Priyanka.",
      notes: "Strong meeting. Two buyers now at Helix — coordinate the account.",
    }),
    seedContact({
      name: "Camille Ortega",
      company: "Cascade Minerals",
      title: "VP Capital Projects",
      email: "cortega@cascademinerals.com",
      source_campaign: REI,
      owner_id: "u_priya",
      status: "met",
      next_step: "Share the minerals throughput benchmark; propose a scoping call.",
      notes: "Owns the CapEx line. Sofia (Commercial) is the other thread here.",
    }),
    seedContact({
      name: "Theo Vasquez",
      company: "Stackframe Industrial",
      title: "CTO",
      email: "theo@stackframe.industrial",
      source_campaign: SCAN,
      owner_id: "u_david",
      status: "met",
      next_step: "He asked for pricing — send the sponsor-tier follow-up.",
    }),

    // — no_show: booked but didn't attend —
    seedContact({
      name: "Ingrid Sørensen",
      company: "Polar Forge",
      title: "Operations Lead",
      email: "ingrid@polarforge.no",
      source_campaign: LI,
      owner_id: "u_marcus",
      status: "no_show",
      next_step: "Re-book — travel fell through. Nurture in the meantime.",
    }),
    seedContact({
      name: "Wesley Ahn",
      company: "Gridline Power",
      title: "Procurement Manager",
      email: "wahn@gridlinepower.com",
      source_campaign: REI,
      owner_id: "u_priya",
      status: "no_show",
    }),

    // — opportunity: qualified & pushed to CRM (pre-synced) —
    seedContact({
      name: "Harriet Cole",
      company: "Novabuild Systems",
      title: "Chief Operating Officer",
      email: "hcole@novabuild.io",
      source_campaign: REI,
      owner_id: "u_david",
      status: "opportunity",
      next_step: "Proposal out; procurement review scheduled.",
      notes: "Second buyer at Novabuild alongside Marcus Bell — one account.",
      crm: syncedCrm({
        company: "Novabuild Systems",
        name: "Harriet Cole",
        title: "Chief Operating Officer",
        email: "hcole@novabuild.io",
        owner_id: "u_david",
        source_campaign: REI,
        next_step: "Proposal out; procurement review scheduled.",
      }),
    }),
    seedContact({
      name: "Devin Ashworth",
      company: "Cindergale Chemicals",
      title: "SVP Operations",
      email: "dashworth@cindergale.com",
      source_campaign: SPK,
      owner_id: "u_priya",
      status: "opportunity",
      next_step: "Security review in progress; mutual action plan drafted.",
      crm: syncedCrm({
        company: "Cindergale Chemicals",
        name: "Devin Ashworth",
        title: "SVP Operations",
        email: "dashworth@cindergale.com",
        owner_id: "u_priya",
        source_campaign: SPK,
        next_step: "Security review in progress; mutual action plan drafted.",
      }),
    }),

    // — won —
    seedContact({
      name: "Lena Whitmore",
      company: "Apex Fermentation",
      title: "VP Commercialization",
      email: "lena@apexferm.com",
      source_campaign: REI,
      owner_id: "u_david",
      status: "won",
      notes: "Closed a pilot engagement. First Reindustrialize-sourced win.",
      crm: syncedCrm({
        company: "Apex Fermentation",
        name: "Lena Whitmore",
        title: "VP Commercialization",
        email: "lena@apexferm.com",
        owner_id: "u_david",
        source_campaign: REI,
        next_step: "Pilot SOW signed.",
      }),
    }),

    // — lost —
    seedContact({
      name: "Roman Diaz",
      company: "Meridian Alloys",
      title: "Director of R&D",
      email: "rdiaz@meridianalloys.com",
      source_campaign: LI,
      owner_id: "u_marcus",
      status: "lost",
      notes: "Went with an incumbent supplier this cycle. Re-engage in 2027.",
    }),
  ];
}
