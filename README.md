# Referensi Challenge Chapter 6

Dibuat dengan ExpressJS , EJS, Sequelize & Postgres

### Goal

* Program ini bertujuan untuk melakukan login admin.
* Setelah login, admin akan diarahkan ke dashboard.
* Dalam Dashboard, admin dapat melakukan Create, Read, Update, dan Delete (CRUD) data user.

### Fungsional
* Ketika mengakses route `/` dengan metode GET, pengguna akan dialihkan ke halaman index.
* Ketika mengakses route `/login` dengan metode GET, pengguna akan dialihkan ke halaman login.
* Ketika mengakses route `/dashboard/create` dengan metode GET, pengguna akan dialihkan ke halaman penambahan data.
* Ketika mengakses route `/dashboard/update/:id` dengan metode GET, pengguna akan dialihkan ke halaman pembaruan data.
* Ketika mengakses route `/dashboard/delete/:id` dengan metode GET, pengguna akan dialihkan ke halaman penghapusan data.

### Foreign Key & Association
Untuk menghubungkan antar tabel, dibutuhkan penggunaan Foreign Key & Association

* Perhatikan pembuatan Foreign Key pada file `migrations` pada bagian `references`.
* Perhatikan perubahan Nama Table pada file `migrations` pada bagian `createTable` dan `dropTable`.
* Perhatikan penggunaan Associate pada file `models` pada bagian `static associate(models)`.
* Perhatikan perubahan Nama Table pada file `models` pada bagian `tableName`.

### Sequelize Include
Untuk mengambil & menulis data ke beberapa tabel yang terhubung, dibutuhkan penggunaan objeck `include`.

* Perhatikan penggunaan `include` pada `index.js` bagian `UserGame.findAll`.
* Perhatikan penggunaan `include` pada `index.js` bagian `UserGame.findOne`.
* Perhatikan penggunaan `include` pada `index.js` bagian `UserGame.create`.

Untuk memperbarui / menghapus data dari beberapa tabel yang terhubung, tidak bisa menggunakan `include`, jadi proses tersebut dilakukan dengan melakukan operasi beberapa kali secara berurutan (chaining). Urutan berpengaruh besar pada operasi.

* Perhatikan cara memperbarui data pada `index.js` bagian `UserGameBiodata.destroy` dan `UserGame.destroy`.
* Perhatikan cara menghapus data pada `index.js` bagian `UserGame.destroy` dan `UserGameBiodata.destroy`.

### Cara menggunakan

1. Clone repository ini via terminal

```
git clone https://github.com/binar-fullstack/referensi-challenge-6
```

2. Setelah selesai, masuk ke dalam direktori repository

```
cd referensi-challenge-6
```

3. Install module yang dibutuhkan

```
npm install
```

4. Edit `config/config.json`

5. Buat database (perintah ini hanya berlaku di project ini karena sudah menggunakan scripts package.json)

```
npm run sequelize -- db:create
```

6. Migrasikan tabel (perintah ini hanya berlaku di project ini karena sudah menggunakan scripts package.json)

```
npm run sequelize -- db:migrate
```

7. Jalankan program

```
node index.js
```