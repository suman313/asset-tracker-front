export default function webSiteTheme(theme = sessionStorage.getItem("theme")) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
