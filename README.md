# Electro_Scan_Pro v13.0 Pro (Offline PaddleOCR + Android Native TTS)

Projek GitHub Actions lengkap untuk membina APK Android **Electro_Scan_Pro v13.0 Pro** oleh **JAS DIFIX** dengan:
- **Android Native TTS (`@capacitor-community/text-to-speech`)** + sandaran suara pelayar/web + Gemini TTS.
- **Salam ringkas sahaja** (contohnya *"Salam Jas."* atau *"Salam Tuan."*) dan bacaan teks tertera dalam Bahasa Melayu sambil mengekalkan istilah elektronik antarabangsa (*kapasitor, resistor, dioda/diod, transistor, MOSFET, IGBT, IC, SMD, PCB, PSU, SMPS, GND, VCC*).
- **PaddleOCR (ONNX Runtime Web)** & **Kebenaran Kamera, Mikrofon, dan Galeri** dipatch secara automatik.

## Cara Bina APK di GitHub
1. Ekstrak fail ZIP ini ke satu folder.
2. *(Pilihan)* Jika anda ada fail pangkalan data `JasDifix_Database_Gabungan.json`, letakkan sekali ke dalam folder `www/`.
3. Muat naik semua fail & folder (termasuk `www/index.html`, `package.json`, `capacitor.config.json`, `patch-android.js`, dan `.github/workflows/build-apk.yml`) ke repositori GitHub anda.
4. Buka tab **Actions** di GitHub → klik **Build ElectroScan Pro APK (Offline PaddleOCR + Native TTS)** → tunggu proses selesai sehingga tanda hijau ✅.
5. Muat turun APK siap di bahagian **Artifacts** → `Electro_Scan_Pro_v13_PaddleOCR_APK`.
