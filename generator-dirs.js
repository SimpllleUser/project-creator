const { recourceFromPath, direcotiresOfProject } = require('./constants')
const { mkdirs } = require('fs-extra');

const generateProjectDirs = async () => {
    await mkdirs(recourceFromPath);
    Promise.all(direcotiresOfProject.map( async (dirName) => {
        await mkdirs(`${recourceFromPath}/${dirName}`)
    }));
};

module.exports = {
    generateProjectDirs
};