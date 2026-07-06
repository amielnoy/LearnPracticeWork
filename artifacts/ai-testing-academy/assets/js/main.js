// Placeholder — replace with the real compiled main.js
const nav = document.getElementById("nav");
const hero = document.getElementById("hero");
const main = document.getElementById("main-content");
const footer = document.getElementById("site-footer");

if (nav) {
  nav.innerHTML = `
    <span class="logo">AI Testing Academy</span>
    <p style="color:var(--muted);font-size:.85rem;padding:16px 14px 5px;">
      Loading content…
    </p>`;
}

if (hero) {
  hero.innerHTML = `
    <h1>AI Testing Academy</h1>
    <p>Content is loading. Please add the compiled <code style="background:var(--code-bg);padding:2px 6px;border-radius:4px;font-size:.9em">assets/js/main.js</code> to complete setup.</p>`;
}

if (main) {
  main.innerHTML = `
    <section style="padding:56px 0">
      <div class="card" style="max-width:600px;margin:0 auto;text-align:center">
        <h4 style="font-size:1.2rem;margin-bottom:12px">Site setup in progress</h4>
        <p>Upload the <strong>assets/js/main.js</strong> file to see the full site content.</p>
      </div>
    </section>`;
}

if (footer) {
  footer.innerHTML = `<p>© AI Testing Academy</p>`;
}
