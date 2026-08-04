// ─────────────────────────────────────────────────────────────────────────
// De-branded contact pipeline data for the public demo. Generic B2B / SaaS
// contacts hung off a demo event, mirroring the case-study structure (statuses
// across the spine, same-company pairs, pre-synced CRM on opportunities) with
// no client data.
// ─────────────────────────────────────────────────────────────────────────
import { demoSeedEvents } from "./demoEvents";
import { previewPayload, newContactId, type Contact, type CrmSync } from "./eventPipeline";
import { type TrackedEvent } from "./roeblingEvents";

// The demo pipeline hangs off SaaStr Annual (a US-hub event scheduled in the
// demo tracker), so the surface loads populated.
export const DEMO_PIPELINE_EVENT_ID = "d1";
export const DEMO_PIPELINE_STORAGE_KEY = "demo_pipeline_v1";

export function demoPipelineEvents(): TrackedEvent[] {
  const scheduled = demoSeedEvents.filter((e) => e.status === "scheduled");
  const primary = scheduled.find((e) => e.id === DEMO_PIPELINE_EVENT_ID);
  const rest = scheduled.filter((e) => e.id !== DEMO_PIPELINE_EVENT_ID);
  return primary ? [primary, ...rest] : scheduled;
}

export function demoEventById(id: string): TrackedEvent | undefined {
  return demoSeedEvents.find((e) => e.id === id);
}

