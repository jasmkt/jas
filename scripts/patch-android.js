const fs = require("fs");
const path = require("path");

const manifestPath = path.join("android", "app", "src", "main", "AndroidManifest.xml");
if (!fs.existsSync(manifestPath)) {
  console.error("AndroidManifest.xml not found at", manifestPath);
  process.exit(1);
}

let xml = fs.readFileSync(manifestPath, "utf8");

const permissions = [
  '<uses-permission android:name="android.permission.INTERNET" />',
  '<uses-permission android:name="android.permission.CAMERA" />',
  '<uses-permission android:name="android.permission.RECORD_AUDIO" />',
  '<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />',
  '<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />',
  '<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />',
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />',
  '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />',
  '<uses-feature android:name="android.hardware.camera" android:required="false" />',
  '<uses-feature android:name="android.hardware.microphone" android:required="false" />'
];

for (const perm of permissions) {
  const nameMatch = perm.match(/android:name="([^"]+)"/);
  if (nameMatch && !xml.includes(nameMatch[1])) {
    xml = xml.replace("<application", `    ${perm}\n\n    <application`);
  }
}

if (!xml.includes("android:usesCleartextTraffic")) {
  xml = xml.replace("<application", '<application android:usesCleartextTraffic="true"');
}

fs.writeFileSync(manifestPath, xml, "utf8");
console.log("AndroidManifest.xml patched successfully with Camera, Mic, Internet & Gallery permissions.");
