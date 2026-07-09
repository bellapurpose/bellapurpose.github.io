# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public "presence" website for the **Bella Purpose Research Group**: a static
site presenting the group, its members, initiatives, and papers. It is
intentionally dependency-free — plain HTML + one CSS file, **no build step, no
framework, no package manager**. There is nothing to compile, lint, or test.

## Commands

- **Preview:** open any `site/*.html` file in a browser, or serve locally:
  ```bash
  cd site && python3 -m http.server 8000   # http://localhost:8000
  ```
- **Deploy:** `git push origin main`. A GitHub Actions workflow
  (`.github/workflows/deploy.yml`) publishes the `site/` folder to GitHub Pages
  automatically. See `README.md` for the one-time Pages setup and for alternative
  hosts (Netlify / Cloudflare Pages).

## Layout & architecture

The deployable site lives in **`site/`**; docs (`README.md`, `CLAUDE.md`) and git
config stay at the repo root. Six sibling pages under `site/`
(`index.html`, `members.html`, `initiatives.html`, `research.html`, `news.html`,
`contact.html`), each a complete standalone HTML document linking the shared
`styles.css`. There are no partials or includes, so the **header nav and footer
are copy-pasted into all six pages** — when editing either, apply the change to
every page. The active nav link is marked per page with `aria-current="page"`.

`contact.html` has a Web3Forms-backed contact form: the group's email is **never**
in the repo (it lives on Web3Forms, keyed by `access_key`). Members are listed as
equal cards (no roles/coordinator — governance is intentionally flat). `news.html`
uses the `.paper` list style for dated items, newest first.

`styles.css` is the single source of visual truth. All theming flows from CSS
custom properties in the `:root` block at the top (`--accent`, `--ink`, fonts,
spacing); a dark-mode override block (`prefers-color-scheme: dark`) mirrors them.
Re-theming should happen by editing these variables, not by hardcoding values in
rules. Layout uses shared utility classes (`.wrap`, `.section`, `.grid`, `.card`,
`.paper`) reused across pages.

## Content conventions

- All editable content is marked `[PLACEHOLDER]` or an HTML `<!-- comment -->`.
  Grep for `PLACEHOLDER` to find every spot needing real content.
- Members, initiatives, and papers are each a repeated card/list block — add an
  entry by duplicating one block and editing its text.
- The footer (all four pages) holds the contact email and the LinkedIn URL
  (currently `href="#"`).
- Member photos: create an `images/` folder and replace the placeholder avatar
  `<div class="avatar">` with `<img class="avatar" src="..." alt="...">`.

## Deployment & git

- **Hosting:** GitHub Pages, served from the `bellapurpose` account/org at
  `https://bellapurpose.github.io`. It's a **user/org site**, so the repo is named
  `bellapurpose.github.io` and must be **public** (free-plan requirement).
- **Remote:** `origin` = `git@github.com:bellapurpose/bellapurpose.github.io.git`
  over SSH. Pushing to `main` triggers the deploy workflow.
- **Publish source:** in the repo, GitHub Pages must be set to
  **Settings → Pages → Source: GitHub Actions** (the branch method can't serve the
  `site/` subfolder — that's why the workflow exists).
- **Commit identity:** the shared group account **Bella Purpose Group
  <bellapurposegroup@gmail.com>** — not any individual.

## Password gate (temporary)

`site/gate.js` is loaded by every page and shows a password prompt (a "not ready
yet" **deterrent, not real security** — files are still downloadable). The
password is stored as a SHA-256 hash in `PASSWORD_HASH`. Change it via the console
helper `bpHash('new-pass')`, or remove the gate entirely by deleting the
`<script src="gate.js"></script>` line from all four pages. Details in `README.md`.

## Accessibility (preserve when editing)

Each page has a skip link, semantic landmarks (`<header>`/`<main>`/`<footer>`),
labeled nav, and `alt`/`aria-label` on images and icons. Keep these intact.
