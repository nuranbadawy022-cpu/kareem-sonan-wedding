# Karim & Sonan — Wedding Invitation (separate website)

This folder is its own website. It shares nothing with the Nadine & Mohamed site,
so you can publish it with its own link and edit it without touching the other one.

## Preview
Double-click `index.html`. Click "Open Our Invitation".

## Add the missing details (only file to edit: js/config.js)
- **Time:** change `timeText` (e.g. "6:00 PM"). For the countdown, also change `dateISO`
  to e.g. "2026-11-26T18:00:00" and set `timeIsPlaceholder` to false.
- **Venue:** change `venueName`.
- **Address + map:** type `venueAddress`. The map and the "Open in Google Maps" button switch on automatically.
- **Dress code:** change `dressCode`.
- **Photo:** save your photo in `assets/images/` (e.g. couple.jpg, tall/portrait works best),
  then set `couplePhoto: "assets/images/couple.jpg"`.
- Messages: open `index.html` and search for ✏️.

## Optional: video and music
Put `wedding-intro.mp4` in `assets/video/` and `wedding-music.mp3` in `assets/audio/`.
Without them, a soft image shows and no music player appears.

## Publish with its own link
Go to app.netlify.com/drop and drag this whole folder in. You get a new link just for this
invitation. To update later, drag the folder in again on that site's Deploys page.
