const { getMkdirPath } = require('./utils');
const { recourceFromPath, direcotiresOfProject } = require('./constants');
const { mkdirs } = require('fs-extra');

const generateProjectDirs = async () => {
    await mkdirs(recourceFromPath);
    Promise.all(direcotiresOfProject.map( async (dirName) => {
        const dirPath  = getMkdirPath(recourceFromPath,dirName);
        if (!dirPath) return;
        await mkdirs(dirPath);
    }));
};

module.exports = {
    generateProjectDirs
};