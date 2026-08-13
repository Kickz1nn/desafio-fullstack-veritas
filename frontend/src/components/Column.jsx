import TaskCard from './TaskCard'

function Column({ title, status, tasks, onEdit, onMove, onDelete }) {
  const columnTasks = tasks.filter((task) => task.status === status)

  return (
    <section className="min-h[450px] rounded-xl border border-zinc-200 bg-zinc-100 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-zinc-800">
          {title}
        </h2>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-zinc-500">
          {columnTasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}

export default Column