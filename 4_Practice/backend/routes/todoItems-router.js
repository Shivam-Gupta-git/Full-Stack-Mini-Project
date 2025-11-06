const express = require('express')
const todoItemsRouter = express.Router()

const todoItemsControllers = require('../controllers/todoItem-controller')

todoItemsRouter.post('/', todoItemsControllers.postTodoItems)
todoItemsRouter.get('/', todoItemsControllers.getTodoItems)
todoItemsRouter.delete('/:id', todoItemsControllers.deleteTodoItems)

exports.todoItemsRouter = todoItemsRouter