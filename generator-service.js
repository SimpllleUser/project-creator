const { generateServiceMethod } = require('./generator-method');

const getServiceMethods = (methods) => methods.map((method) => generateServiceMethod(method)).join('\n');

const generateService = ({ name, methods }) => {
    const serviceMethods = getServiceMethods(methods);
    return  `
        import database from '../db';
        class ${name}{
            ${serviceMethods}
        }
        module.exports = ${name};

    `;
};

module.exports = {
    generateService
};