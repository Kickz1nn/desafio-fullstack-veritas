import { useState, useEffect } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../services/api";
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
  const [editingTask, setEditingTask] = useState(null);

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

  function handleEdit(task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  async function handleUpdateTask(task) {
    try {
      setError('')

      const result = await updateTask(task.id, {
        title: task.title,
        status: task.status,
      })

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === result.id
            ? result
            : currentTask
        )
      )

      setEditingTask(null)
      setIsFormOpen(false)
    } catch (error) {
      console.error(error)
      setError('Não foi possível atualizar a tarefa.')
    }
  }

  async function handleMoveTask(task, newStatus) {
    try {
      setError('')
      
      const result = await updateTask(task.id, {
        title: task.title,
        status: newStatus,
      })

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === result.id
            ? result
            : currentTask
        )
      )
    }
    catch (error) {
      console.error(error)
      setError('Não foi possível mover a tarefa.')
    }
  }

  async function handleDeleteTask(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta tarefa?'
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')

      await deleteTask(id)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      console.error(error)
      setError('Não foi possível excluir a tarefa.')
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
          task={editingTask}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onCancel={() => {
            setEditingTask(null)
            setIsFormOpen(false)
          }}
        />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks}
            onEdit={handleEdit}
            onMove={handleMoveTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </>
  );
}

export default KanbanBoard;