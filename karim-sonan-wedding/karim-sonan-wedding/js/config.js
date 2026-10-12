/* =====================================================================
   ✏️  KARIM & SONAN — YOUR WEDDING DETAILS
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Change the text between the quote marks "like this". Save, then refresh
   the page. Do not delete the commas or quote marks.
   ===================================================================== */

window.WEDDING = {

  /* ---- Names (shown in this order everywhere) ---- */
  name1: "Karim",
  name2: "Sonan",

  /* ---- DATE (confirmed) ----------------------------------------------
     Format: "YYYY-MM-DDTHH:MM:00"  (year-month-day, T, 24-hour time).
     The time is not confirmed yet, so the countdown counts down to the START
     of the day (00:00). When you know the time, change it here — for example
     "2026-11-26T18:00:00" for 6:00 PM — and set timeIsPlaceholder to false. */
  dateISO: "2026-11-26T00:00:00",
  timeIsPlaceholder: true,

  /* ---- Text shown to guests ---- */
  dateText: "Thursday, November 26, 2026",
  timeText: "To be confirmed",        // e.g. "6:00 PM"
  venueName: "To be confirmed",       // e.g. "The Garden Hall"
  dressCode: "To be confirmed",       // e.g. "Formal — soft earth tones"

  /* ---- Venue address & map -------------------------------------------
     While venueAddress is "" the map stays hidden and the page says the address
     will be announced. Once you type the address, the map and the
     "Open in Google Maps" button switch on automatically.
     (Optional) mapsUrl: paste a Google Maps "Share" link to use instead of a search. */
  venueAddress: "",                   // e.g. "12 Nile Street, Cairo, Egypt"
  mapsUrl: "",

  /* ---- COUPLE PHOTO ----------------------------------------------------
     Put your photo in assets/images/ (for example couple.jpg) and type its path here.
     Leave "" for no photo. A portrait (tall) photo looks best. */
  couplePhoto: ""              // e.g. "assets/images/couple.jpg"
};
