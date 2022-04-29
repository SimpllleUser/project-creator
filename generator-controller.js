const { generateControllerMethod } = require('./generator-method');

const getControllerMethods = (methods) => methods.map((method) => generateControllerMethod(method)).join('\n');

const generateController = ({ name, methods }) => {
    const controllerMethods = getControllerMethods(methods);
    return  `
        class ${name}{
            ${controllerMethods}
        }
        module.exports = ${name};`;
};

module.exports = {
    generateController
};