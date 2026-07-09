// ============ DATA ============
const skills = [
  { name: "Flutter", icon: "💠", pct: 95 },
  { name: "Dart", icon: "🎯", pct: 90 },
  { name: "Firebase", icon: "🔥", pct: 90 },
  { name: "REST APIs", icon: "🔌", pct: 88 },
  { name: "Riverpod", icon: "⚡", pct: 90 },
  { name: "Bloc", icon: "🧩", pct: 85 },
  { name: "Provider", icon: "🗂️", pct: 85 },
  { name: "GetX", icon: "✖️", pct: 85 },
];

const services = [
  { icon: "📱", title: "Full Mobile App Development", desc: "Cross-platform apps for Android & iOS using Flutter." },
  { icon: "🔥", title: "Firebase Integration", desc: "Auth, Firestore, FCM, Storage and more." },
  { icon: "🎨", title: "UI/UX Design in Flutter", desc: "Modern, clean and responsive UI with animations." },
  { icon: "🚀", title: "App Deployment", desc: "Play Store & App Store deployment with best practices." },
  { icon: "🛠️", title: "Bug Fixing & Optimization", desc: "Fix bugs and improve performance & user experience." },
  { icon: "🤖", title: "AI Integration", desc: "Integrate AI features like chatbots, image recognition & more." },
];

const projects = [
  {
    icon: "🍽️",
    title: "Restaurant Management App",
    desc: "Multi-restaurant scalable system with Firebase backend, real-time order tracking, and analytics dashboard.",
    tags: ["Flutter", "Firebase", "Provider"],
  },
  {
    icon: "🛵",
    title: "Food Delivery App",
    desc: "Live location tracking using Google Maps, secure payment integration, and smooth UI/UX.",
    tags: ["Flutter", "Google Maps", "Stripe"],
  },
  {
    icon: "⚙️",
    title: "Business App Generator",
    desc: "Automated Flutter app duplication system with dynamic branding, configuration and Firebase auto-setup.",
    tags: ["Flutter", "Firebase", "Dart"],
  },
  {
    icon: "⏰",
    title: "Alarm & Productivity App",
    desc: "Clean architecture (MVVM) with local + Firebase sync, notifications and task scheduling.",
    tags: ["Flutter", "Riverpod", "Firebase"],
  },
];

const roles = ["Flutter Developer", "Mobile App Engineer", "Firebase Specialist", "UI/UX Enthusiast"];

// ============ RENDER ============
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = skills.map(s => `
    <div class="skill-card">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-pct="${s.pct}"></div></div>
      <div class="skill-pct">${s.pct}%</div>
    </div>
  `).join("");
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.desc}</p>
    </div>
  `).join("");
}

function renderProjects() {
  const list = document.getElementById("projectsList");
  list.innerHTML = projects.map(p => `
    <div class="project-row">
      <div class="project-thumb">${p.icon}</div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      </div>
      <div class="project-arrow">→</div>
    </div>
  `).join("");
}

renderSkills();
renderServices();
renderProjects();
document.getElementById("year").textContent = new Date().getFullYear();

// ============ TYPING EFFECT ============
(function typeLoop() {
  const el = document.getElementById("typedRole");
  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }
  tick();
})();

// ============ NAVBAR: scroll state + active link + mobile menu ============
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  navbar.style.borderBottomColor = window.scrollY > 20 ? "rgba(139,92,246,0.25)" : "var(--border)";

  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("menu-open");
});
navLinks.forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("menu-open"));
});

// ============ CURSOR GLOW ============
const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
}, { passive: true });

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ SKILL BARS ANIMATE ON VIEW ============
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.pct + "%";
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const skillsGridEl = document.getElementById("skillsGrid");
if (skillsGridEl) skillObserver.observe(skillsGridEl);

// ============ STATS COUNT-UP ============
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stat-num").forEach(numEl => {
        const target = parseInt(numEl.dataset.target, 10);
        const suffix = numEl.dataset.suffix || "";
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();
        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          numEl.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".stats-band").forEach(el => statObserver.observe(el));

// ============ CONTACT FORM (client-side demo) ============
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = form.querySelector(".btn-text");
  btn.textContent = "Sending...";
  setTimeout(() => {
    btn.textContent = "Send Message";
    formNote.textContent = "✓ Thanks! Your message has been noted — I'll get back to you soon.";
    form.reset();
  }, 900);
  // NOTE: This form is front-end only. To make it functional on deploy,
  // connect it to a service like Formspree, EmailJS, or your own backend endpoint.
});
