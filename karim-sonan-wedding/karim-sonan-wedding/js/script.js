/* =====================================================================
   NADINE & MOHAMED — WEDDING INVITATION  ·  BEHAVIOUR
   You normally do NOT need to edit this file.
   Your names, date, venue and RSVP settings live in js/config.js
   ===================================================================== */
(function () {
  "use strict";

  var cfg = window.WEDDING || {};
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");
  root.classList.add("locked");   // page stays still until the invitation is opened

  /* ---------- 1. Fill in names & details from config.js ---------- */
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var key = el.getAttribute("data-bind");
    if (cfg[key]) el.textContent = cfg[key];
  });
  if (cfg.name1 && cfg.name2) {
    var full = cfg.name1 + " and " + cfg.name2;
    document.title = cfg.name1 + " & " + cfg.name2 + " — Wedding Invitation";
    document.querySelectorAll(".names").forEach(function (n) { n.setAttribute("aria-label", full); });
  }

  /* ---------- 2. Background video (with graceful fallback) ---------- */
  var videoBg = $("videoBg");
  var video = $("introVideo");
  var saveData = navigator.connection && navigator.connection.saveData;

  function startVideo() {
    if (!video || reduceMotion || saveData) return;   // keep the still poster image instead
    var src = video.querySelector("source");
    if (src) src.addEventListener("error", function () { videoBg.classList.remove("video-ready"); });
    video.addEventListener("playing", function () { videoBg.classList.add("video-ready"); });
    video.addEventListener("error", function () { videoBg.classList.remove("video-ready"); });
    var p = video.play();
    if (p && p.catch) p.catch(function () { /* blocked or missing: the poster image stays visible */ });
  }
  startVideo();

  // Save battery: pause the video when the tab is hidden
  document.addEventListener("visibilitychange", function () {
    if (!video || reduceMotion || saveData) return;
    if (document.hidden) video.pause();
    else if (videoBg.classList.contains("video-ready")) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
  });

  /* ---------- 3. Falling petals ---------- */
  function makePetals(container, count) {
    if (!container || reduceMotion) return;
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      var size = 8 + Math.random() * 12;
      s.className = "petal";
      s.style.left = (Math.random() * 100) + "%";
      s.style.width = size + "px";
      s.style.height = size * 1.25 + "px";
      s.style.animationDuration = (11 + Math.random() * 12) + "s";
      s.style.animationDelay = (-Math.random() * 20) + "s";
      s.style.setProperty("--drift", (Math.random() * 160 - 60) + "px");
      container.appendChild(s);
    }
  }
  makePetals(document.querySelector("#opener .petals"), 14);

  /* ---------- 4. Music player ---------- */
  var audio = $("bgMusic");
  var musicBtn = $("musicBtn");
  var musicOK = true;

  function setPlaying(on) {
    musicBtn.classList.toggle("is-playing", on);
    musicBtn.setAttribute("aria-pressed", on ? "true" : "false");
    musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  }
  var fadeTimer;
  function fadeTo(target, ms) {
    clearInterval(fadeTimer);
    var steps = 20, i = 0, from = audio.volume, d = (target - from) / steps;
    fadeTimer = setInterval(function () {
      i++; audio.volume = Math.max(0, Math.min(1, from + d * i));
      if (i >= steps) clearInterval(fadeTimer);
    }, ms / steps);
  }
  function playMusic() {
    if (!musicOK) return;
    audio.volume = 0;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () { setPlaying(true); fadeTo(0.45, 2500); })
       .catch(function (err) {
         setPlaying(false);
         if (err && err.name === "NotSupportedError") { musicOK = false; musicBtn.hidden = true; } // file missing
       });
    }
  }
  musicBtn.addEventListener("click", function () {
    if (audio.paused) playMusic();
    else { audio.pause(); setPlaying(false); }
  });
  audio.addEventListener("error", function () { musicOK = false; musicBtn.hidden = true; }, true);

  /* ---------- 5. Open the invitation ---------- */
  var opener = $("opener");
  $("openBtn").addEventListener("click", function () {
    opener.classList.add("is-open");
    document.body.classList.add("is-open");
    root.classList.remove("locked");
    musicBtn.hidden = false;
    playMusic();   // allowed because the visitor just clicked
    if (video && video.paused && !reduceMotion && !saveData) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    setTimeout(function () {
      opener.hidden = true;
      var hero = $("welcome");
      if (hero) hero.focus({ preventScroll: true });
    }, reduceMotion ? 50 : 2100);
  });

  /* ---------- 6. Countdown ---------- */
  var target = new Date(cfg.dateISO);
  var grid = $("countdown-grid"), done = $("cd-done"), note = $("cd-note");
  var els = { d: $("cd-days"), h: $("cd-hours"), m: $("cd-mins"), s: $("cd-secs") };
  if (cfg.timeIsPlaceholder) note.hidden = false;
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var diff = target.getTime() - Date.now();
    if (isNaN(diff)) { grid.hidden = true; return; }
    if (diff <= 0) { grid.hidden = true; done.hidden = false; return; }
    var secs = Math.floor(diff / 1000);
    els.d.textContent = Math.floor(secs / 86400);
    els.h.textContent = pad(Math.floor(secs % 86400 / 3600));
    els.m.textContent = pad(Math.floor(secs % 3600 / 60));
    els.s.textContent = pad(secs % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- 7. Location, map & Google Maps button ---------- */
  var mapsBtn = $("mapsBtn");
  var address = (cfg.venueAddress || "").trim();
  var query = encodeURIComponent(((cfg.venueName && cfg.venueName !== "To be confirmed") ? cfg.venueName + " " : "") + address);
  if (address || cfg.mapsUrl) {
    if (address) {
      $("addressText").textContent = address;
      $("mapFrame").src = "https://www.google.com/maps?q=" + query + "&output=embed";
      $("mapBox").hidden = false;
    } else {
      $("addressText").hidden = true;
    }
    mapsBtn.href = cfg.mapsUrl || ("https://www.google.com/maps/search/?api=1&query=" + query);
  } else {
    mapsBtn.setAttribute("aria-disabled", "true");
    mapsBtn.style.opacity = ".55";
    $("mapsNote").hidden = false;
    mapsBtn.addEventListener("click", function (e) { e.preventDefault(); });
  }

  /* ---------- Couple photo (optional) ---------- */
  if (cfg.couplePhoto) {
    var cImg = $("coupleImg");
    cImg.addEventListener("load", function () { $("couplePhoto").hidden = false; });
    cImg.src = cfg.couplePhoto;
  }

  /* ---------- 8. Fade-in on scroll ---------- */
  var closing = $("closing");
  var closingPetalsMade = false;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        if (en.target === closing && !closingPetalsMade) {
          closingPetalsMade = true;
          makePetals(closing.querySelector(".petals"), 12);
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.18 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    io.observe(closing);
  } else {
    document.querySelectorAll(".reveal, .closing").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 9. Top bar background after scrolling ---------- */
  var topbar = $("topbar");
  function onScroll() { topbar.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