function seedContact(
  partial: Omit<Contact, "id" | "event_id" | "created_at" | "updated_at"> &
    Partial<Pick<Contact, "crm">>
): Contact {
  const id = newContactId();
  const base = "2026-09-11T15:00:00.000Z"; // day after the event
  return {
    id,
    event_id: DEMO_PIPELINE_EVENT_ID,
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
  const ev = demoEventById(DEMO_PIPELINE_EVENT_ID)!;
  const payload = previewPayload(
    seedContact({
      name: c.name,
      company: c.company,
      title: c.title,
      email: c.email,
      source_campaign: c.source_campaign,
      owner_id: c.owner_id,
      status: "opportunity",
      next_step: c.next_step,
    }),
    ev
  );
  return {
    synced: true,
    system: "HubSpot",
    syncedAt: "2026-09-15T17:30:00.000Z",
    payload,
  };
}

export function buildDemoContacts(): Contact[] {
  const OUT = "SaaStr outbound — Bay Area";
  const LI = "LinkedIn — RevOps leaders";
  const SPK = "Speaker session follow-up";
  const WARM = "Portfolio warm intro";
  const SCAN = "Booth conversation (logged by BD)";

  return [
    // — targeted —
    seedContact({
      name: "Dana Whitfield",
      company: "Northwind Analytics",
      title: "VP Revenue Operations",
      email: "dana.whitfield@northwind.io",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "targeted",
    }),
    seedContact({
      name: "Owen Petrakis",
      company: "Brightloop CRM",
      title: "Head of Growth",
      email: "owen@brightloop.co",
      source_campaign: OUT,
      owner_id: "u_marcus",
      status: "targeted",
    }),
    seedContact({
      name: "Renee Salcedo",
      company: "Ledgerline",
      title: "Director of Demand Gen",
      email: "r.salcedo@ledgerline.com",
      source_campaign: LI,
      owner_id: "u_priya",
      status: "targeted",
    }),
    seedContact({
      name: "Hugo Marchetti",
      company: "Cascade Cloud",
      title: "Head of Sales Ops",
      email: "hugo@cascadecloud.com",
      source_campaign: LI,
      owner_id: "u_david",
      status: "targeted",
    }),

    // — responded —
    seedContact({
      name: "Alice Nkemdirim",
      company: "Kaleido Labs",
      title: "Founder & CEO",
      email: "alice@kaleido.dev",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "responded",
      next_step: "Send the ROI one-pager, propose 20 min at the event.",
      notes: "Replied same day — asked about SOC 2 and onboarding time.",
    }),
    seedContact({
      name: "Bradford Keyes",
      company: "Ravel Software",
      title: "COO",
      email: "brad.keyes@ravelsoftware.com",
      source_campaign: SPK,
      owner_id: "u_marcus",
      status: "responded",
      notes: "Came in off the panel. Wants to compare us to their incumbent.",
    }),
    seedContact({
      name: "Sofia Reyes",
      company: "Meridian SaaS",
      title: "Head of Marketing",
      email: "sreyes@meridiansaas.com",
      source_campaign: LI,
      owner_id: "u_priya",
      status: "responded",
      next_step: "Book 30 min the week after the conference.",
    }),

    // — meeting_booked —
    seedContact({
      name: "Marcus Bell",
      company: "Novaflow",
      title: "VP Engineering",
      email: "mbell@novaflow.io",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "meeting_booked",
      next_step: "Tues 3:00pm at the booth — bring the integration timeline.",
      notes: "Evaluating a platform rollout for Q4. Budget already earmarked.",
    }),
    seedContact({
      name: "Priyanka Rao",
      company: "Helix Analytics",
      title: "Director of RevOps",
      email: "prao@helixanalytics.com",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "meeting_booked",
      next_step: "Wed 10:30am — walk through the reporting demo.",
      notes: "Second contact we've made at Helix (see Nolan).",
    }),
    seedContact({
      name: "Gregory Tan",
      company: "Loopwork",
      title: "Founder",
      email: "greg@loopwork.co",
      source_campaign: WARM,
      owner_id: "u_marcus",
      status: "meeting_booked",
      next_step: "Coffee Tues AM — warm intro via portfolio, keep it exploratory.",
    }),

    // — met —
    seedContact({
      name: "Nolan Frame",
      company: "Helix Analytics",
      title: "Head of Analytics",
      email: "nolan.frame@helixanalytics.com",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "met",
      next_step: "Send pricing by Friday; loop in Priyanka.",
      notes: "Strong meeting. Two buyers now at Helix — coordinate the account.",
    }),
    seedContact({
      name: "Camille Ortega",
      company: "Meridian SaaS",
      title: "VP Marketing",
      email: "cortega@meridiansaas.com",
      source_campaign: OUT,
      owner_id: "u_priya",
      status: "met",
      next_step: "Share the benchmark deck; propose a scoping call.",
      notes: "Owns the budget. Sofia (Marketing) is the other thread here.",
    }),
    seedContact({
      name: "Theo Vasquez",
      company: "Stackframe",
      title: "CTO",
      email: "theo@stackframe.dev",
      source_campaign: SCAN,
      owner_id: "u_david",
      status: "met",
      next_step: "He asked for pricing — send the sponsor-tier follow-up.",
    }),

    // — no_show —
    seedContact({
      name: "Ingrid Sørensen",
      company: "Polar Metrics",
      title: "Head of Operations",
      email: "ingrid@polarmetrics.io",
      source_campaign: LI,
      owner_id: "u_marcus",
      status: "no_show",
      next_step: "Re-book — travel fell through. Nurture in the meantime.",
    }),
    seedContact({
      name: "Wesley Ahn",
      company: "Gridline",
      title: "Procurement Manager",
      email: "wahn@gridline.com",
      source_campaign: OUT,
      owner_id: "u_priya",
      status: "no_show",
    }),

    // — opportunity (pre-synced) —
    seedContact({
      name: "Harriet Cole",
      company: "Novaflow",
      title: "Chief Operating Officer",
      email: "hcole@novaflow.io",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "opportunity",
      next_step: "Proposal out; procurement review scheduled.",
      notes: "Second buyer at Novaflow alongside Marcus Bell — one account.",
      crm: syncedCrm({
        company: "Novaflow",
        name: "Harriet Cole",
        title: "Chief Operating Officer",
        email: "hcole@novaflow.io",
        owner_id: "u_david",
        source_campaign: OUT,
        next_step: "Proposal out; procurement review scheduled.",
      }),
    }),
    seedContact({
      name: "Devin Ashworth",
      company: "Cindergale Systems",
      title: "SVP Operations",
      email: "dashworth@cindergale.com",
      source_campaign: SPK,
      owner_id: "u_priya",
      status: "opportunity",
      next_step: "Security review in progress; mutual action plan drafted.",
      crm: syncedCrm({
        company: "Cindergale Systems",
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
      company: "Apex Cloud",
      title: "VP Commercial",
      email: "lena@apexcloud.com",
      source_campaign: OUT,
      owner_id: "u_david",
      status: "won",
      notes: "Closed a pilot engagement. First SaaStr-sourced win.",
      crm: syncedCrm({
        company: "Apex Cloud",
        name: "Lena Whitmore",
        title: "VP Commercial",
        email: "lena@apexcloud.com",
        owner_id: "u_david",
        source_campaign: OUT,
        next_step: "Pilot SOW signed.",
      }),
    }),

    // — lost —
    seedContact({
      name: "Roman Diaz",
      company: "Beacon Data",
      title: "Director of R&D",
      email: "rdiaz@beacondata.com",
      source_campaign: LI,
      owner_id: "u_marcus",
      status: "lost",
      notes: "Went with an incumbent this cycle. Re-engage in 2027.",
    }),
  ];
}
