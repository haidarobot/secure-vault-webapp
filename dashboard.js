// dashboard.js

document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("passwordTableBody");

    // Fungsi untuk menyalin teks ke clipboard
    function copyToClipboard(text, type) {
        navigator.clipboard.writeText(text).then(() => {
            // Menggunakan alert standar untuk notifikasi
            alert(`${type} berhasil disalin: ${text}`);
        }).catch(err => {
            console.error("Gagal menyalin teks: ", err);
            alert(`Gagal menyalin.`);
        });
    }

    // Render data dari data.js ke dalam tabel
    passwordEntries.forEach(entry => {
        const row = document.createElement("tr");

        // Kolom Situs
        const siteCell = document.createElement("td");
        siteCell.textContent = entry.site;
        row.appendChild(siteCell);

        // Kolom Username
        const usernameCell = document.createElement("td");
        usernameCell.textContent = entry.username;
        row.appendChild(usernameCell);

        // Kolom Password (dengan toggle)
        const passwordCell = document.createElement("td");
        passwordCell.classList.add("password-cell");

        const passwordSpan = document.createElement("span");
        passwordSpan.textContent = "••••••••";
        passwordSpan.dataset.password = entry.password;
        passwordSpan.dataset.isMasked = "true";
        passwordCell.appendChild(passwordSpan);
        row.appendChild(passwordCell);

        // Kolom Aksi (Tombol)
        const actionCell = document.createElement("td");
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("action-buttons");

        // Tombol Toggle Password
        const toggleButton = document.createElement("button");
        toggleButton.classList.add("btn-action");
        toggleButton.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        toggleButton.title = "Tampilkan/Sembunyikan Password";
        toggleButton.addEventListener("click", () => {
            if (passwordSpan.dataset.isMasked === "true") {
                passwordSpan.textContent = passwordSpan.dataset.password;
                passwordSpan.dataset.isMasked = "false";
                toggleButton.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
            } else {
                passwordSpan.textContent = "••••••••";
                passwordSpan.dataset.isMasked = "true";
                toggleButton.innerHTML = `<i class="fa-solid fa-eye"></i>`;
            }
        });

        // Tombol Copy Username
        const copyUserButton = document.createElement("button");
        copyUserButton.classList.add("btn-action");
        copyUserButton.innerHTML = `<i class="fa-solid fa-user-pen"></i>`;
        copyUserButton.title = "Salin Username";
        copyUserButton.addEventListener("click", () => {
            copyToClipboard(entry.username, "Username");
        });

        // Tombol Copy Password
        const copyPassButton = document.createElement("button");
        copyPassButton.classList.add("btn-action");
        copyPassButton.innerHTML = `<i class="fa-solid fa-key"></i>`;
        copyPassButton.title = "Salin Password";
        copyPassButton.addEventListener("click", () => {
            copyToClipboard(entry.password, "Password");
        });

        buttonGroup.appendChild(toggleButton);
        buttonGroup.appendChild(copyUserButton);
        buttonGroup.appendChild(copyPassButton);
        actionCell.appendChild(buttonGroup);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
});