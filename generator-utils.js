const { JSONtoStringJSON, arrayToLinesCode } = require('./utils');
const { generateModel } = require('./generator-model');
const { generateService } = require('./generator-service');
const { gereneateRouters } = require('./generator-router');
const { generateController } = require('./generator-controller');

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
    'model': generateModel,
    'service': generateService,
    'routers': gereneateRouters,
    'controller': generateController,

};

module.exports = {
    generateImports,
    generateInitImports,
    generateModuleExport,
    genrateByKeyObject,
};