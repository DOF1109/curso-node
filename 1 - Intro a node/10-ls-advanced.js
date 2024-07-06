const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

// ?? ---> es nullish
// si el valor de la izq es null o undefined retorna el valor de la der
const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;

  try {
    files = await fs.readdir(folder);
  } catch (e) {
    console.log(pc.red("No se pudo leer el directorio: " + folder));
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath); // info del archivo
    } catch (e) {
      console.error("No se pudo leer el archivo: " + filePath);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "dir" : "file";
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${pc.green(file.padEnd(20))} ${pc.yellow(
      fileSize.toString().padStart(10)
    )} ${pc.blue(fileModified)}`;
  });

  const filesInfo = await Promise.all(filesPromises);

  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
