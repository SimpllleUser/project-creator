
const { readFile, writeFile } = require('fs').promises;
const { getPathJoin, JSONtoStringJSON } = require('./utils');

const typeOfArguments = {
    "variable": (argument) => argument.name,
    "object": (argument) => JSONtoStringJSON(argument.structure),
}

const getMethodTypes = (types) => types.join(' ');
const getArgumnet = (parameterArgument) => typeOfArguments[parameterArgument.type](parameterArgument);
const getMethodArguments = (types) => types.map((argumentOption) => getArgumnet(argumentOption)).join(',');
const getResultOfMethod = (resultTo) => {
    if (!resultTo) return 'return';
    const { variable } = resultTo;
    return` ${variable.type} ${variable.name} = `; 
};

const generateCallMethodFromModel = ({ name, method }) => {
    return `${getResultOfMethod(method.resultTo)}` +
     ` ${getMethodTypes(method.types)}`+
     ` database.${name}.${method.name}`+
     `(${getMethodArguments(method.params)});`;
};

const tryCatchWrapper = (code) => `try {
        ${code}
    } catch(error) { 
        throw error
    }
` 

const generateServiceMethod = ({
    name,
    types,
    params,
    model }) => {
    return `
    ${getMethodTypes(types)} ${name}(${getMethodArguments(params)}) {
        ${tryCatchWrapper(generateCallMethodFromModel(model))}}`;
}

(async () => {

    const serviceFile = await readFile(getPathJoin('/src/services/UserService.json'));
    const serviceJSON = JSON.parse(serviceFile);
    const { service } = serviceJSON['source-code'];
    const [getAll, addOne, updateOne] = service;
    console.log(generateServiceMethod(updateOne));
})()