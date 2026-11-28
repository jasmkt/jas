# Electro_Scan_Pro v13.0 Pro (Offline PaddleOCR + Logo Rasmi + Android Native TTS)

Projek GitHub Actions lengkap untuk membina APK Android **Electro_Scan_Pro v13.0 Pro** oleh **JAS DIFIX** dengan:
- **Android Native TTS (`@capacitor-community/text-to-speech`)** + sandaran suara pelayar/web + Gemini TTS.
- **Salam ringkas sahaja** (contohnya *"Salam Jas."* atau *"Salam Tuan."*) dan bacaan teks tertera dalam Bahasa Melayu sambil mengekalkan istilah elektronik antarabangsa (*kapasitor, resistor, dioda/diod, transistor, MOSFET, IGBT, IC, SMD, PCB, PSU, SMPS, GND, VCC*).
- **PaddleOCR (ONNX Runtime Web + PP-OCRv4)** terbina 100% offline di dalam APK (`www/ocr/`).
- **Logo Rasmi ElectroScanPro** siap dipasang untuk semua saiz skrin Android (`android-icons/` + *Adaptive Icon*).
- **Kebenaran Kamera, Mikrofon, Galeri & TTS_SERVICE** dipatch secara automatik melalui `patch-android.js`.

## Cara Bina APK di GitHub
1. Ekstrak fail ZIP ini ke satu folder.
2. *(Pilihan)* Jika anda ada fail pangkalan data `JasDifix_Database_Gabungan.json`, letakkan sekali ke dalam folder `www/`.
3. Muat naik semua fail & folder (termasuk `.github/workflows/`, `.gitignore`, `android-icons/`, dan `www/`) ke repositori GitHub anda.
4. Buka tab **Actions** di GitHub → klik **Build ElectroScan Pro APK (Offline PaddleOCR + Native TTS)** → tunggu ~3–5 minit sehingga tanda hijau ✅.
5. Muat turun APK siap di bahagian **Artifacts** → `Electro_Scan_Pro_v13_PaddleOCR_APK`.
