import { useState } from 'react'

function TaskForm({ onAddTask, onCancel }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    onAddTask(trimmedTitle)
    setTitle('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <label
        htmlFor="task-title"
        className="mb-2 block text-sm font-medium text-zinc-700"
      >
        Título da tarefa
      </label>

      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ex: Estudar React"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
        autoFocus
      />

      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Adicionar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default TaskForm