import React from "react";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      🌓  Theme
    </button>
  );
}
