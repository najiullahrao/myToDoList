'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskBillable, setNewTaskBillable] = useState(true);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [user, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        for (const id in updated) {
          if (updated[id].isRunning) {
            updated[id].time += 1;
          }
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddTask = async () => {
    if (!newTaskName.trim()) return;

    await addDoc(collection(db, 'tasks'), {
      name: newTaskName.trim(),
      userId: user.uid,
      createdAt: serverTimestamp(),
      billable: newTaskBillable,
      startTime: '',
      endTime: '',
      date: newTaskDate,
      timer: 0,
    });

    setNewTaskName('');
    setNewTaskDate('');
    setNewTaskBillable(true);
  };

  const toggleTimer = async (task) => {
    const current = timers[task.id] || { time: task.timer || 0, isRunning: false };
    const isRunning = !current.isRunning;

    const now = new Date();
    const formattedTime = now.toTimeString().slice(0, 5);

    let newStart = task.startTime || formattedTime;
    let newEnd = isRunning ? '' : formattedTime;

    if (isRunning) {
      newStart = formattedTime;
    } else {
      newEnd = formattedTime;
    }

    setTimers((prev) => ({
      ...prev,
      [task.id]: { ...current, isRunning },
    }));

    await updateDoc(doc(db, 'tasks', task.id), {
      timer: current.time,
      startTime: newStart,
      endTime: newEnd,
    });
  };

  const handleNameChange = async (taskId, name) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      name,
    });
  };

  const handleDateChange = async (taskId, date) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      date,
    });
  };

  const handleBillableToggle = async (taskId, currentBillable) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      billable: !currentBillable,
    });
  };

  // For toggling billable in new task input
  const toggleNewTaskBillable = () => {
    setNewTaskBillable((prev) => !prev);
  };

  const formatTime = (sec) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

   // Delete task
  const handleDelete = async (taskId, taskName) => {
    if (confirm(`Are you sure you want to delete task "${taskName}"?`)) {
      await deleteDoc(doc(db, 'tasks', taskId));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Task Dashboard</h1>
        <button
          onClick={() => router.push('/')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      {/* New Task Form */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
          className="flex flex-wrap gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="flex-grow min-w-[200px] border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          {/* Billable toggle button */}
          <button
            type="button"
            onClick={toggleNewTaskBillable}
            className={`text-3xl font-bold transition-colors duration-300 ${
              newTaskBillable ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 hover:text-gray-600'
            }`}
            title={newTaskBillable ? 'Billable task' : 'Non-billable task'}
            aria-label="Toggle billable for new task"
          >
            $
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>
      </section>

      {/* Task List */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600 italic">No tasks found. Add some above!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => {
              const timerState = timers[task.id] || { time: task.timer || 0, isRunning: false };

              return (
                <li
                  key={task.id}
                  className="flex flex-wrap items-center bg-white rounded-lg shadow p-5 space-x-4 space-y-2 sm:space-y-0"
                >
                  {/* Task Name */}
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => handleNameChange(task.id, e.target.value)}
                    className="flex-grow min-w-[150px] border border-gray-300 rounded-md p-2 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    aria-label={`Edit task name for ${task.name}`}
                  />

                  {/* Billable Dollar Sign */}
                  <button
                    onClick={() => handleBillableToggle(task.id, task.billable)}
                    aria-label={`Toggle billable for task ${task.name}`}
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      task.billable ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={task.billable ? 'Billable task' : 'Non-billable task'}
                    type="button"
                  >
                    $
                  </button>

                  {/* Start - End Time */}
                  <div className="text-gray-600 text-sm min-w-[110px] text-center select-none">
                    {task.startTime || '--:--'} - {task.endTime || '--:--'}
                  </div>

                  {/* Date Picker */}
                  <input
                    type="date"
                    value={task.date || ''}
                    onChange={(e) => handleDateChange(task.id, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    aria-label={`Change date for task ${task.name}`}
                  />

                  {/* Timer Display */}
                  <div className="font-mono text-gray-900 text-lg min-w-[90px] text-center select-none">
                    {formatTime(timerState.time)}
                  </div>

                  {/* Timer Button */}
                  <button
                    onClick={() => toggleTimer(task)}
                    className={`text-white px-4 py-2 rounded-md shadow transition select-none ${
                      timerState.isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                    }`}
                    aria-label={timerState.isRunning ? `Stop timer for ${task.name}` : `Start timer for ${task.name}`}
                  >
                    {timerState.isRunning ? 'Stop' : 'Start'}
                  </button>
                   {/* Delete Button */}
              <button
                onClick={() => handleDelete(task.id, task.name)}
                className="text-red-600 hover:text-red-800 ml-2"
                aria-label={`Delete task ${task.name}`}
                title="Delete task"
                type="button"
              >
                <AiOutlineDelete size={24} />
              </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
