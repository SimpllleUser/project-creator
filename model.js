const { readFile, writeFile } = require('fs').promises;
const { getPathJoin, JSONtoStringJSON } = require('./utils');

const getFiledParams = (fieldParmas) => ({
    ...fieldParmas,
    type: `DataTypes.${fieldParmas.type}`,
});

(async () => {
    const ModelUserJSON = await readFile(getPathJoin('/src/models/User.json'), { type: 'utf8' });
    const modelUserConfig = JSON.parse(ModelUserJSON)['source-code'];
    const fieldKeys = Object.keys(modelUserConfig.fields);

    const structureModelFields = fieldKeys.reduce((fields, filedName) => ({
         ...fields,
         [filedName]: getFiledParams(modelUserConfig.fields[filedName])
         }), {});
    const UserModelBody = `
    module.exports = (sequelize, DataTypes) => {
        const ${modelUserConfig.model.name} = sequelize.define(${modelUserConfig.model.name},
            ${JSONtoStringJSON(structureModelFields)},
            ${JSONtoStringJSON(modelUserConfig['table-params'])});
            ${modelUserConfig.model.name}.associate = function (models) {}

            return ${modelUserConfig.model.name};
    }`;
    await writeFile('UserModelBody.js', UserModelBody);
})();