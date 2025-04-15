import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        fetch('http://localhost:8080/tasks')
            .then(res => res.json())
            .then(data => setTasks(data));
    };

    const handleTaskAdded = (task) => {
        setTasks(prev => [...prev, task]);
    };

    const toggleTask = async (task) => {
        const updated = { ...task, completed: !task.completed };
        const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        if (res.ok) {
            setTasks(prev =>
                prev.map(t => (t.id === task.id ? updated : t))
            );
        }
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' });
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task)}
                        />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
                        <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;