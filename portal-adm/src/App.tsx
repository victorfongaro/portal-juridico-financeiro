import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Documents from './components/Documents'
import AutomationContract from './components/AutomationContract'
import AutomationInadimplencia from './components/AutomationInadimplencia'

function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-800">
      
      {/* 1. CABEÇALHO DO PAINEL */}
      <Header/>

      {/* 2. QUADRO DE RESUMO */}
      <Dashboard/>

      {/* 3. ÁREA PRINCIPAL: 2 COLUNAS (Esquerda: Documentos | Direita: Automações) */}
      <div className="flex flex-col gap-6 md:flex-row">
        
        {/* COLUNA 1: CENTRAL DE DOCUMENTAÇÕES */}
        <Documents/>

        {/* COLUNA 2: GATILHOS DE AUTOMAÇÃO */}
        <section className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            ⚡ Automações da Diretoria
          </h2>

          <div className="flex flex-col gap-3">
            {/* Card de Automação 1 */}
            <AutomationContract/>

            {/* Card de Automação 2 */}
            <AutomationInadimplencia/>

          </div>
        </section>

      </div>
    </main>
  )
}

export default App