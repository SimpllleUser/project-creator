const { JSONtoStringJSON, arrayToLinesCode } = require('./utils');
const generateImports = arrayToLinesCode;
const generateInitImports = generateImports;
const generateModuleExport = (json) => `export default ${JSONtoStringJSON(json)};`;

const genrateByKeyObject = {
    'imports': generateImports,
    'init-module': generateImports,
    'export-default': generateModuleExport, 
}

module.exports = {
    generateImports,
    generateInitImports,
    generateModuleExport,
    genrateByKeyObject,
};