// import React from 'react'
import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
   
	return (
        <>
            {tasks.map((task) => (
            <Task key={task.id} onDelete={onDelete} task={task} onToggle={onToggle}/>)
            )}
        </>
    )
};

export default Tasks;
