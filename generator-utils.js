const { JSONtoStringJSON, arrayToLinesCode } = require('./utils');
const generateImports = arrayToLinesCode;
const generateInitImports = generateImports;
const generateModuleExport = (json) => `export default ${JSONtoStringJSON(json)};`;
const generateStaticCode = (string) => `${string}`;

const genrateByKeyObject = {
    'imports': generateImports,
    'init-module': generateImports,
    'export-default': generateModuleExport,
    'static-code': generateStaticCode,
    'app-use': generateImports,
    'constants': generateImports,
    'route-modules': generateImports,
};

module.exports = {
    generateImports,
    generateInitImports,
    generateModuleExport,
    genrateByKeyObject,
};