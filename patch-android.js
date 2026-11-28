const fs = require('fs');
const path = require('path');

console.log('=== Menjalankan patch-android.js untuk Electro_Scan_Pro ===');

// 1. Patch AndroidManifest.xml (Kebenaran Kamera, Mikrofon, Galeri, Internet & Android 11+ TTS)
const manifestPath = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (fs.existsSync(manifestPath)) {
  let manifest = fs.readFileSync(manifestPath, 'utf8');

  const permissions = [
    'android.permission.INTERNET',
    'android.permission.ACCESS_NETWORK_STATE',
    'android.permission.CAMERA',
    'android.permission.RECORD_AUDIO',
    'android.permission.MODIFY_AUDIO_SETTINGS',
    'android.permission.READ_MEDIA_IMAGES',
    'android.permission.READ_MEDIA_VIDEO',
    'android.permission.READ_EXTERNAL_STORAGE',
    'android.permission.WRITE_EXTERNAL_STORAGE'
  ];

  let insertBlock = '';
  for (const perm of permissions) {
    if (!manifest.includes(perm)) {
      if (perm.includes('EXTERNAL_STORAGE')) {
        insertBlock += `    <uses-permission android:name="${perm}" android:maxSdkVersion="32" />\n`;
      } else {
        insertBlock += `    <uses-permission android:name="${perm}" />\n`;
      }
    }
  }

  if (!manifest.includes('android.hardware.camera')) {
    insertBlock += `    <uses-feature android:name="android.hardware.camera" android:required="false" />\n`;
    insertBlock += `    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />\n`;
  }

  // Android 11+ (API 30+): Benarkan aplikasi mengesan enjin TTS sistem (Google Speech Services)
  if (!manifest.includes('android.intent.action.TTS_SERVICE')) {
    insertBlock += `    <queries>\n        <intent>\n            <action android:name="android.intent.action.TTS_SERVICE" />\n        </intent>\n    </queries>\n`;
  }

  if (insertBlock) {
    manifest = manifest.replace('<application', insertBlock + '\n    <application');
  }

  if (!manifest.includes('android:usesCleartextTraffic')) {
    manifest = manifest.replace('<application', '<application android:usesCleartextTraffic="true" android:largeHeap="true"');
  }

  fs.writeFileSync(manifestPath, manifest, 'utf8');
  console.log('✅ AndroidManifest.xml berjaya dikemas kini (termasuk TTS_SERVICE).');
} else {
  console.warn('⚠️ AndroidManifest.xml tidak dijumpai:', manifestPath);
}

// 2. Patch MainActivity.java untuk kebenaran WebView & Runtime Permissions
const javaRoot = path.join('android', 'app', 'src', 'main', 'java');
function findMainActivity(dir) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findMainActivity(full);
      if (found) return found;
    } else if (entry.name === 'MainActivity.java') {
      return full;
    }
  }
  return null;
}

const mainActivityPath = findMainActivity(javaRoot);
if (mainActivityPath) {
  const pkgMatch = fs.readFileSync(mainActivityPath, 'utf8').match(/^package\s+([^;]+);/m);
  const pkgName = pkgMatch ? pkgMatch[1] : 'com.jasdifix.electroscanpro';

  const patchedJava = `package ${pkgName};

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final int REQ_PERMISSIONS = 1001;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestRuntimePermissions();
    }

    @Override
    public void onStart() {
        super.onStart();
        if (this.bridge != null && this.bridge.getWebView() != null) {
            WebSettings ws = this.bridge.getWebView().getSettings();
            ws.setJavaScriptEnabled(true);
            ws.setDomStorageEnabled(true);
            ws.setDatabaseEnabled(true);
            ws.setAllowFileAccess(true);
            ws.setAllowContentAccess(true);
            ws.setMediaPlaybackRequiresUserGesture(false);
        }
    }

    private void requestRuntimePermissions() {
        List<String> needed = new ArrayList<>();
        String[] basePerms = new String[] {
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
        };
        for (String p : basePerms) {
            if (ContextCompat.checkSelfPermission(this, p) != PackageManager.PERMISSION_GRANTED) {
                needed.add(p);
            }
        }
        if (Build.VERSION.SDK_INT >= 33) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.READ_MEDIA_IMAGES);
            }
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_VIDEO) != PackageManager.PERMISSION_GRANTED) {
                needed.add(Manifest.permission.READ_MEDIA_VIDEO);
            }
        }
        if (!needed.isEmpty()) {
            ActivityCompat.requestPermissions(this, needed.toArray(new String[0]), REQ_PERMISSIONS);
        }
    }
}
`;
  fs.writeFileSync(mainActivityPath, patchedJava, 'utf8');
  console.log('✅ MainActivity.java berjaya dikemas kini:', mainActivityPath);
} else {
  console.warn('⚠️ MainActivity.java tidak dijumpai.');
}

// 3. Pasang Logo Aplikasi ElectroScanPro (semua saiz mipmap + adaptive icon background)
const srcIconsDir = path.join('android-icons');
const resDir = path.join('android', 'app', 'src', 'main', 'res');

if (fs.existsSync(srcIconsDir) && fs.existsSync(resDir)) {
  const densities = ['mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'];
  let copied = 0;
  for (const d of densities) {
    const srcD = path.join(srcIconsDir, d);
    const dstD = path.join(resDir, d);
    if (!fs.existsSync(srcD)) continue;
    fs.mkdirSync(dstD, { recursive: true });
    for (const file of fs.readdirSync(srcD)) {
      fs.copyFileSync(path.join(srcD, file), path.join(dstD, file));
      copied++;
    }
  }

  // Warna latar belakang adaptive icon sepadan dengan papan PCB ungu logo
  const bgXmlPath = path.join(resDir, 'values', 'ic_launcher_background.xml');
  fs.mkdirSync(path.dirname(bgXmlPath), { recursive: true });
  const bgXml = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#543472</color>\n</resources>\n`;
  fs.writeFileSync(bgXmlPath, bgXml, 'utf8');

  console.log(`✅ Logo ElectroScanPro berjaya dipasang (${copied} fail mipmap + adaptive background).`);
} else {
  console.warn('⚠️ Folder android-icons atau android res tidak dijumpai.');
}
