function TaskCard({ task, onEdit, onMove, onDelete }) {
  const statuses = {
    todo: {
      previous: null,
      next: "in_progress",
    },
    in_progress: {
      previous: "todo",
      next: "done",
    },
    done: {
      previous: "in_progress",
      next: null,
    },
  };

  const currentStatus = statuses[task.status];

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-zinc-800">
          {task.title}
        </h3>

        <button
          onClick={() => onEdit(task)}
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Excluir
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={!currentStatus.previous}
          onClick={() => onMove(task, currentStatus.previous)}
          className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>

        <button
          disabled={!currentStatus.next}
          onClick={() => onMove(task, currentStatus.next)}
          className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>
    </article>
  )
}

export default TaskCard