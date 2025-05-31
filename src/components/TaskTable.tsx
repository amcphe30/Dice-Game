import { useState } from 'react';

interface PriorityDetail {
  label: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  priority: PriorityDetail;
  dod: string;
}

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const priorities: PriorityDetail[] = [
    {
      label: "Must Do",
      color: "#ff5722"
    },
    {
      label: "Should Do",
      color: "#ff9800"
    },
    {
      label: "Want To Do",
      color: "#ffc107"
    }
  ];
  const [priority, setPriority] = useState<PriorityDetail>(priorities[0]);
  const [dod, setDod] = useState('');
  
  const addTask = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      priority,
      dod: dod.trim(),
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);
    console.log(tasks);
    setTitle('');
    setDod('');
    setPriority(priorities[0]);
  };

  return (
    <div>
      <div style={{ marginBottom: 20, display:"flex", flexDirection:"column"}}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ margin: 10, maxWidth: "100px"}}
        />
        <input
          placeholder="DOD"
          value={dod}
          onChange={e => setDod(e.target.value)}
          style={{ margin: 10, maxWidth: "100px" }}
        />
        <select
          value={priority.label}
          onChange={e => {
          const selected = priorities.find(p => p.label === e.target.value);
          if (selected) setPriority(selected);
          }}
          style={{ margin: 10, maxWidth: "100px" }}
        >
          {priorities.map(p => (
            <option key={p.label} value={p.label}>{p.label}</option>
          ))}
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {priorities.map(p => (
          <div key={p.label} style={{ flex: 1, padding: 10, minWidth: "200px",textAlign: "left", backgroundColor: p.color + "33" }}>
            <h3 style={{backgroundColor: p.color + 99, padding: 3 }}>{p.label}</h3>
            <ul style={{ listStyleType: "none", padding: 2 }}>
              {tasks
                .filter(task => task.priority.label === p.label)
                .map(task => (
                  <li key={task.id} style={{ padding: 5, backgroundColor: "#ffffff", marginBottom: "8px"}}>
                    <strong>{task.title}</strong> - {task.dod}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
