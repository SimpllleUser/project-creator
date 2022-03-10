
const { readFile, writeFile } = require('fs').promises;
const { getPathJoin, JSONtoStringJSON } = require('./utils');
const { generateCallMethodFromModel } = require('./generator-method-utils');


const tryCatchWrapper = (code) => `try {
        ${code}
    } catch(error) { 
        throw error
    }
`;


const generateServiceMethod = ({
    name,
    types,
    params,
    actions }) => {
    const calledActions = actions
        .map(({ model }) => generateCallMethodFromModel(model))
        .join(';'); 
    return `
    ${getMethodTypes(types)} ${name}(${getMethodArguments(params)}) {
        ${tryCatchWrapper(calledActions)}}`;
}

(async () => {

    const serviceFile = await readFile(getPathJoin('/src/services/UserService.json'));
    const serviceJSON = JSON.parse(serviceFile);
    const { service } = serviceJSON['source-code'];
    const [getAll, addOne, updateOne] = service;
    console.log(generateServiceMethod(updateOne));
})()