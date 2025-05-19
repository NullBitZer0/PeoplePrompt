const prompts = [
  // Recruitment & Onboarding
  {
    category: "Recruitment & Onboarding",
    categoryClass: "blue",
    title: "Generate Job Description",
    description:
      "Generate a detailed and professional job description for a specific position.",
    prompt:
      "[job title], [key responsibilities], [required qualifications], and [preferred experience] for the position. Create a comprehensive and professional job description that includes a role overview, detailed responsibilities, essential qualifications, preferred skills, and other relevant details to attract qualified candidates, tailored to specifications.",
  },
  {
    category: "Recruitment & Onboarding",
    categoryClass: "blue",
    title: "Develop Interview Questions",
    description:
      "Create a set of interview questions to assess candidates for a specific role.",
    prompt:
      "[job role], [key competencies] to assess. Create a comprehensive and professional set of behavioral and technical interview questions that evaluate the required skills and attributes for the role, tailored to specifications.",
  },
  // Compensation & Benefits
  {
    category: "Compensation & Benefits",
    categoryClass: "yellow",
    title: "Salary Benchmarking",
    description:
      "Get a salary benchmarking report for a job title, industry, and location.",
    prompt:
      "[job title], [industry], [location]. Create a comprehensive and professional salary benchmarking report that includes current market rates, salary ranges, and relevant compensation trends for the specified role and region, tailored to specifications.",
  },
  {
    category: "Compensation & Benefits",
    categoryClass: "yellow",
    title: "Create Benefits Package",
    description:
      "Design a competitive employee benefits package for your organization.",
    prompt:
      "[company size], [industry]. Create a comprehensive and professional employee benefits package that includes health, wellness, retirement, and additional perks, tailored to the organization's needs and industry standards.",
  },
  // Employee Relations
  {
    category: "Employee Relations",
    categoryClass: "red",
    title: "Resolve Workplace Conflict",
    description: "Get a conflict resolution plan for a workplace scenario.",
    prompt:
      "[workplace conflict scenario]. Create a comprehensive and professional conflict resolution plan that outlines mediation steps, communication strategies, and best practices to resolve the issue effectively, tailored to the situation.",
  },
  {
    category: "Employee Relations",
    categoryClass: "red",
    title: "Draft Disciplinary Notice",
    description: "Draft a formal disciplinary notice for employee misconduct.",
    prompt:
      "[misconduct], [company policy]. Create a comprehensive and professional disciplinary notice that clearly documents the incident, references relevant policies, and outlines next steps, tailored to organizational standards.",
  },
  // HR Strategy & Policy
  {
    category: "HR Strategy & Policy",
    categoryClass: "purple",
    title: "Develop HR Policy",
    description: "Create a detailed HR policy document for your organization.",
    prompt:
      "[policy area] (e.g., remote work, leave, code of conduct). Create a comprehensive and professional HR policy document that includes policy objectives, guidelines, procedures, and compliance requirements, tailored to organizational needs.",
  },
  {
    category: "HR Strategy & Policy",
    categoryClass: "purple",
    title: "Workforce Planning",
    description:
      "Outline a workforce planning strategy for your business goals.",
    prompt:
      "[business goals], [current workforce structure]. Create a comprehensive and professional workforce planning strategy that includes staffing forecasts, skill gap analysis, and actionable recommendations, tailored to business objectives.",
  },
  // Performance Management
  {
    category: "Performance Management",
    categoryClass: "green",
    title: "Set Performance Goals",
    description: "Set SMART performance goals for an employee role.",
    prompt:
      "[employee role], [key objectives]. Create a comprehensive and professional set of SMART (Specific, Measurable, Achievable, Relevant, Time-bound) performance goals that align with organizational priorities, tailored to the role.",
  },
  {
    category: "Performance Management",
    categoryClass: "green",
    title: "Conduct Performance Review",
    description: "Create a performance review summary for an employee.",
    prompt:
      "[employee name], [achievements], [areas for improvement]. Create a comprehensive and professional performance review summary that highlights accomplishments, addresses development areas, and provides actionable feedback, tailored to the employee.",
  },
  // Training & Development
  {
    category: "Training & Development",
    categoryClass: "orange",
    title: "Create Training Plan",
    description: "Develop a structured training plan for a role or department.",
    prompt:
      "[role or department], [training objectives]. Create a comprehensive and professional training plan that includes learning goals, training modules, timelines, and assessment methods, tailored to the needs of the team or role.",
  },
  {
    category: "Training & Development",
    categoryClass: "orange",
    title: "Evaluate Training Effectiveness",
    description: "Evaluate the effectiveness of a training program.",
    prompt:
      "[training program]. Create a comprehensive and professional evaluation report that includes assessment methods, key metrics, participant feedback, and actionable recommendations to measure the effectiveness of the training, tailored to the program.",
  },
];

