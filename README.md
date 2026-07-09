# Bella Purpose Research Group — website

A simple, dependency-free static website. Just HTML + one CSS file — no build
step, no framework, no Node. Open any `.html` file in a browser to preview.

## Layout

The deployable website lives in **`site/`** — that's the only folder you upload
to a host. The docs (`README.md`, `CLAUDE.md`) stay at the repo root.

| File | What it is |
|------|-----------|
| `site/index.html` | Home — mission, about, highlights |
| `site/members.html` | Members (one equal card each, alphabetical) |
| `site/initiatives.html` | Initiatives & events (one card each) |
| `site/research.html` | Research themes (one card each) |
| `site/news.html` | News, events & calls for papers (one item each) |
| `site/contact.html` | Contact page + form |
| `site/styles.css` | Shared styling for every page |
| `site/gate.js` | Temporary password gate |
| `site/images/` | (create this) put member photos / logo here |

## How to edit the content

Every spot you need to change is marked with `[PLACEHOLDER]` or an HTML
`<!-- comment -->`. Search the files for `PLACEHOLDER` to find them all.

- **Add a member / initiative / research theme:** copy one existing `card` block
  and paste it, then edit the text (name, initials, institution, description).
- **Theme colours:** edit the variables at the top of `styles.css` (`--accent`,
  etc.). Change one line, re-theme the whole site.
- **Photos:** create an `images/` folder and swap the placeholder avatar `<div>`
  for `<img class="avatar" src="images/name.jpg" alt="Full Name">`.
- **Add a news item:** on `news.html`, duplicate one `<li class="paper">` block
  and put the newest at the top.
- **LinkedIn:** each page footer has a `href="#"` LinkedIn link — replace `#`
  with the group's LinkedIn URL once the page exists.

## Contact form setup (one time)

The contact form (`site/contact.html`) is powered by **Web3Forms** so the site
can email the group **without the email address ever appearing on the page** —
the address is stored on Web3Forms' server, linked to an access key.

1. Go to **web3forms.com**, enter the group's Gmail address, and get a free
   **access key** (a UUID) emailed to you.
2. In `site/contact.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key.
3. Done — submissions now arrive in the group's inbox. Free tier covers 250
   submissions/month; a hidden honeypot field filters basic spam.

Until the key is added, the form shows a "not connected yet" message instead of
sending. The Gmail address is intentionally **not** written anywhere in the site
files — keep it that way.

## Editing the site as a group (no back-end needed)

The site is static and there is no admin panel — updates are made by editing the
files. For one or two occasional editors, the simplest way is **directly on
GitHub**, which auto-deploys:

1. Go to the file on github.com (e.g. `site/members.html`).
2. Click the **pencil (Edit)** icon, make the change, and click **Commit changes**.
3. The deploy workflow runs automatically; the live site updates in a minute or two.

**To let a second person edit** without sharing the account password: repo →
**Settings → Collaborators → Add people** → their GitHub username. They can then
edit the same way with their own login.

> Editors work in raw HTML, but every editable spot is a self-contained `card`
> block or marked with a comment, so no coding is required beyond copy-paste-edit.

## Preview locally

Double-click `index.html`, or for a proper local server:

```bash
cd site
python3 -m http.server 8000   # then open http://localhost:8000
```

## Hosting — options

Any static-file host works. A **custom domain works with all of them**, so you're
not locked in by your first choice.

| Option | Cost | Custom domain | Notes |
|--------|------|---------------|-------|
| **GitHub Pages** | Free | ✅ Yes (free) | Great if you're OK with a public git repo. |
| **Netlify** | Free tier | ✅ Yes (free) | Drag-and-drop deploy, no git needed. Easiest. |
| **Cloudflare Pages** | Free | ✅ Yes (free) | Fastest CDN; cheapest place to *buy* the domain too. |
| **Vercel** | Free tier | ✅ Yes (free) | Similar to Netlify. |
| Traditional host (Namecheap, etc.) | Paid | ✅ Yes | Only worth it if you already have one. |

**Recommendation:** start on **Netlify or Cloudflare Pages** (drag-and-drop, no
git required) or **GitHub Pages** if you want version history. Point your domain
at it whenever you're ready — the site files never change.

### Deploy to GitHub Pages
This repo includes a workflow (`.github/workflows/deploy.yml`) that publishes the
`site/` folder automatically — GitHub Pages' built-in "deploy from a branch"
option can only serve from the repo root or `/docs`, so the workflow handles the
`site/` subfolder for us.

1. Create the repo on GitHub and push this project.
2. Repo → **Settings → Pages** → Build and deployment → Source: **GitHub Actions**.
3. Every push to `main` redeploys. Live within a minute or two.

**To get `bellapurpose.github.io` specifically:**
- Your GitHub **account (or organisation) username must be exactly `bellapurpose`**,
  and the **repo must be named `bellapurpose.github.io`**. That naming is what
  produces the root URL (no `/repo` suffix).
- If your personal username is taken/different, create a free **organisation**
  named `bellapurpose` (GitHub → *Your organizations → New organization → Free*)
  and put the repo there.

### Deploy to Netlify (no git)
1. Sign up at netlify.com → **Add new site → Deploy manually**.
2. Drag the **`site/`** folder onto the page. Done.

## Getting a custom domain (long-term)

1. **Buy the domain** (~$10–15/yr) from Cloudflare, Namecheap, or Porkbun.
   Something like `bellapurpose.org` or `.research`.
2. In your host's dashboard, add the domain and follow its DNS instructions
   (usually a `CNAME` or `A` record).
3. HTTPS is issued automatically by all the hosts above.

## Password gate (temporary)

The pages currently load `site/gate.js`, which shows a password prompt.

- **Current password:** `25`
- **Change it:** open a page, open the browser console (F12), run
  `bpHash('your-new-password')`, and paste the printed hash into `PASSWORD_HASH`
  at the top of `site/gate.js`.
- **Remove it (make the site public):** delete the `<script src="gate.js"></script>`
  line from the `<head>` of all four HTML pages.

⚠️ This is a *deterrent, not real security* — the files are still downloadable and
the gate can be bypassed. For genuine access control use host-level protection
(Cloudflare Access is free for up to 50 users; Netlify has password protection on
paid plans).

## LinkedIn page

LinkedIn "pages" for a group/organization are created on LinkedIn itself:
**LinkedIn → For Business (grid icon, top-right) → Create a Company Page →
Company / Institution**. Once it exists, copy its URL into the footer link
(`href="#"`) on each page. A personal LinkedIn account is required to create it.
