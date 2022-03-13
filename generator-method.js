const { generateCondition } = require('./condition');
const { 
    generateCallMethodFromModel,
    generateCallMethodFromService,
    getMethodArguments,
    getMethodTypes,
    tryCatchWrapper,
    controllerTryCatchWrapper } = require('./method-utils');

const typeGeneratesCode = {
    "conditions": generateCondition,
    "model": generateCallMethodFromModel,
    "service": generateCallMethodFromService,
};

const generateServiceMethod = ({
    name,
    types,
    params,
    actions }) => {
    const calledActions = actions
        .map((action) => typeGeneratesCode[action.type](action[action.type]))
        .join('');
return `
    ${getMethodTypes(types)} ${name}(${getMethodArguments(params)}) {
        ${tryCatchWrapper(calledActions)}}`;
}
const generateControllerMethod = ({
    name,
    types,
    params,
    actions }) => {
    const calledActions = actions
        .map((action) => typeGeneratesCode[action.type](action[action.type]))
        .join('');
return `
    ${getMethodTypes(types)} ${name}(${getMethodArguments(params)}) {
        ${controllerTryCatchWrapper(calledActions)}}`;
}

module.exports = {
    generateServiceMethod,
    generateControllerMethod
};