let categories = [
  { label: "All Categories", value: "all", class: "all" },
  {
    label: "Compensation & Benefits",
    value: "Compensation & Benefits",
    class: "yellow",
  },
  { label: "Employee Relations", value: "Employee Relations", class: "red" },
  {
    label: "HR Strategy & Policy",
    value: "HR Strategy & Policy",
    class: "purple",
  },
  {
    label: "Performance Management",
    value: "Performance Management",
    class: "green",
  },
  {
    label: "Recruitment & Onboarding",
    value: "Recruitment & Onboarding",
    class: "blue",
  },
  {
    label: "Training & Development",
    value: "Training & Development",
    class: "orange",
  },
];

let currentCategory = "all";
let editingIndex = null;

function renderCards() {
  const cardList = document.getElementById("cardList");
  cardList.innerHTML = "";
  const filtered =
    currentCategory === "all"
      ? prompts
      : prompts.filter((p) => p.category === currentCategory);
  filtered.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-category ${p.categoryClass}">${p.category}</div>
      <h2>${p.title}</h2>
      <p class="description">${p.description}</p>
      <div class="card-actions">
        <button class="view-btn" data-idx="${prompts.indexOf(
          p
        )}">👁️ View</button>
        <button class="edit-copy-btn" data-idx="${prompts.indexOf(
          p
        )}">✏️ Edit & Copy</button>
        <button class="copy-btn" data-idx="${prompts.indexOf(
          p
        )}">📋 Copy</button>
      </div>
    `;
    cardList.appendChild(card);
  });
  attachCardEvents();
}

function attachCardEvents() {
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.onclick = function () {
      const idx = +btn.getAttribute("data-idx");
      showModal(prompts[idx].prompt, false, idx);
    };
  });
  document.querySelectorAll(".edit-copy-btn").forEach((btn) => {
    btn.onclick = function () {
      const idx = +btn.getAttribute("data-idx");
      showModal(prompts[idx].prompt, true, idx);
    };
  });
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.onclick = function () {
      const idx = +btn.getAttribute("data-idx");
      copyToClipboard(prompts[idx].prompt);
    };
  });
}

function showModal(prompt, editable, idx) {
  const modal = document.getElementById("modal");
  const modalPrompt = document.getElementById("modalPrompt");
  modalPrompt.innerHTML = "";
  editingIndex = null;
  if (editable) {
    modalPrompt.innerHTML = `<textarea id="editArea" style="width:100%;min-height:80px;">${prompt}</textarea><br><button id="saveBtn">Save</button>`;
    editingIndex = idx;
    setTimeout(() => {
      document.getElementById("saveBtn").onclick = function () {
        const newPrompt = document.getElementById("editArea").value;
        prompts[editingIndex].prompt = newPrompt;
        renderCards();
        modal.style.display = "none";
      };
    }, 0);
  } else {
    modalPrompt.textContent = prompt;
  }
  modal.style.display = "flex";
}

function renderCategories() {
  const catDiv = document.querySelector(".categories");
  catDiv.innerHTML = "";
  categories.forEach((cat) => {
    const isActive =
      (currentCategory === "all" && cat.value === "all") ||
      cat.label === currentCategory;
    catDiv.innerHTML += `<button class="category ${cat.class}${
      isActive ? " active" : ""
    }">${cat.label}</button>`;
  });
  // Re-attach category filter events
  document.querySelectorAll(".category").forEach((btn) => {
    btn.onclick = function () {
      const label = btn.textContent.replace(/^[^\w]+/, "").trim();
      if (label === "All Categories") currentCategory = "all";
      else currentCategory = label;
      renderCards();
      renderCategories();
    };
  });
}

