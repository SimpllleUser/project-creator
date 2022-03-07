const { getPathJoin } = require('./utils');

const recource = {
    from: './src',
    to: '_project',
};

const projectStructure = {
    config: ['config', 'constants'],
    db: ['config', 'index'],

};

const direcotiresOfProject = Object.keys(projectStructure);
const recourceFromPath = getPathJoin(`/${recource.to}`);

module.exports = {
    recource,
    recourceFromPath,
    projectStructure,
    direcotiresOfProject,
};