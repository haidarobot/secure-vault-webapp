// script.js
const correctUsername = "user";
const correctPassword = "password";

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (usernameInput.value === correctUsername && passwordInput.value === correctPassword) {
        alert("Login Berhasil! Selamat datang, Haidar!");
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Username atau password salah.";
        passwordInput.value = "";
        passwordInput.focus();
    }
});