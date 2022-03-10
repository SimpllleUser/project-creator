
const { readFile, writeFile } = require('fs').promises;
const { getPathJoin, JSONtoStringJSON } = require('./utils');
const { generateCondition } = require('./condition');
const { generateCallMethodFromModel, getMethodArguments, getMethodTypes } = require('./generator-method-utils');


const tryCatchWrapper = (code) => `try {
        ${code}
    } catch(error) { 
        throw error
    }
`;

const typeGeneratesCode = {
    "conditions": generateCondition,
    "model": generateCallMethodFromModel,
};

const generateServiceMethod = ({
    name,
    types,
    params,
    actions }) => {
    const calledActions = actions
        .map((action) => typeGeneratesCode[action.type](action[action.type]) )
        .join(''); 
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