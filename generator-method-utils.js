const { JSONtoStringJSON } = require('./utils');

const typeOfArguments = {
    "variable": (argument) => argument.name,
    "object": (argument) => JSONtoStringJSON(argument.structure),
}

const getArgumnet = (parameterArgument) => typeOfArguments[parameterArgument.type](parameterArgument);
const getMethodTypes = (types) => types.join(' ');
const getMethodArguments = (types) => types.map((argumentOption) => getArgumnet(argumentOption)).join(',');

const generateCallMethodFromModel = ({ name, method }) => {
    return `${getResultOfMethod(method.resultTo)}` +
     ` ${getMethodTypes(method.types)}`+
     ` database.${name}.${method.name}`+
     `(${getMethodArguments(method.params)});`;
};

const getResultOfMethod = (resultTo) => {
    if (!resultTo) return 'return';
    const { variable } = resultTo;
    return` ${variable.type} ${variable.name} = `; 
};

module.exports = {
    generateCallMethodFromModel,
    getMethodArguments,
    getMethodTypes,
}