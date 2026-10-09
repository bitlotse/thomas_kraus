(() => {
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  const heroVideo = document.querySelector("[data-hero-video]");
  const videoToggle = document.querySelector("[data-video-toggle]");
  if (heroVideo && videoToggle) {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const play = () => {
      const source = heroVideo.querySelector("source");
      if (!source.hasAttribute("src")) {
        source.src = source.dataset.src;
        heroVideo.load();
      }
      heroVideo.play().catch(() => {});
    };
    const updateToggle = () => {
      videoToggle.setAttribute("aria-label", heroVideo.paused ? "Video abspielen" : "Video pausieren");
      videoToggle.dataset.paused = String(heroVideo.paused);
    };
    videoToggle.hidden = false;
    heroVideo.addEventListener("play", updateToggle);
    heroVideo.addEventListener("pause", updateToggle);
    videoToggle.addEventListener("click", () => {
      if (heroVideo.paused) play();
      else heroVideo.pause();
    });
    motion.addEventListener("change", () => { if (motion.matches) heroVideo.pause(); });
    if (!motion.matches) play();
  }

  const header = document.querySelector(".th-header");
  if (header) {
    const sizeHeader = () => document.body.style.setProperty("--th-header-height", `${header.getBoundingClientRect().height}px`);
    sizeHeader();
    if ("ResizeObserver" in window) new ResizeObserver(sizeHeader).observe(header);
    else window.addEventListener("resize", sizeHeader);
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  if (toggle && navigation) {
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      navigation.dataset.open = "false";
    };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      navigation.dataset.open = String(open);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { close(); toggle.focus(); }
    });
    navigation.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
  }

  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (form && status) {
    form.addEventListener("invalid", () => { status.textContent = "Bitte prüfen Sie die markierten Pflichtfelder."; }, true);
    form.addEventListener("input", () => { if (form.checkValidity()) status.textContent = "Das Formular ist vollständig und bereit zum Absenden."; });
  }
})();
