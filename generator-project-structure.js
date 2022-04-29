const dirTree = require("directory-tree");
const { getPathJoin } = require('./utils');

const recource = {
    from: './src',
    to: '_project',
};

const getProjectStructure = () => {
    const filesStructure = dirTree(recource.from);
    console.log(filesStructure);
    const getFileNameFromDirectory = ({ name }) => name.split('.')[0];
    return filesStructure.children.reduce((acc,  curr) => {
        const existChildren = curr?.children?.length;
        const key = existChildren ? curr.name : 'is-src';
        const filesDirectory = existChildren ? curr.children.map(getFileNameFromDirectory) : [curr.name.split('.')[0]];
        return {...acc, ...{ [key]: filesDirectory }};
    }, {});
};

const projectStructure = getProjectStructure();
const direcotiresOfProject = Object.keys(projectStructure);
const recourceFromPath = getPathJoin(`/${recource.to}`);

module.exports = {
    recource,
    recourceFromPath,
    projectStructure,
    direcotiresOfProject,
};