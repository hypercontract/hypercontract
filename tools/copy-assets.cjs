const { cpSync, statSync } = require('node:fs');
const { resolve } = require('node:path');

for (const app of process.argv.slice(2)) {
    const testBuild = app === 'hypershop-test';
    const appName = testBuild ? 'hypershop' : app;
    const appDir = resolve(__dirname, '..', 'apps', appName);
    const outDir = testBuild ? resolve(__dirname, '../dist/hypershop-test') : resolve(appDir, 'dist');
    cpSync(resolve(appDir, 'src/assets'), resolve(outDir, 'assets'), { recursive: true });

    if (appName === 'hypershop') {
        cpSync(resolve(appDir, 'src/app'), resolve(outDir, 'app'), {
            recursive: true,
            filter: (source) => statSync(source).isDirectory() || source.endsWith('.ejs'),
        });
    }
}
