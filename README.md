
Selamat Pagi.
Saya Muhamad Khafidz Haikal izin mengirimkan hasil pengerjaan Test Fronend Developer. 

Aplikasi : Sistem Jasa Laundry
Link Repo : https://github.com/KhafidzHaikal/laundry-app.git
Framework : Laravel Inertia React
Database : MySql
User : Admin dan Peminjam

Use Case 
1. Admin: login, Menerima Pesanan, CRUD Laundry
2. User : login, Memesan Laundry

Alur Aplikasi
1. Admin
Login -> Melihat Dashboard -> Menu Laundry -> CRUD Laundry -> Menu Pelanggan -> Melihat Pesanan -> "Kerjakan" -> status berubah "Selesai" -> logout -> selesai

2. User
Register -> Dashboard -> Pesan Laundry -> Pilih Paket Layanan -> Input Berat (Dibulatkan apabila berat 2,7 menjadi 3) -> Pesan -> Melihat daftar transaksi/pesanan laundy dengan status "diproses"-> tunggu sampai status "selesai" -> pesanan dapat diambil -> selesai

Cara menjalankan Aplikasi

clone https://github.com/KhafidzHaikal/laundry-app.git

1. npm i 
2. salin '.env.example' dan tempel ubah file '.env'
3. php artisan generate:key
4. buat database "laundry-app"
5. php artisan migrate:fresh --seed
6. php artisan serve

Akun:
1. Admin 
email: admin@gmail.com
password : 123

2. User
email: user@gmail.com
password : 123

