import { RequestHandler } from 'express';
import Todo from '../models/Todo';

export const getAllTodos: RequestHandler = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = await Todo.create({ title, description });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateTodo: RequestHandler = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update todo properties
    todo.title = title || todo.title;
    todo.description = description || todo.description;

    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteTodo: RequestHandler = async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
