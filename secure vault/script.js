// script.js

// 1. Definisikan kredensial yang benar (Hardcoded)
const correctUsername = "haidar";
const correctPassword = "supersemar";

// 2. Ambil elemen dari DOM
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// 3. Tambahkan event listener pada form saat disubmit
loginForm.addEventListener("submit", function(event) {
    // Mencegah form mengirim data dan me-reload halaman
    event.preventDefault();

    // Ambil nilai yang diinput oleh pengguna
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // 4. Lakukan pengecekan
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // Jika berhasil
        alert("Login Berhasil! Selamat datang, Haidar!");
        // Redirect ke halaman dashboard
        window.location.href = "dashboard.html";
    } else {
        // Jika gagal
        errorMessage.textContent = "Username atau password salah.";
        // Bersihkan input password agar pengguna bisa coba lagi
        passwordInput.value = "";
        passwordInput.focus();
    }
});