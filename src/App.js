import { useState, useEffect, React } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
	const [ showAddTask, setShowAddTask ] = useState(false);
	const [ tasks, setTasks ] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const taskFromServer = await fetchTasks();
			setTasks(taskFromServer);
		};
		getTasks();
	}, []);

	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();

		return data;
	};

	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();
		console.log(data);

		setTasks([ ...tasks, data ]);

		// const id = Math.floor(Math.random() * 10000) + 1;
		// console.log(id);
		// const newTask = { id, ...task };
		// setTasks([ ...tasks, newTask ]);
	};

	// Delete task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		});
		setTasks(tasks.filter((task) => task.id !== id));
	};
	// Toggle reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updatedTask),
		});

		const data = await res.json();

		setTasks(
			tasks.map(
				(task) => (task.id === id ? { ...task, reminder: data.reminder } : task)
			)
		);
	};

	return (
		<div className='container'>
			<Header
				onAdd={() => setShowAddTask(!showAddTask)}
				showAdd={showAddTask}
			/>
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
			) : (
				'No Tasks To Show'
			)}
			<Footer />
		</div>
	);
}

export default App;
