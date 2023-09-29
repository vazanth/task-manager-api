const fsPromises = require('fs/promises');
const path = require('path');

exports.filepath = path.join(__dirname, '..', 'tasks.json');

exports.readFile = async (filepath) => {
  return JSON.parse(
    await fsPromises.readFile(filepath, {
      encoding: 'utf-8',
      flag: 'r',
    })
  );
};

exports.writeFile = async (filepath, resource) => {
  await fsPromises.writeFile(filepath, resource, {
    encoding: 'utf-8',
    flag: 'w',
  });
};

exports.sortBy = (target, sort) => {
  return target.sort((a, b) => {
    if (sort === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sort === 'desc') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return 0;
    }
  });
};