function renderCardCategoryOptions() {
  const select = document.getElementById("newCardCategory");
  select.innerHTML = "";
  categories
    .filter((c) => c.value !== "all")
    .forEach((cat) => {
      select.innerHTML += `<option value="${cat.value}">${cat.label}</option>`;
    });
}

// New Category logic
function handleNewCategory() {
  const name = prompt("Enter new category name:");
  if (!name) return;
  const color = prompt(
    "Enter a color name or hex (e.g. teal or #009688):",
    "#009688"
  );
  if (!color) return;
  const className = "custom-" + name.toLowerCase().replace(/\s+/g, "-");
  // Add style for this category
  const style = document.createElement("style");
  style.innerHTML = `.category.${className}, .card-category.${className} { background: ${color} !important; color: #fff !important; }`;
  document.head.appendChild(style);
  categories.push({ label: name, value: name, class: className });
  renderCategories();
  renderCardCategoryOptions();
}

document.addEventListener("DOMContentLoaded", function () {
  renderCategories();
  renderCards();
  renderCardCategoryOptions();

  // New Category button
  document.querySelector(".new-category-btn").onclick = handleNewCategory;

  // New Card modal logic
  const newCardModal = document.getElementById("newCardModal");
  const newCardBtn = document.querySelector(".new-card-btn");
  const closeNewCard = document.querySelector(".close-new-card");
  const newCardForm = document.getElementById("newCardForm");

  newCardBtn.onclick = function () {
    renderCardCategoryOptions();
    newCardModal.style.display = "flex";
  };
  closeNewCard.onclick = function () {
    newCardModal.style.display = "none";
    newCardForm.reset();
  };
  window.addEventListener("click", function (event) {
    if (event.target === newCardModal) {
      newCardModal.style.display = "none";
      newCardForm.reset();
    }
  });
  newCardForm.onsubmit = function (e) {
    e.preventDefault();
    const catValue = document.getElementById("newCardCategory").value;
    const catObj = categories.find((c) => c.value === catValue);
    prompts.push({
      category: catObj.label,
      categoryClass: catObj.class,
      title: document.getElementById("newCardTitle").value,
      description: document.getElementById("newCardDescription").value,
      prompt: document.getElementById("newCardPrompt").value,
    });
    renderCards();
    newCardModal.style.display = "none";
    newCardForm.reset();
  };

  // View/Edit modal close logic
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function showCopyMessage() {
  let msg = document.getElementById("copyMessage");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "copyMessage";
    msg.style.position = "fixed";
    msg.style.left = "50%";
    msg.style.bottom = "40px";
    msg.style.transform = "translateX(-50%)";
    msg.style.background = "#0288d1";
    msg.style.color = "#fff";
    msg.style.padding = "14px 32px";
    msg.style.borderRadius = "999px";
    msg.style.fontSize = "1.1em";
    msg.style.boxShadow = "0 2px 12px rgba(2,136,209,0.15)";
    msg.style.zIndex = 2000;
    msg.style.opacity = 0;
    msg.style.transition = "opacity 0.3s";
    document.body.appendChild(msg);
  }
  msg.textContent = "Prompt copied!";
  msg.style.opacity = 1;
  setTimeout(() => {
    msg.style.opacity = 0;
  }, 2000);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  showCopyMessage();
}
