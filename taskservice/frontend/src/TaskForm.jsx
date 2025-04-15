import { useState } from 'react';

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const res = await fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false })
        });

        if (res.ok) {
            const task = await res.json();
            onTaskAdded(task);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                placeholder="Nouvelle tâche"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default TaskForm;