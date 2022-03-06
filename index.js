const { generateProjectDirs } = require('./generator-dirs');
const { runGeneratorCode } = require('./generator-code');

(async () => {
    await generateProjectDirs();
    await runGeneratorCode();
})();