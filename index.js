const { generateProjectDirs } = require('./generator-dirs');
const { runGeneratorCode } = require('./generator-code');

const generatorMethods = [generateProjectDirs, runGeneratorCode]; 
const runGenerateProjectByName = (name) => Promise.all(generatorMethods.map(async (method) => await method(name)));

(async () => {
    const title = 'some222';
    await runGenerateProjectByName(title);
})();

module.exports = {
    runGenerateProjectByName,
}