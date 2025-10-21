const themeSwitch = document.getElementById("themeSwitch");
themeSwitch.addEventListener("change", toggleTheme);
let userHasChosenTheme = false;

// определение текущей темы и новой темы
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  setTheme(newTheme);
  userHasChosenTheme = true;
}

// установка новой темы
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (userHasChosenTheme) {
    localStorage.setItem("theme", theme);
  }
}

// установка сохраненной темы из local storage
// или тема браузера
// или по времени суток (getThemeByTime)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const browserTheme = browserTheme();
  if (browserTheme === "dark") {
    setTheme("dark");
  } else {
    const themeByTime = getThemeByTime();
    setTheme(themeByTime);
  }
}

// установка темы по времени суток
function getThemeByTime() {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 8 && hours < 21 ? "light" : "dark";
}

// установки ос пользователя
function browserTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}
