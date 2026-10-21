function App() {
    const linkJuridico = import.meta.env.VITE_LINK_JURIDICO || "#"
    const linkFinanceiro = import.meta.env.VITE_LINK_FINANCEIRO || "#"
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-800">
      
      {/* 1. CABEÇALHO DO PAINEL */}
      

      {/* 2. QUADRO DE RESUMO (Mesma lógica do seu exemplo, mas com 'gap-4' para dar espaço) */}
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

      {/* 3. ÁREA PRINCIPAL: 2 COLUNAS (Esquerda: Documentos | Direita: Automações) */}
      <div className="flex flex-col gap-6 md:flex-row">
        
        {/* COLUNA 1: CENTRAL DE DOCUMENTAÇÕES */}
        <section className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            📁 Documentações e Acessos
          </h2>

          <div className="flex flex-col gap-3">
            

            {/* Item de Documento 3 */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100">
              <div>
                <p className="font-semibold text-slate-700">Planilha de Fluxo de Caixa</p>
                <span className="text-xs text-purple-600">Financeiro • Google Sheets</span>
              </div>
              <a
                href="#"
                className="rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
              >
                Abrir
              </a>
            </div>
          </div>
        </section>

        {/* COLUNA 2: GATILHOS DE AUTOMAÇÃO */}
        <section className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            ⚡ Automações da Diretoria
          </h2>

          <div className="flex flex-col gap-3">
            {/* Card de Automação 1 */}
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-slate-700">Gerar Contrato em PDF</p>
                <p className="text-xs text-slate-500">
                  Preencher a minuta com os dados do cliente e salva no Drive
                </p>
              </div>
              <div className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                Gerar contrato
              </div>
            </div>

            {/* Card de Automação 2 */}
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-slate-700">Verificar Inadimplência</p>
                <p className="text-xs text-slate-500">
                  Checa boletos vencidos na planilha e avisa a diretoria
                </p>
              </div>
              <button
                onClick={() => alert("Futuro gatilho: Verificar Boletos")}
                className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                Executar
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default App