// dashboard.js - Versi 2.0 dengan localStorage & CRUD
document.addEventListener("DOMContentLoaded", () => {
    // === ELEMEN DOM ===
    const tableBody = document.getElementById("passwordTableBody");
    const modal = document.getElementById("entryModal");
    const modalTitle = document.getElementById("modalTitle");
    const entryForm = document.getElementById("entryForm");
    const addEntryBtn = document.getElementById("addEntryBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const siteInput = document.getElementById("siteInput");
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const entryIndexInput = document.getElementById("entryIndex");

    // === STATE APLIKASI ===
    let passwords = [];
    const STORAGE_KEY = 'secureVaultPasswords';

    // === FUNGSI-FUNGSI UTAMA ===
    const loadData = () => {
        const dataFromStorage = localStorage.getItem(STORAGE_KEY);
        if (dataFromStorage && JSON.parse(dataFromStorage).length > 0) {
            passwords = JSON.parse(dataFromStorage);
        } else {
            passwords = [...passwordEntries]; // Gunakan data dari data.js sebagai data awal
            saveData();
        }
        renderTable();
    };

    const saveData = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(passwords));
    };

    const renderTable = () => {
        tableBody.innerHTML = '';
        if (passwords.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px;">Belum ada data. Silakan tambahkan akun baru.</td></tr>`;
            return;
        }
        passwords.forEach((entry, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${escapeHtml(entry.site)}</td>
                <td>${escapeHtml(entry.username)}</td>
                <td class="password-cell"><span>••••••••</span></td>
                <td class="action-buttons">
                    <button class="btn-action toggle-vis" title="Tampilkan/Sembunyikan" data-index="${index}"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-action copy-user" title="Salin Username" data-username="${escapeHtml(entry.username)}"><i class="fa-solid fa-user-pen"></i></button>
                    <button class="btn-action copy-pass" title="Salin Password" data-password="${escapeHtml(entry.password)}"><i class="fa-solid fa-key"></i></button>
                    <button class="btn-action edit" title="Edit" data-index="${index}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-action delete" title="Hapus" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    const escapeHtml = (unsafe) => typeof unsafe === 'string' ? unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : '';

    // === EVENT HANDLERS ===
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const index = entryIndexInput.value;
        const entryData = {
            site: siteInput.value,
            username: usernameInput.value,
            password: passwordInput.value,
        };
        if (index) { // Mode Edit
            passwords[parseInt(index, 10)] = entryData;
            showToast("Data berhasil diperbarui!");
        } else { // Mode Tambah Baru
            passwords.push(entryData);
            showToast("Data baru berhasil disimpan!");
        }
        saveData();
        renderTable();
        closeModal();
    };

    const handleTableClick = (event) => {
        const target = event.target.closest('.btn-action');
        if (!target) return;
        const index = target.dataset.index;
        if (target.classList.contains('toggle-vis')) {
            const passSpan = target.closest('tr').querySelector('.password-cell span');
            if (passSpan.textContent === '••••••••') {
                passSpan.textContent = escapeHtml(passwords[index].password);
                target.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
            } else {
                passSpan.textContent = '••••••••';
                target.innerHTML = `<i class="fa-solid fa-eye"></i>`;
            }
        } else if (target.classList.contains('copy-user')) {
            navigator.clipboard.writeText(target.dataset.username);
            showToast("Username berhasil disalin!");
        } else if (target.classList.contains('copy-pass')) {
            navigator.clipboard.writeText(target.dataset.password);
            showToast("Password berhasil disalin!");
        } else if (target.classList.contains('edit')) {
            modalTitle.textContent = "Edit Akun";
            const entry = passwords[index];
            siteInput.value = entry.site;
            usernameInput.value = entry.username;
            passwordInput.value = entry.password;
            entryIndexInput.value = index;
            openModal();
        } else if (target.classList.contains('delete')) {
            if (confirm(`Yakin ingin menghapus data untuk "${passwords[index].site}"?`)) {
                passwords.splice(index, 1);
                saveData();
                renderTable();
                showToast("Data berhasil dihapus.");
            }
        }
    };
    
    // === FUNGSI MODAL ===
    const openModal = () => modal.style.display = 'flex';
    const closeModal = () => {
        modal.style.display = 'none';
        entryForm.reset();
        entryIndexInput.value = '';
    };

    // === INISIALISASI & EVENT LISTENERS ===
    addEntryBtn.addEventListener('click', () => {
        modalTitle.textContent = "Tambah Akun Baru";
        openModal();
    });
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => (e.target === modal) && closeModal());
    entryForm.addEventListener('submit', handleFormSubmit);
    tableBody.addEventListener('click', handleTableClick);

    loadData(); // Mulai aplikasi
});

// Tambahkan CSS untuk Toast Notification
const style = document.createElement('style');
style.textContent = `
.toast-notification {
    position: fixed; bottom: 20px; left: 50%;
    transform: translateX(-50%); background-color: #28a745;
    color: white; padding: 12px 25px; border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); z-index: 1001;
    font-family: 'Poppins', sans-serif; font-size: 1rem;
    animation: fadeIn 0.5s, fadeOut 0.5s 2.5s forwards;
}
@keyframes fadeOut { to { opacity: 0; bottom: 0; } }`;
document.head.appendChild(style);