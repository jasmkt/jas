# Electro_Scan_Pro v12.2 (GitHub Actions APK Builder)

Projek ini disiapkan khas untuk membina **APK Android sebenar** secara automatik melalui **GitHub Actions** (menggunakan Capacitor Android) tanpa sekatan WebView daripada web converter biasa.

## Struktur Fail
- `www/index.html` — Aplikasi penuh **Electro_Scan_Pro v12.2** (Google AI terkini + pemilih galeri terus + anti-sesak).
- `package.json` — Konfigurasi Capacitor Android.
- `capacitor.config.json` — Tetapan nama app (`Electro_Scan_Pro`), ID pakej (`com.jasdifix.electroscanpro`), dan mod HTTPS tempatan supaya mikrofon, kamera & lesen berfungsi penuh.
- `scripts/patch-android.js` — Skrip automatik menambah kebenaran `INTERNET`, `CAMERA`, `RECORD_AUDIO`, `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO` ke dalam `AndroidManifest.xml`.
- `.github/workflows/build-apk.yml` — Aliran kerja GitHub Actions untuk membina fail `.apk` secara automatik.

## Cara Bina APK di GitHub
1. Buat repository baharu di GitHub (contoh: `electro-scan-pro`).
2. Ekstrak fail ZIP ini di PC anda.
3. Muat naik **semua fail dan folder** (termasuk folder `.github`, `www`, `scripts`, `package.json`, dan `capacitor.config.json`) ke dalam repository GitHub tersebut.
   > *Nota:* Pada Windows, aktifkan **Show hidden files** jika folder `.github` tidak kelihatan semasa memilih fail.
4. Selepas upload selesai, buka tab **Actions** di GitHub.
5. Tunggu proses **Build Electro_Scan_Pro APK** bertanda hijau (lebih kurang 2–3 minit).
6. Klik pada build tersebut, skrol ke bahagian **Artifacts**, dan muat turun **`Electro_Scan_Pro_v12_2_APK`**.
