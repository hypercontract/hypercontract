const { cpSync, statSync } = require('node:fs');
const { resolve } = require('node:path');

for (const app of process.argv.slice(2)) {
    const appDir = resolve(__dirname, '..', 'apps', app);
    cpSync(resolve(appDir, 'src/assets'), resolve(appDir, 'dist/assets'), { recursive: true });

    if (app === 'hypershop') {
        cpSync(resolve(appDir, 'src/app'), resolve(appDir, 'dist/app'), {
            recursive: true,
            filter: (source) => statSync(source).isDirectory() || source.endsWith('.ejs'),
        });
    }
}
