<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules (Consullex)

- Front-end only with mock data in `src/lib/data.ts`; no backend yet — why: the brief scopes a static front-end, so swapping in Lovable Cloud later only touches the data/lead/booking helpers.
- Lead capture goes through the single `submitLead` function in `src/components/site/LeadForm.tsx` — why: one integration point for a future CRM or database.
- Booking state passes to the confirmation page via `sessionStorage` helpers in `src/lib/booking.ts` — why: no server persistence exists yet.
- Public pages wrap content in `SiteShell`; booking, auth and dashboards use their own layouts (`FlowHeader`, `AuthLayout`, `DashboardLayout`) — why: conversion and app screens hide marketing navigation.
- Brand colors live as semantic tokens in `src/styles.css` (navy, gold, emerald, graphite, ivory…) and buttons use brand variants (`gold`, `navy`, `outline-navy`, `outline-light`, `whatsapp`) — why: components never hardcode colors.
- Business rules (CPF/CNPJ, professional e-mail, coupons) are pure functions covered by `src/test/rules.test.ts` — why: keep validation testable outside the UI.
