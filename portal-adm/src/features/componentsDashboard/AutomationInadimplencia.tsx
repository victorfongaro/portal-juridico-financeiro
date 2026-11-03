function AutomationInadimplencia (){
    return (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-purple-900">Verificar Inadimplência</p>
                <p className="text-xs text-purple-600">
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