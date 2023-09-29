const { v4: uuidv4 } = require('uuid');
const {
  readFile,
  writeFile,
  sortBy,
  filepath,
} = require('../helpers/fileOperations');
const formatDate = require('../helpers/dateConverter');
const catchError = require('../helpers/catchError');

exports.getTasks = catchError((req, res) => {
  if (Object.keys(req.query).length !== 0) {
    const { completed, date } = req.query;
    let filteredTask = [];
    if (completed && date) {
      filteredTask = sortBy(
        req.jsonData.tasks.filter(
          (task) => task.completed === (completed === 'true')
        ),
        date
      );
    } else if (completed) {
      filteredTask = req.jsonData.tasks.filter(
        (task) => task.completed === (completed === 'true')
      );
    } else if (date) {
      filteredTask = sortBy(req.jsonData.tasks, date);
    }
    res.sendSuccess(filteredTask, '', 200);
    return;
  }
  res.sendSuccess(req.jsonData, '', 200);
});

exports.getTaskById = catchError((req, res) => {
  const taskId = req.params.taskId;
  const filteredTask = req.jsonData.tasks.find((item) => item.id === taskId);

  if (filteredTask) {
    res.sendSuccess(filteredTask, 'retrieved succesfully', 200);
    return;
  }
  res.sendSuccess([], 'No Data Found', 200);
});

exports.getTaskByPriority = catchError((req, res) => {
  const taskPriority = req.params.level;
  const filteredTask = req.jsonData.tasks.filter(
    (item) => item.priority.toLowerCase() === taskPriority.toLowerCase()
  );

  if (filteredTask) {
    res.sendSuccess(filteredTask, 'retrieved succesfully', 200);
    return;
  }
  res.sendSuccess([], 'No Data Found', 200);
});

exports.createTask = catchError(async (req, res) => {
  const payload = req.body;
  const date = formatDate(new Date());
  req.jsonData.tasks.push({ id: uuidv4(), ...payload, date });
  await writeFile(filepath, JSON.stringify(req.jsonData));

  res.sendSuccess(null, 'created succesfully', 201);
});

exports.updateTaskById = catchError(async (req, res) => {
  const taskId = req.params.taskId;
  const payload = req.body;
  const date = formatDate(new Date());

  req.jsonData.tasks.forEach((item) => {
    if (item.id === taskId) {
      Object.assign(item, { ...payload, date });
    }
  });

  await writeFile(filepath, JSON.stringify(req.jsonData));

  res.sendSuccess(null, 'updated succesfully', 200);
});

exports.deleteTask = catchError(async (req, res) => {
  const taskId = req.params.taskId;
  let resource = {};

  resource.tasks = req.jsonData.tasks.filter((item) => item.id !== taskId);
  console.log('resource.tasks', resource);

  await writeFile(filepath, JSON.stringify(resource));

  res.sendSuccess(null, 'deleted succesfully', 200);
});
