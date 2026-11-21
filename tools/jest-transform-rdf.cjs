const ts = require('typescript');

module.exports = {
    process(source, fileName) {
        const { outputText, sourceMapText } = ts.transpileModule(source, {
            fileName,
            compilerOptions: {
                allowJs: true,
                esModuleInterop: true,
                module: ts.ModuleKind.CommonJS,
                sourceMap: true,
                target: ts.ScriptTarget.ES2021,
            },
        });

        return { code: outputText, map: sourceMapText };
    },
};
