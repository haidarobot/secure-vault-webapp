# Secure Vault - Manajer Password Pribadi

Aplikasi web sederhana untuk mengelola dan menyimpan password secara lokal, dibuat sebagai proyek latihan untuk mendalami konsep dasar HTML, CSS, dan JavaScript.

---

##  Tampilan Aplikasi (Application Preview)

<p align="center">
  <img src="images/login-page.png" alt="Tampilan Halaman Login" width="45%">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="images/dashboard-page.png" alt="Tampilan Halaman Dashboard" width="45%">
</p>

> *Kiri: Halaman login dengan desain futuristik. Kanan: Halaman dashboard utama tempat semua data kredensial ditampilkan dalam tabel.*

---

##  Fitur Utama

- **Halaman Login:** Sistem autentikasi lokal sederhana dengan username dan password yang telah ditentukan.
- **Dashboard Terproteksi:** Daftar semua kredensial hanya bisa diakses setelah berhasil login.
- **Salin ke Clipboard:** Tombol "Copy" untuk menyalin username dan password dengan sekali klik.
- **Tampilkan/Sembunyikan Password:** Fitur keamanan untuk menyembunyikan password di layar dan menampilkannya saat dibutuhkan.
- **Desain Modern & Responsif:** Antarmuka yang elegan dengan tema gelap dan elemen futuristik.

---

##  Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3 (Flexbox & Grid), JavaScript (ES6)
- **Ikon:** Font Awesome
- **Version Control:** Git & GitHub

---

##  Cara Menjalankan Secara Lokal

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/haidarobot/secure-vault-webapp.git](https://github.com/haidarobot/secure-vault-webapp.git)
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd secure-vault-webapp
    ```
3.  **Buka file `index.html`** langsung di browser favorit Anda.
4.  **Login ke Aplikasi:**
    Gunakan kredensial default yang sudah diatur di dalam `script.js`:
    * **Username:** `user`
    * **Password:** `password`
5.  **Mengelola Data** dengan mengedit secara manual file `data.js`.

---

## ⚠️ Peringatan Keamanan

- **HANYA UNTUK LATIHAN:** Aplikasi ini dirancang **khusus untuk tujuan pembelajaran**.
- **DATA TIDAK TERENKRIPSI:** Semua data disimpan dalam format teks biasa di `data.js`. Jangan gunakan password asli.
- **REPOSITORY HARUS PRIVATE:** Pastikan repository ini selalu dalam keadaan **Private** untuk mencegah data terekspos.

---

##  Rencana Pengembangan

Beberapa ide untuk pengembangan di masa depan:

- [ ] Menggunakan `localStorage` browser untuk menyimpan data agar tidak perlu mengedit file `.js`.
- [ ] Menambahkan fitur enkripsi sederhana untuk data yang disimpan.
- [ ] Membuat fungsionalitas untuk menambah, mengedit, dan menghapus data langsung dari antarmuka web.