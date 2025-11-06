const Todo = require('../model/todoItem-model')

exports.postTodoItems = async (req, res, next) => {
  const {task, date } = req.body;
  const todoItems = new Todo({
    task: task,
    date: date
  })
  await todoItems.save();
  res.status(201).json(todoItems)
}

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await Todo.find()
  res.json(todoItems)
}

exports.deleteTodoItems = async (req, res, next) => {
  const {id} = req.params;
  await Todo.findByIdAndDelete(id)
  res.status(402).json({_id: id})
}
