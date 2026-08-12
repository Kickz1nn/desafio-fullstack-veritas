function TaskCard({ task }) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="font-medium text-zinc-800">
        {task.title}
      </h3>
    </article>
  )
}

export default TaskCard