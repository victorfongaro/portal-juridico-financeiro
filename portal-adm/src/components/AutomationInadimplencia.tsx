function AutomationInadimplencia (){
    return (
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
    )
}

export default AutomationInadimplencia