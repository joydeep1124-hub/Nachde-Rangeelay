# Nachde Rangeelay — Handoff Book

## Live Site
- **Vercel:** auto-deploys on every push to `main`
- **GitHub:** https://github.com/joydeep1124-hub/Nachde-Rangeelay
- **Client email:** nachderangeelay@gmail.com
- **Phone:** (647) 303-0038
- **Location:** 55 Princess Valley Crescent, Brampton, ON L6P 2C5

---

## Stack
- Static HTML/CSS/JS (no build step)
- Supabase — form submissions database
- EmailJS — email notifications on form submit
- Vercel — hosting (auto-deploy on git push)
- PostHog — analytics

---

## Supabase
- **Project URL:** `https://ehncoktssmxbtlmtcwyb.supabase.co`
- **Anon key:** `sb_publishable_jK219GKnvBcmGo3zUqkh4A_3gA1K6bT`
- **Tables:** `contact_submissions`, `free_trial_submissions`
- **Warning:** Free tier pauses after 7 days of no activity. Upgrade to Pro ($25/month) when handing off to client for reliable uptime.

---

## EmailJS
- **Service ID:** `service_b23tnax`
- **Template ID:** `template_lq4kkfk`
- **Public Key:** `aWGFCXvbI9jydiHX0`
- Connected to: nachderangeelay@gmail.com
- Fires on free trial form submission

---

## PostHog Analytics
- **Project token:** `phc_rFXjzgxKWCcKg8ucRPd7QasMHprc3Xvd4o4pjkTpDXKM`
- **Region:** US Cloud
- Added to: `index.html`, `hire.html`, `free-trial.html`
- Tracks: page views (automatic), `free_trial_form_started`, `free_trial_form_abandoned`, `free_trial_form_submitted`
- Dashboard: https://us.posthog.com

---

## Pages
| File | Purpose |
|---|---|
| `index.html` | Main homepage |
| `hire.html` | Event hire / formations page |
| `free-trial.html` | Standalone free trial booking form |
| `styles.css` | Global styles |
| `hire.css` | Hire page overrides |
| `hire.js` | Hire page JS (navbar, reveal, video carousel) |
| `script.js` | Main page JS |

---

## Event (Hire) Page — Media
Videos are trimmed to 5 seconds and stored in `media/` as MP4.

| Formation | Media in use |
|---|---|
| 4 Performers | `4 pair.JPG`, `4 pair (2).JPG`, `4 performer vid.mp4` |
| 5 Performers | 6-video carousel: `5 performer vid.mp4`, `5 performer vid (2).mp4`, `5 performer.mp4`, `5 performer..mp4`, `5 performers.mp4`, `5 performers (2).mp4` |
| 6 Performers | 4-video carousel: `6 performers.mp4`, `6 performers (2).mp4`, `6 performers (3).mp4`, `6 performers (4).mp4` |
| 8 Performers | `8 performers.MP4`, `8 performer vid.MP4` |

New 5/6-performer clips were trimmed to ~13s (`5 performers (2)` is 11.6s, kept full) and web-compressed from the renamed source MOVs. Both the 5 and 6 blocks use the `initReel()` carousel in `hire.js`.

The 5-performer block has a video carousel with prev/next arrows and dot indicators.

Original full-length MOV files are kept locally at `media/` but are NOT in git (too large for GitHub).

### Performance Gallery (hire.html)
The gallery section previously repeated the formation videos; those duplicates were removed (June 2026).
It now shows 11 unique clips: `gallery_event_01.mp4` … `gallery_event_11.mp4` — compressed web versions
(H.264, max 1280px, CRF 27) of the raw iPhone files `IMG_4195` and `IMG_5344`–`IMG_5465`.
`IMG_5473.MOV` was excluded (11.6s — under the 12s hover-preview minimum in `hire.js`).
All gallery clips must be ≥12s because `hire.js` plays a 12-second preview on hover.

---

## What's Done
- [x] Homepage built and live
- [x] Event hire page with 4 formation blocks (4/5/6/8 performers)
- [x] Free trial form wired to Supabase + EmailJS
- [x] All Google Form links replaced with `free-trial.html`
- [x] PostHog analytics on all 3 pages
- [x] Real photos and videos on 4/5/8 performer blocks
- [x] Video carousel for 5-performer block (4 videos)

## What's Left
- [x] **Test live email** — emails arrive at nachderangeelay@gmail.com (confirmed June 2026)
- [ ] **Confirm full email body** — code now packs phone/email/class/age/experience into the default template's `{{message}}` field, so all details show without editing the EmailJS template. Submit a test and confirm the message block is readable (line breaks intact).
- [ ] **Contact form email** — wire EmailJS into contact form on index.html (script.js)
- [x] **6 performer media** — 4-video carousel added to the 6-performer block
- [ ] **Gallery photos** — currently placeholder images, swap for real performance photos
- [ ] **New background video** — client has high quality video on phone, transfer via USB, replace `assets/bhangra-bg.mp4`
- [ ] **Supabase uptime** — consider upgrading to Pro or setting up a cron ping (cron-job.org) before client handoff
