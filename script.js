(() => {
  const root = document.documentElement;
  const navLinks = document.getElementById("nav-links");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  const progress = document.querySelector(".scroll-progress");
  const year = document.getElementById("year");
  const sections = [...document.querySelectorAll("main section[id]")];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  setTheme(theme);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  navToggle?.addEventListener("click", () => {
    const open = !navLinks.classList.contains("is-open");
    navLinks.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("hashchange", closeMenu);

  window.addEventListener(
    "scroll",
    () => {
      updateProgress();
      if (prefersReducedMotion) {
        updateActiveNav();
      }
    },
    { passive: true }
  );
  updateProgress();
  updateActiveNav();

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveLink(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
  } else if (prefersReducedMotion) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
  }

  function setTheme(nextTheme) {
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", nextTheme === "dark" ? "#071422" : "#f4f7fb");
    }
    themeToggle?.setAttribute(
      "aria-label",
      nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  function closeMenu() {
    navLinks?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  }

  function updateProgress() {
    if (!progress) return;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const value = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${value}%`;
  }

  function updateActiveNav() {
    const fromTop = window.scrollY + 120;
    let current = sections[0]?.id || "home";
    sections.forEach((section) => {
      if (section.offsetTop <= fromTop) {
        current = section.id;
      }
    });
    setActiveLink(current);
  }

  function setActiveLink(id) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${id}`;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }
})();
