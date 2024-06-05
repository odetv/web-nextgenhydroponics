const fs = require("fs");
const path = require("path");

// Path to the exported HTML files
const exportPath = path.resolve(__dirname, "out");

// Function to modify asset URLs in HTML files
function modifyAssetUrls(file) {
  const filePath = path.join(exportPath, file);
  const html = fs.readFileSync(filePath, "utf8");
  const modifiedHtml = html.replace(
    /(href|src)=("|')(\/_next\/)/g,
    "$1=$2./$3"
  );
  fs.writeFileSync(filePath, modifiedHtml);
}

// Iterate through HTML files in the export directory and modify asset URLs
fs.readdirSync(exportPath).forEach((file) => {
  if (file.endsWith(".html")) {
    modifyAssetUrls(file);
  }
});
