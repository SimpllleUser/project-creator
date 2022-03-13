const { JSONtoStringJSON } = require('./utils');

const typeOfArguments = {
    "variable": (argument) => argument.name,
    "object": (argument) => JSONtoStringJSON(argument.structure),
}

const getArgumnet = (parameterArgument) => typeOfArguments[parameterArgument.type](parameterArgument);
const getMethodTypes = (types) => types.join(' ');
const getMethodArguments = (types) => types.map((argumentOption) => getArgumnet(argumentOption)).join(',');

// !REFACTOR method like => generateCallMethodFromService !
const generateCallMethodFromModel = ({ name, method }) => {
    return `${getResultOfMethod(method.resultTo)}` +
     ` ${getMethodTypes(method.types)}`+
     ` database.${name}.${method.name}`+
     `(${getMethodArguments(method.params)});`;
};

const generateCallMethodFromService = ({ name, method }) => {
    const result = getResultOfMethod(method.resultTo);
    const type = getMethodTypes(method.types);
    const serviceName = name;
    const serviceMethodName = method.name;
    const args = getMethodArguments(method.params);

    return `${result} ${type} ${serviceName}.${serviceMethodName}(${args})`;
};

const getResultOfMethod = (resultTo) => {
    if (!resultTo) return 'return';
    if (resultTo === 'none') return '';
    const { name, type } = resultTo?.variable;
    return` ${type} ${name} = `; 
};

const tryCatchWrapper = (code) => `try {
    ${code}
} catch(error) { 
    throw error
}`;

const controllerTryCatchWrapper = (code) => `try {
    ${code}
} catch(error) { 
    util.setError(400, error.message);
    return util.send(res);
}`;

module.exports = {
    generateCallMethodFromModel,
    generateCallMethodFromService,
    getMethodArguments,
    getMethodTypes,
    tryCatchWrapper,
    controllerTryCatchWrapper,
}