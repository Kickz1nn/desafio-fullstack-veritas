import KanbanBoard from './components/KanbanBoard'

function App() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Mini Kanban
          </h1>

          <p className="mt-2 text-zinc-500">
            Organize suas tarefas de forma simples.
          </p>
        </header>

        <KanbanBoard />
      </div>
    </main>
  )
}

export default App