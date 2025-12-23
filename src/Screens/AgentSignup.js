  const backBtn = document.getElementById("backToLogin");
  if (backBtn) {
    backBtn.style.cursor = "pointer";
    backBtn.addEventListener("click", () => {
      window.electronAPI.navigate("Login");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});