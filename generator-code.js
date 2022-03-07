
const { readFile, writeFile } = require('fs').promises;
const { getPathJoin, getBodyPath } = require('./utils');

const { genrateByKeyObject } = require('./generator-utils');
const { recource, projectStructure, direcotiresOfProject } = require('./constants')

const generateCode = async (pathFromFile, fileName) => {
    const configConstant = await readFile(getPathJoin(pathFromFile), { type: 'utf8' });
    const sourceCode = JSON.parse(configConstant)['source-code'];
    const fileEntities = Object.keys(sourceCode);
    const codeString = fileEntities.reduce((codeOfFile, actualEntity) => `${codeOfFile} ${genrateByKeyObject[actualEntity](sourceCode[actualEntity])} \n`, '');
    await writeFile(fileName, codeString);
};

const runGeneratorCode = () => {
    try {
    Promise.all(direcotiresOfProject.map(async (dirName) => {
        Promise.all(projectStructure[dirName].map((fileName) => {
            const bodyPath = getBodyPath(dirName, fileName);
            // console.log(`${recource.from}${bodyPath}.json`);
            // console.log(`${recource.to}${bodyPath}.js`);
            generateCode(`${recource.from}${bodyPath}.json`, `${recource.to}${bodyPath}.js`)
        }));
    }));
} catch(err) {
    console.log(err);
}
};

module.exports = {
    runGeneratorCode
};