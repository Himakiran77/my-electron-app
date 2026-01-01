document.addEventListener("DOMContentLoaded", () => {
  // Set year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Back to login
  const backBtn = document.getElementById("backToLogin");
  if (backBtn) {
    backBtn.style.cursor = "pointer";
    backBtn.addEventListener("click", () => {
      window.electronAPI.navigate("Login");
    });
  }
});