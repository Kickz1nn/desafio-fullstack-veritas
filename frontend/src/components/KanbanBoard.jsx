import { useState, useEffect } from "react";
import { createTask, getTasks } from "../services/api";
import Column from "./Column";
import TaskForm from "./TaskForm";

function KanbanBoard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar React",
      status: "todo",
    },
    {
      id: 2,
      title: "Criar API em Go",
      status: "in_progress",
    },
    {
      id: 3,
      title: "Configurar projeto",
      status: "done",
    },
  ]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTasks();
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');

  const columns = [
    {
      title: "A Fazer",
      status: "todo",
    },
    {
      title: "Em Progresso",
      status: "in_progress",
    },
    {
      title: "Concluídas",
      status: "done",
    },
  ];

  async function handleAddTask(title) {
    try {
      const newTask = await createTask({
        title,
        status: "todo"
      });
      setTasks((currentTasks) => [...currentTasks, newTask]);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
      setError('Erro ao criar tarefa. Por favor, tente novamente.');
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsFormOpen(true)}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
        >
          + Nova tarefa
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isFormOpen && (
        <TaskForm
          onAddTask={handleAddTask}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks}
          />
        ))}
      </div>
    </>
  );
}

export default KanbanBoard;