const getImport = ({ type, name }) => {
    const typesByPath = {
        'global': '',
        'service': 'services',
        'controller': 'controllers',
        'database': 'db',
        'model': 'models',
        'route': 'routes',
        'util': 'utils',
    };
    if (type === 'global') return `const ${name} = require("${name}");`
    return `const ${name} = require("../${typesByPath[type]}/${name}")`;
};

const generateImports = (imports) => {
    return imports.map(getImport).join(';\n');
};

module.exports = {
    generateImports,
};
