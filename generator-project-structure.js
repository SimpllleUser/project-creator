const { getPathJoin } = require('./utils');

const recource = {
    from: './src',
    to: '_project',
};

const projectStructure = {
    'is-src': ['app'],
    config: ['config', 'constants'],
    db: ['config', 'index'],
    utils: ['AuthUtils', 'Logger', 'Utils'],
    models: ['User'],
    services: ['UserService'],
    routes: ['UserRoutes', 'AuthRoutes'],
    controllers: ['UserController', 'AuthController'],

};

const direcotiresOfProject = Object.keys(projectStructure);
const recourceFromPath = getPathJoin(`/${recource.to}`);

module.exports = {
    recource,
    recourceFromPath,
    projectStructure,
    direcotiresOfProject,
};