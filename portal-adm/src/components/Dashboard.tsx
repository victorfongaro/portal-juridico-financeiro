function Dashboard () {
    return (
        <section className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="flex-1 rounded-2xl bg-purple-100 p-4 text-purple-900">
          <p className="text-sm font-medium opacity-80">Documentos automatizados</p>
          <p className="mt-1 text-2xl font-bold">X arquivos</p>
        </div>

        <div className="flex-1 rounded-2xl bg-purple-100 p-4 text-purple-900">
          <p className="text-sm font-medium opacity-80">Contratos Ativos</p>
          <p className="mt-1 text-2xl font-bold">X projeto(s)</p>
        </div>

        <div className="flex-1 rounded-2xl bg-purple-100 p-4 text-purple-900">
          <p className="text-sm font-medium opacity-80">Pendências / Boletos</p>
          <p className="mt-1 text-2xl font-bold">x vencendo</p>
        </div>

        <div className="flex-1 rounded-2xl bg-purple-100 p-4 text-purple-900">
          <p className="text-sm font-medium opacity-80">Automações Prontas</p>
          <p className="mt-1 text-2xl font-bold">0 robôs</p>
        </div>
      </section>
    )
}

export default Dashboard