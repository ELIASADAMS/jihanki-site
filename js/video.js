(function () {
  const D = {
    "fuji-six-yokai-video":
      "A fictional yokai-documentary work presented as an homage to Japanese yokai folklore and ghost-story television. The film introduces six invented beings associated with Mount Fuji and deliberately uses the tone of a field documentary or late-night mystery programme. The names, folklore and documentary evidence are entirely fictional, forming part of the wider Fuji-region archive where real places and invented mythology overlap.",
    "mountain-remembers-mv":
      "A fragmentary audiovisual journey through the Fuji region, built from roads, forests, shrines, tunnels, lakes, vending machines, field recordings and traces of people encountered during the Japan expedition. It is deliberately not a conventional travel diary: places become characters and the boundary between physical landscape and remembered landscape becomes uncertain. The work connects Mount Fuji, the Fuji Five Lakes, Aokigahara, Saiko, Kawaguchiko, Shojiko, Motosuko, surrounding roads, shrines, tunnels and vending machines into one fictional audiovisual landscape.",
    gonshan:
      "Experimental visual music inspired by Kitahara Hakushu’s Higanbana from Memories (1911). The musical language uses the In-sen pentatonic scale, while Takismana and Eugene provide UTAU voices. Newspaper fragments, footprints and crimson higanbana form a digital collage around frozen time and cyclical loss: grief becomes an endless ritual between the living and the dead.",
    tunnel:
      "An audiovisual exploration of the Uno-Misaki Tunnel in the Yamanashi mountains, imagined as a giant recording device. The walls become a fictional archive preserving footsteps, coins, engines and a courier’s bicycle from different decades. Doubling figures represent layers of time returning to the surface, while a camera-like click suggests that the tunnel itself is photographing its visitors. The soundtrack combines tracker music with field recordings from inside the tunnel.",
    hotaru:
      "A conceptual audiovisual journey along a river at twilight, where fireflies become voices from the other side. The work connects them with Japanese legends, mono no aware and the bittersweet beauty of impermanence, combining liminal-space imagery with experimental VocalSynth / UTAU sound. Music and lyrics are by Takismana; the video combines dance, editing and cinematography.",
    shiki:
      "A Takismana audiovisual work preserved in the current JIHANKI archive. The repository README identifies it as part of the same developing video body but does not yet provide a complete project statement, so the archive intentionally avoids inventing a fuller interpretation.",
  };
  const s = document.createElement("style");
  s.textContent = `.archive-item.video-memory{padding:8px}.video-memory-title{display:block;font-size:8px;line-height:1.35}.video-memory-date{display:block;margin-top:3px;color:rgba(255,255,255,.34);font-size:6px;letter-spacing:.1em}.video-memory-description{display:block;margin-top:5px;color:rgba(255,255,255,.5);font-size:7px;line-height:1.45}.video-artifact{width:100%;max-width:900px;margin:auto}.video-artifact-meta{margin:0 0 8px;color:rgba(255,255,255,.35);font-size:8px;letter-spacing:.11em;text-transform:uppercase}.video-artifact-description{margin:0 0 16px;padding:13px 14px;border-left:2px solid rgba(255,255,255,.38);background:rgba(255,255,255,.025);color:rgba(255,255,255,.68);font:11px/1.65 'Courier New',monospace;max-height:34vh;overflow:auto}.video-artifact-description-label{display:block;margin-bottom:7px;color:rgba(255,255,255,.32);font-size:8px;letter-spacing:.16em;text-transform:uppercase}.video-artifact-frame{display:block;width:100%;max-height:68vh;background:#000;border:1px solid rgba(255,255,255,.13);box-shadow:inset 0 0 22px rgba(255,255,255,.02),0 0 18px rgba(0,0,0,.55);object-fit:contain}.video-artifact-frame::-webkit-media-controls-panel{background:linear-gradient(#111,#080808)}.video-artifact-frame::-webkit-media-controls-current-time-display,.video-artifact-frame::-webkit-media-controls-time-remaining-display{color:#aaa}@media(max-width:560px){.video-artifact-description{font-size:10px;max-height:36vh}.video-artifact-frame{max-height:58vh}}`;
  document.head.appendChild(s);
  const e = (v) =>
    String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  const A = () =>
    Array.isArray(window.JIHANKI_ARCHIVE) ? window.JIHANKI_ARCHIVE : [];
  const d = (i) => D[i.id] || i.description || "";
  function enhance() {
    const a = A();
    document
      .querySelectorAll(
        "#screen-content .archive-item[data-index],#screen-content .archive-item[data-archive-id]",
      )
      .forEach((b) => {
        const i =
          b.dataset.index != null
            ? a[+b.dataset.index]
            : a.find((x) => String(x.id) === String(b.dataset.archiveId));
        if (
          !i ||
          String(i.type || i.category).toLowerCase() !== "video" ||
          b.classList.contains("video-memory")
        )
          return;
        b.classList.add("video-memory");
        b.innerHTML = `<span class="video-memory-title">${e(i.title || "UNTITLED")}</span>${i.date ? `<span class="video-memory-date">${e(i.date)}</span>` : ""}${d(i) ? `<span class="video-memory-description">${e(d(i))}</span>` : ""}`;
      });
  }
  function openVideo(i) {
    const ar = document.getElementById("artifact"),
      c = document.getElementById("artifact-content");
    if (!ar || !c || !i?.file) return;
    const t = e(i.title || "UNTITLED"),
      m = [i.author, i.date, i.category || i.type]
        .filter(Boolean)
        .map(e)
        .join(" / "),
      desc = d(i);
    c.innerHTML = `<h1 class="artifact-title">${t}</h1><div class="artifact-meta">${m}</div><div id="artifact-body"><div class="video-artifact"><div class="video-artifact-meta">VIDEO / ARCHIVE</div>${desc ? `<section class="video-artifact-description"><span class="video-artifact-description-label">DESCRIPTION</span>${e(desc)}</section>` : ""}<video class="video-artifact-frame" controls autoplay playsinline disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen" preload="metadata" src="${e(i.file)}"></video></div></div>`;
    ar.classList.add("open");
    ar.setAttribute("aria-hidden", "false");
    const v = c.querySelector(".video-artifact-frame");
    window.JIHANKI_AUDIO?.duck?.(true);
    v.addEventListener("play", () => window.JIHANKI_AUDIO?.duck?.(true));
    v.addEventListener("pause", () => window.JIHANKI_AUDIO?.duck?.(false));
    v.addEventListener("ended", () => window.JIHANKI_AUDIO?.duck?.(false));
  }
  document.addEventListener(
    "click",
    (x) => {
      const b = x.target.closest?.(
        "#screen-content .archive-item[data-index],#screen-content .archive-item[data-archive-id]",
      );
      if (!b) return;
      const a = A(),
        i =
          b.dataset.index != null
            ? a[+b.dataset.index]
            : a.find((z) => String(z.id) === String(b.dataset.archiveId));
      if (!i || String(i.type || i.category).toLowerCase() !== "video") return;
      x.preventDefault();
      x.stopImmediatePropagation();
      window.JIHANKI_AUDIO?.sfx?.("button");
      window.JIHANKI_AUDIO?.start?.();
      openVideo(i);
    },
    true,
  );
  new MutationObserver(enhance).observe(
    document.getElementById("screen-content") || document.body,
    { childList: true, subtree: true },
  );
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", enhance, { once: true });
  else enhance();
})();
