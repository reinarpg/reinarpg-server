import * as fs from 'fs';
import * as path from 'path';

interface BuiltinPlugins {
  [key: string]: any;
}

const builtinPlugins: BuiltinPlugins = {};

// Get the current directory
const currentDir = __dirname;

// Read all files in the current directory
fs.readdirSync(currentDir).forEach((file: string) => {
  const ext = path.extname(file);
  const fileNameWithoutExtension = file.slice(0, -ext.length);

  // Process .ts files (ignoring .d.ts) and .js files
  if (ext === '.ts' && !file.endsWith('.d.ts') || ext === '.js') {
    try {
      // Dynamically import .ts or .js modules
      builtinPlugins[fileNameWithoutExtension] = require(`./${fileNameWithoutExtension}`);
    } catch (error) {
      console.error(`Failed to load module: ${file}`, error);
    }
  }
});

// Export the builtinPlugins object
export { builtinPlugins };
