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

// Password toggle
  const toggleEye = document.getElementById("toggleEye");
  const passwordInput = document.getElementById("password");

  if (toggleEye && passwordInput) {
    toggleEye.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleEye.textContent = "🙈";
      } else {
        passwordInput.type = "password";
        toggleEye.textContent = "👁️";
      }
    });
  }
