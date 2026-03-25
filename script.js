// ===== NITHISH'S PORTFOLIO - script.js =====

// ===== DATA =====
const skills = [
  { icon: "🌐", name: "HTML",          level: 70, label: "Learning" },
  { icon: "🎨", name: "CSS",           level: 60, label: "Learning" },
  { icon: "⚡", name: "JavaScript",    level: 40, label: "Beginner" },
  { icon: "📱", name: "Responsive",    level: 50, label: "Learning" },
  { icon: "🐙", name: "GitHub",        level: 35, label: "Beginner" },
  { icon: "🎬", name: "After Effects", level: 15, label: "Beginner" },
];

const projects = [
  {
    num: "PROJECT // 001",
    name: "Anime Hub Website",
    desc: "A full anime encyclopedia with 22 anime cards, Tamil explanations, dark purple theme and smooth hover animations.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    num: "PROJECT // 002",
    name: "Portfolio Website",
    desc: "This very website! A Demon Slayer themed personal portfolio built from scratch with CSS animations and flame effects.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    num: "PROJECT // 003",
    name: "Coming Soon 🔥",
    desc: "Next project in progress. Every Hashira started as a beginner — the journey continues!",
    tags: ["Future", "In Progress"]
  },
];

const hobbies = [
  { icon: "🎌", name: "Anime",      desc: "Demon Slayer, JJK, AOT, Naruto — anime is life da!" },
  { icon: "💻", name: "Coding",     desc: "Building websites and learning new things every day." },
  { icon: "🎮", name: "Gaming",     desc: "Love playing games in free time. GG no re!" },
  { icon: "🎬", name: "Editing",    desc: "Learning After Effects — video editing is next level!" },
  { icon: "🎵", name: "Music",      desc: "Anime OSTs on repeat. Gurenge forever! 🔥" },
  { icon: "📚", name: "Learning",   desc: "Always curious — YouTube, docs, tutorials. Never stop!" },
  { icon: "🏐", name: "Volleyball", desc: "My Best Sport Is VolleyBall" },
];

const typingWords = [
  "Developer 💻",
  "Anime Fan 🎌",
  "Coder ⚡",
  "Creator 🔥",
  "Student 🎓",
];

// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 2000);
});

// ===== TYPING EFFECT =====
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => { isDeleting = true; }, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

setTimeout(type, 2200);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById("cursor");
const trail  = document.getElementById("cursorTrail");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
  setTimeout(() => {
    trail.style.left = e.clientX + "px";
    trail.style.top  = e.clientY + "px";
  }, 80);
});

// ===== CLICK SPARK EFFECT =====
document.addEventListener("click", (e) => {
  const sparks = ["🔥", "✨", "⚡", "💥", "🌟"];
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    spark.style.left = e.clientX + "px";
    spark.style.top  = e.clientY + "px";
    const angle = (Math.PI * 2 / 6) * i;
    const dist  = 40 + Math.random() * 40;
    spark.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    spark.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
let isDark = true;

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ===== BUILD SKILLS =====
function buildSkills() {
  const grid = document.getElementById("skillsGrid");
  skills.forEach((skill, i) => {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.innerHTML = `
      <span class="skill-icon">${skill.icon}</span>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-bar-bg">
        <div class="skill-bar" data-level="${skill.level}"></div>
      </div>
      <div class="skill-level">${skill.label}</div>
    `;
    grid.appendChild(card);
  });

  // Animate bars when skills section visible
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar").forEach(bar => {
          bar.style.width = bar.dataset.level + "%";
        });
      }
    });
  }, { threshold: 0.3 });

  barObserver.observe(document.getElementById("skills"));
}

// ===== BUILD PROJECTS =====
function buildProjects() {
  const grid = document.getElementById("projectsGrid");
  projects.forEach(proj => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `
      <div class="project-num">${proj.num}</div>
      <div class="project-name">${proj.name}</div>
      <div class="project-desc">${proj.desc}</div>
      <div class="project-tags">
        ${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== BUILD HOBBIES =====
function buildHobbies() {
  const grid = document.getElementById("hobbiesGrid");
  hobbies.forEach(h => {
    const card = document.createElement("div");
    card.classList.add("hobby-card");
    card.innerHTML = `
      <span class="hobby-icon">${h.icon}</span>
      <div class="hobby-name">${h.name}</div>
      <div class="hobby-desc">${h.desc}</div>
    `;
    grid.appendChild(card);
  });
}

// ===== CONTACT =====
document.getElementById("emailCard").addEventListener("click", () => {
  alert("📧 Email — Coming Soon! 🚀");
});

document.getElementById("githubCard").addEventListener("click", () => {
  window.open("https://github.com/Nithish18da", "_blank");
});

document.getElementById("instaCard").addEventListener("click", () => {
  window.open("https://www.instagram.com/sasukeee_lx2", "_blank");
});

// ===== FLAME CANVAS =====
function initFlames() {
  const canvas = document.getElementById("flameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x      = Math.random() * canvas.width;
      this.y      = canvas.height + 10;
      this.size   = Math.random() * 3 + 1;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.life   = 0;
      this.maxLife = Math.random() * 150 + 80;
      this.color  = Math.random() > 0.5 ? "#c0392b" : "#e74c3c";
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.life++;
      this.opacity = (1 - this.life / this.maxLife) * 0.4;
      this.size *= 0.998;
      if (this.life >= this.maxLife || this.y < 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle   = this.color;
      ctx.shadowBlur  = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 80; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  animate();
}

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.borderBottomColor = window.scrollY > 50
    ? "rgba(192,57,43,0.4)"
    : "rgba(192,57,43,0.2)";
});

// ===== INIT =====
buildSkills();
buildProjects();
buildHobbies();
initFlames();

console.log("🔥 Nithish's Portfolio loaded! Set your heart ablaze! ⚔️");
