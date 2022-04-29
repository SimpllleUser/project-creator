const fs = require('fs-extra');
const { getPathJoin } = require('./utils');

const generateDB = async ({ title }) => {
  const pathDbFrom = './static/db.sqlite';
  try {
    console.log();
    await fs.copyFile(pathDbFrom, `${getPathJoin(`/${title}`)}/db/database.sqlite`)
  } catch (err) {
    console.error(err)
  }
};

module.exports = {
  generateDB,
};