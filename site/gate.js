/* ==========================================================================
   Bella Purpose — temporary password gate
   --------------------------------------------------------------------------
   IMPORTANT: this is a "not ready yet" deterrent, NOT real security. The files
   are still downloadable and a determined visitor can bypass this. For genuine
   access control, use host-level protection (Cloudflare Access / Netlify
   password) — see README.md. Remove this <script> tag from the pages to make
   the site public again.

   CURRENT PASSWORD:  25

   To change the password:
     1. Open any page, open the browser console (F12), and run:
            bpHash('your-new-password')
     2. Copy the printed hash into PASSWORD_HASH below.
   ========================================================================== */

(function () {
  // SHA-256 hex of the password. Hash below is for "25".
  var PASSWORD_HASH = "b7a56873cd771f2c446d369b649430b65a756ba278ff97ec81bb6f55b2e73569";

  var KEY = "bp-unlocked";

  // Helper you can call from the console to generate a new hash.
  window.bpHash = function (pw) {
    return sha256(pw).then(function (h) { console.log(h); return h; });
  };

  function sha256(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", data).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, "0"); })
        .join("");
    });
  }

  // Already unlocked this session? Do nothing.
  try {
    if (sessionStorage.getItem(KEY) === "1") return;
  } catch (e) { /* sessionStorage blocked — fall through to prompt */ }

  // Hide the page content immediately (body not yet parsed in <head>).
  var lockStyle = document.createElement("style");
  lockStyle.textContent =
    "html.bp-locked body{display:none!important}" +
    "#bp-gate{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;" +
    "background:#141116;color:#ece8ef;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:1.25rem}" +
    "#bp-gate .box{width:100%;max-width:22rem;text-align:center}" +
    "#bp-gate .mark{width:44px;height:44px;border-radius:12px;margin:0 auto 1.25rem;display:grid;place-items:center;" +
    "background:linear-gradient(135deg,#6b3f7a,#4e2b5c);color:#fff;font-weight:700;font-family:Georgia,serif}" +
    "#bp-gate h1{font-family:Georgia,serif;font-size:1.4rem;margin:0 0 .4rem}" +
    "#bp-gate p{color:#b3acbc;font-size:.9rem;margin:0 0 1.25rem}" +
    "#bp-gate input{width:100%;padding:.7rem .9rem;border-radius:10px;border:1px solid #362e3d;" +
    "background:#1d181f;color:#ece8ef;font-size:1rem;box-sizing:border-box}" +
    "#bp-gate input:focus{outline:none;border-color:#c9a8d6}" +
    "#bp-gate button{margin-top:.75rem;width:100%;padding:.7rem;border:0;border-radius:999px;cursor:pointer;" +
    "background:#c9a8d6;color:#241b29;font-weight:600;font-size:.95rem}" +
    "#bp-gate .err{color:#e29a9a;font-size:.85rem;min-height:1.2em;margin-top:.6rem}";
  document.documentElement.appendChild(lockStyle);
  document.documentElement.classList.add("bp-locked");

  function build() {
    var gate = document.createElement("div");
    gate.id = "bp-gate";
    gate.innerHTML =
      '<div class="box">' +
      '<div class="mark">BP</div>' +
      '<h1>Bella Purpose</h1>' +
      '<p>This site is private while we build it. Please enter the password.</p>' +
      '<form id="bp-form">' +
      '<input id="bp-pw" type="password" autocomplete="current-password" ' +
      'aria-label="Password" placeholder="Password" autofocus>' +
      '<button type="submit">Enter</button>' +
      '<div class="err" id="bp-err" role="alert"></div>' +
      '</form></div>';
    document.documentElement.appendChild(gate);

    var form = gate.querySelector("#bp-form");
    var input = gate.querySelector("#bp-pw");
    var err = gate.querySelector("#bp-err");

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      sha256(input.value).then(function (h) {
        if (h === PASSWORD_HASH) {
          try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
          gate.remove();
          document.documentElement.classList.remove("bp-locked");
        } else {
          err.textContent = "Incorrect password.";
          input.select();
        }
      });
    });
    input.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
