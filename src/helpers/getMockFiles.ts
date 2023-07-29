import fs from 'fs';
import path from 'path';

const dataFolderPath = path.join(__dirname, '../../data');

function isJSONFile(file: string): boolean {
  return path.extname(file).toLowerCase() === '.json';
}

export function getMockFiles(): string[] {
  try {
    const files = fs.readdirSync(dataFolderPath);

    const jsonFiles = files.filter(isJSONFile);

    return jsonFiles;
  } catch (err) {
    console.error('Error reading data folder:', err);

    return [];
  }
}
