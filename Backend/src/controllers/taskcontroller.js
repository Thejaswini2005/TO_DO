const Task = require('../models/taskmodel');

const createTask = async (req, res) => {

    try {

        const tasks = req.body;

        const newTasks = await Task.insertMany(tasks);

        res.status(201).json(newTasks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};


const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                error: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, completed } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                title,
                completed
            },
            {
                new: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                error: 'Task not found'
            });
        }

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};
module.exports = {
    createTask,
    getTasks,
    deleteTask,
    updateTask
};