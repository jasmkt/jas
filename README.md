# Electro_Scan_Pro v13.0 Pro (Offline PaddleOCR + Logo Rasmi)

Projek GitHub Actions lengkap untuk membina APK Android **Electro_Scan_Pro v13.0 Pro** oleh **JAS DIFIX** dengan:
- **PaddleOCR (ONNX Runtime Web + PP-OCRv4)** terbina 100% offline di dalam APK.
- **Logo Rasmi ElectroScanPro** siap dipasang untuk semua saiz skrin Android (`mdpi` hingga `xxxhdpi` + *Adaptive Icon*).
- **Kebenaran Kamera, Mikrofon, dan Galeri** dipatch secara automatik.

## Cara Bina APK di GitHub
1. Ekstrak fail ZIP ini ke satu folder.
2. *(Pilihan)* Jika anda ada fail pangkalan data `JasDifix_Database_Gabungan.json`, letakkan sekali ke dalam folder `www/`.
3. Muat naik semua fail & folder (termasuk `.github/workflows/` dan `android-icons/`) ke repositori GitHub anda.
4. Buka tab **Actions** di GitHub → klik **Build ElectroScan Pro APK (Offline PaddleOCR)** → tunggu ~3–5 minit sehingga tanda hijau ✅.
5. Muat turun APK siap di bahagian **Artifacts** → `Electro_Scan_Pro_v13_PaddleOCR_APK`.
