// dashboard.js

document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("passwordTableBody");
    const notification = document.getElementById("copyNotification");

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000); // Notifikasi hilang setelah 2 detik
    }

    // Fungsi untuk menyalin teks ke clipboard
    function copyToClipboard(text, type) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`${type} berhasil disalin!`);
        }).catch(err => {
            console.error("Gagal menyalin teks: ", err);
            showNotification(`Gagal menyalin. Coba lagi.`);
        });
    }

    // Render data dari data.js ke dalam tabel
    passwordEntries.forEach(entry => {
        const row = document.createElement("tr");

        // Kolom 1: Situs
        const siteCell = document.createElement("td");
        siteCell.textContent = entry.site;
        row.appendChild(siteCell);

        // Kolom 2: Username
        const usernameCell = document.createElement("td");
        usernameCell.textContent = entry.username;
        row.appendChild(usernameCell);

        // Kolom 3: Password (dengan toggle)
        const passwordCell = document.createElement("td");
        passwordCell.classList.add("password-cell");
        
        const passwordSpan = document.createElement("span");
        passwordSpan.textContent = "••••••••"; // Tampilkan sebagai titik-titik
        passwordSpan.dataset.password = entry.password; // Simpan password asli di data attribute
        passwordSpan.dataset.isMasked = "true";

        const toggleButton = document.createElement("button");
        toggleButton.textContent = "👁️";
        toggleButton.classList.add("btn-toggle");
        toggleButton.title = "Tampilkan/Sembunyikan Password";

        toggleButton.addEventListener("click", () => {
            if (passwordSpan.dataset.isMasked === "true") {
                passwordSpan.textContent = passwordSpan.dataset.password;
                passwordSpan.dataset.isMasked = "false";
                toggleButton.textContent = "🙈";
            } else {
                passwordSpan.textContent = "••••••••";
                passwordSpan.dataset.isMasked = "true";
                toggleButton.textContent = "👁️";
            }
        });
        
        passwordCell.appendChild(passwordSpan);
        passwordCell.appendChild(toggleButton);
        row.appendChild(passwordCell);

        // Kolom 4: Aksi (Tombol Copy)
        const actionCell = document.createElement("td");
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("action-buttons");

        const copyUserButton = document.createElement("button");
        copyUserButton.textContent = "Copy User";
        copyUserButton.classList.add("btn-copy");
        copyUserButton.addEventListener("click", () => {
            copyToClipboard(entry.username, "Username");
        });

        const copyPassButton = document.createElement("button");
        copyPassButton.textContent = "Copy Pass";
        copyPassButton.classList.add("btn-copy");
        copyPassButton.addEventListener("click", () => {
            copyToClipboard(entry.password, "Password");
        });
        
        buttonGroup.appendChild(copyUserButton);
        buttonGroup.appendChild(copyPassButton);
        actionCell.appendChild(buttonGroup);
        row.appendChild(actionCell);

        // Tambahkan baris ke dalam tabel
        tableBody.appendChild(row);
    });
});