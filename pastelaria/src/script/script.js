// Trocar entre temas

let theme = null;
const body = document.body;
const icon = document.querySelector("#theme");

icon.addEventListener("click", evt => {
  loadTheme(evt.target.classList.contains("fa-moon") ? "dark" : "light");
});

function loadTheme(iconTheme) {
  theme = iconTheme;
  if (iconTheme === "dark") {
    body.classList.add(iconTheme);
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    body.classList.remove("dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
  saveLocalStorage();
  return;
}

function saveLocalStorage() {
  localStorage.setItem("theme", theme);
}

function loadLocalStorage() {
  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme) return;
  theme = savedTheme;
  loadTheme(theme);
}

loadLocalStorage();

// Menu mobile

const btnMenu = document.querySelector("#menu-icon");
const nav = document.querySelector(".nav");

btnMenu.addEventListener("click", () => {
  showNav();
});

function showNav() {
  nav.classList.toggle("ativo");
  btnMenu.className = nav.classList.contains("ativo")
    ? "fa-solid fa-x"
    : "fa-solid fa-bars";
}

// nav menu

const navLinks = document.querySelectorAll("a.nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("ativo")) {
      showNav();
    }
  });
});

// nav mobile logo

const headerLogo = document.querySelector(".header-logo");

headerLogo.addEventListener("click", () => {
  if (nav.classList.contains("ativo")) {
    showNav();
  }
});
