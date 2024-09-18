//@ts-check
import fs from 'fs';
import path from 'path';

// Define paths
const distDir = './dist';
const typesFile = path.join(distDir, 'types.d.ts');
const indexTsFile = path.join(distDir, 'index.d.ts');
const modulesDir = path.join(distDir, 'lib', 'modules');
const indexJsFile = path.join(modulesDir, 'index.js');

// Check if the directories exist
if (!fs.existsSync(distDir) || !fs.existsSync(modulesDir)) {
    throw new Error('Required directories do not exist');
}

// Collect .d.ts files from modules directory
const plugins = fs.readdirSync(modulesDir).filter(f => f !== 'index');
let types = '';
types = plugins.filter(module => module.endsWith('.d.ts'))
    .map(module => `import "./lib/modules/${module}"`)
    .join('\n') + '\n' + types;

// Write types.d.ts file
fs.writeFileSync(typesFile, types, 'utf8');

// Read and prepend import statement to index.d.ts
let indexTs = fs.readFileSync(indexTsFile, 'utf8');
indexTs = `import './types';\n` + indexTs;
fs.writeFileSync(indexTsFile, indexTs, 'utf8');

// Collect .js files from modules directory and create the exports
const modules = fs.readdirSync(modulesDir)
    .filter(f => f !== 'index' && f.endsWith('.js'))
    .map(f => f.replace('.js', ''));
const modulesReqLines = modules.map(m => `'${m}': require('./${m}')`).join(',\n');
const modulesFileJs = `
module.exports = {
    builtinPlugins: {
        ${modulesReqLines}
    }
};
`;

// Write index.js file
fs.writeFileSync(indexJsFile, modulesFileJs, 'utf8');
