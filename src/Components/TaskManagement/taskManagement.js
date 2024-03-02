import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './taskManagement.css';
import { useNavigate } from 'react-router-dom';

const TaskManagement = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: '',
        userId: user.user_id
    });
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({
        id: '',
        title: '',
        description: '',
        dueDate: '',
        status: '',
        userId: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, [token]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async () => {
        console.log(newTask);
        try {
            await axios.post('http://localhost:8000/tasks', newTask);
            fetchTasks();
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
                status: '',
                userId: ''
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleEditTask = async () => {
        try {
            await axios.put(`http://localhost:8000/tasks/${editedTask.id}`, editedTask);
            fetchTasks();
            setEditTaskId(null);
            setEditedTask({
                id: '',
                title: '',
                description: '',
                dueDate: '',
                status: '',
                userId: ''
            });
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditedTask({ ...task });
    };

    const handleLogout = () => {
        // Clear user data and token from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className="task-management-container">
            <h1>Task Management</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="add-task-container">
                <h2>Add New Task</h2>
                <div className="input-group">
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Description"
                    />
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        placeholder="Due Date"
                    />
                    <input
                        type="text"
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        placeholder="Status"
                    />
                    <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
            <div className="tasks-container">
                <h2>Tasks</h2>
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task.id} className="task-item">
                            {editTaskId === task.id ? (
                                <>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            value={editedTask.title}
                                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                            placeholder="Title"
                                        />
                                        <input
                                            type="text"
                                            value={editedTask.description}
                                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                            placeholder="Description"
                                        />
                                        <input
                                            type="date"
                                            value={editedTask.dueDate}
                                            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                                            placeholder="Due Date"
                                        />
                                        <input
                                            type="text"
                                            value={editedTask.status}
                                            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                                            placeholder="Status"
                                        />
                                        <input
                                            type="text"
                                            value={editedTask.userId}
                                            onChange={(e) => setEditedTask({ ...editedTask, userId: e.target.value })}
                                            placeholder="User ID"
                                        />
                                        <button className="save-task-button" onClick={handleEditTask}>Save</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="task-details">
                                        <span><strong>Title:</strong> {task.title}</span>
                                        <span><strong>Description:</strong> {task.description}</span>
                                        <span><strong>Due Date:</strong> {task.due_date}</span>
                                        <span><strong>Status:</strong> {task.status}</span>
                                        <span><strong>User ID:</strong> {task.user_id}</span>
                                    </div>
                                    <div className="task-actions">
                                        <button className="edit-task-button" onClick={() => handleEditClick(task)}>Edit</button>
                                        <button className="delete-task-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskManagement;
