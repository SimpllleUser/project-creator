
const { readFile, writeFile } = require('fs').promises;
const { getPathJoin, JSONtoStringJSON } = require('./utils');
const { generateCondition } = require('./condition');
const { generateCallMethodFromModel,
    getMethodArguments,
    getMethodTypes,
    tryCatchWrapper } = require('./method-utils');

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
        .map((action) => typeGeneratesCode[action.type](action[action.type]))
        .join('');
return `
    ${getMethodTypes(types)} ${name}(${getMethodArguments(params)}) {
        ${tryCatchWrapper(calledActions)}}`;
}

module.exports = {
    generateServiceMethod
};