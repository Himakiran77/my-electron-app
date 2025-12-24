let selectedRole = "user";

// DOM Elements (define them here!)
const headingRole = document.getElementById("role");
const signupRole = document.getElementById("signupRole");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.querySelector(".login");
const corporateLogin = document.querySelector(".corp");
const toggleEye = document.getElementById("toggleEye");

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Set year
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize role text
headingRole.textContent = "User";
signupRole.textContent = "User";

// Role button clicks (only one block needed)
document.querySelectorAll(".roles button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".roles .active")?.classList.remove("active");
    btn.classList.add("active");

    selectedRole = btn.dataset.role;
    const roleText = capitalize(selectedRole);
    headingRole.textContent = roleText;
    signupRole.textContent = roleText;
  });
});

// Password eye toggle
toggleEye.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleEye.textContent = "👁️";
  } else {
    passwordInput.type = "password";
    toggleEye.textContent = "🙈";
  }
});

// Restore remembered email on load
window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("remembered_email");
  if (savedEmail) {
    emailInput.value = savedEmail;
    document.getElementById("remember").checked = true;
  }
});

// Login function (now uses defined variables)
// async function login() {
//   const email = emailInput.value.trim();
//   const password = passwordInput.value;
//   const remember = document.getElementById("remember").checked;

//   if (!email || !password) {
//     alert("Please enter both email and password.");
//     return;
//   }

//   loginBtn.disabled = true;
//   loginBtn.textContent = "Logging in...";

//   let url = "";
//   let options = { method: "POST", headers: {} };
//   let isQueryParams = selectedRole !== "agent";

//   if (selectedRole === "user") {
//     url = "https://tityproperty.com/api/user_login";
//     // window.electronAPI.navigate("UserDashboard");
//   } else if (selectedRole === "agent") {
//     url = "https://tityproperty.com/api/agent_login";
//     options.headers["Content-Type"] = "application/json";
//     options.body = JSON.stringify({ email, password });
//     // window.electronAPI.navigate("AgentDashboard");
//   } else if (selectedRole === "banker") {
//     url = "https://tityproperty.com/api/banker_login";
//     // window.electronAPI.navigate("BankerDashboard");
//   }

//   if (isQueryParams) {
//     url += `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
//   }

//   try {
//     const response = await fetch(url, options);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }

//     const data = await response.json();

//     if (data.status === 1) {
//       let userData, storageKey;

//       if (selectedRole === "user") {
//         userData = data.message.user_details[0];
//         storageKey = "user_details";
//         localStorage.setItem("user_id", userData.user_id?.toString() || "");
//       } else if (selectedRole === "agent") {
//         userData = data.message.agent_details[0];
//         storageKey = "agent_details";
//       } else if (selectedRole === "banker") {
//         userData = data.message.banker_details[0];
//         storageKey = "banker_details";
//         localStorage.setItem("banker_id", userData.banker_id?.toString() || "");
//       }

//       localStorage.setItem(storageKey, JSON.stringify(userData));
//       localStorage.setItem("role", selectedRole);

//       if (remember) {
//         localStorage.setItem("remembered_email", email);
//       } else {
//         localStorage.removeItem("remembered_email");
//       }

//       alert("Login successful! Welcome back.");
//       console.log("Success:", userData);
//       // window.location.href = "dashboard.html"; // Uncomment when ready
//     } else {
//       alert(data.message || "Invalid email or password.");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Failed to connect to server. Check your internet or try again later.");
//   } finally {
//     loginBtn.disabled = false;
//     loginBtn.textContent = "Login";
//   }
// }

async function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const remember = document.getElementById("remember").checked;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  let url = "";
  let options = { method: "POST", headers: {} };
  let isQueryParams = selectedRole !== "agent";

  if (selectedRole === "user") {
    url = "https://tityproperty.com/api/user_login";
  } else if (selectedRole === "agent") {
    url = "https://tityproperty.com/api/agent_login";
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify({ email, password });
  } else if (selectedRole === "banker") {
    url = "https://tityproperty.com/api/banker_login";
  }

  if (isQueryParams) {
    url += `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const errorMsg = document.getElementById("errorMsg");

    if (data.status === 1) {
      let userData, storageKey;

      if (selectedRole === "user") {
        userData = data.message.user_details[0];
        storageKey = "user_details";
        localStorage.setItem("user_id", userData.user_id);
        window.electronAPI.navigate("UserDashboard");
      } else if (selectedRole === "agent") {
        userData = data.message.agent_details[0];
        storageKey = "agent_details";
        window.electronAPI.navigate("AgentDashboard");
      } else if (selectedRole === "banker") {
        userData = data.message.banker_details[0];
        storageKey = "banker_details";
        localStorage.setItem("banker_id", userData.banker_id);
        window.electronAPI.navigate("BankerDashboard");
      }

      localStorage.setItem(storageKey, JSON.stringify(userData));
      localStorage.setItem("role", selectedRole);

      if (remember) {
        localStorage.setItem("remembered_email", email);
      } else {
        localStorage.removeItem("remembered_email");
      }
    } else {
      errorMsg.textContent = data.message || "Invalid email or password";
      errorMsg.style.display = "block";

      passwordInput.value = "";
      passwordInput.focus();
    }
  } catch (error) {
    console.error(error);
    errorMsg.textContent = "Unable to connect. Please try again.";
    errorMsg.style.display = "block";

    passwordInput.value = "";
    emailInput.focus();
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
}

// Attach login to button (better than inline onclick)
loginBtn.addEventListener("click", login);

const signupLink = document.querySelector(".signup-link");

signupLink.addEventListener("click", () => {
  if (selectedRole === "user") {
    window.electronAPI.navigate("UserSignup");
  } else if (selectedRole === "agent") {
    window.electronAPI.navigate("AgentSignup");
  } else if (selectedRole === "banker") {
    window.electronAPI.navigate("BankerSignup");
  }
});

corporateLogin.addEventListener("click", () => {
  alert("Corporate Login Feature is coming soon!");
});
