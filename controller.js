const { readFile, writeFile } = require('fs').promises;
const { generateCallMethodFromService } = require('./method-utils');
// const { getPathJoin, getBodyPath } = require('./utils');


(async () => {
    const fileControllerJSON = await readFile('./src//controllers/UserController.json');
    const { name, methods } = JSON.parse(fileControllerJSON)['source-code'].controller;
    const [ getAll ] = methods;
    console.log(generateCallMethodFromService(getAll.actions[0].model));
})()