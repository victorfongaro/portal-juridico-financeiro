function Documents (){
    return (
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
                href="https://docs.google.com/spreadsheets/d/1GHN08lIvJqp-hJXIYzInjr_R5iDzgYxUAjp12TUSYLo/edit?usp=sharing"
                className="rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
              >
                Abrir
              </a>
            </div>
          </div>
        </section>
    )
}

export default Documents