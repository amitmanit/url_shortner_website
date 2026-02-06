const form = document.getElementById("shorten-form");
const longUrlInput = document.getElementById("long-url");
const result = document.getElementById("result");
const shortUrlInput = document.getElementById("short-url");
const status = document.getElementById("status");
const copyBtn = document.getElementById("copy-btn");
const openBtn = document.getElementById("open-btn");
const newBtn = document.getElementById("new-btn");
const themeToggle = document.getElementById("theme-toggle");

function setStatus(message, tone = "error") {
  status.textContent = message;
  status.style.color = tone === "success" ? "var(--status-success)" : "var(--status-error)";
}

function resetForm() {
  result.hidden = true;
  shortUrlInput.value = "";
  status.textContent = "";
  longUrlInput.value = "";
  longUrlInput.focus();
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const originalUrl = longUrlInput.value.trim();

  if (!originalUrl) {
    setStatus("Please enter a valid URL.");
    return;
  }

  setStatus("Creating short link...", "success");

  try {
    const response = await fetch("/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    if (!response.ok) {
      throw new Error("Server returned an error");
    }

    const data = await response.json();
    const shortUrl = `${window.location.origin}/${data.shortUrl}`;

    shortUrlInput.value = shortUrl;
    result.hidden = false;
    setStatus("Short link ready.", "success");
  } catch (error) {
    setStatus("Could not create short link. Please try again.");
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shortUrlInput.value);
    setStatus("Copied to clipboard.", "success");
  } catch {
    setStatus("Copy failed. Select the URL and copy manually.");
  }
});

openBtn.addEventListener("click", () => {
  if (shortUrlInput.value) {
    window.open(shortUrlInput.value, "_blank");
  }
});

newBtn.addEventListener("click", () => {
  resetForm();
});
