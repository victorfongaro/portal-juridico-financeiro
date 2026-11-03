import { Link } from 'react-router-dom';

function AutomationContract (){
    return (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-purple-900">Gerar Contrato em PDF</p>
                <p className="text-xs text-purple-600">
                  Preencher a minuta com os dados do cliente e salva no Drive
                </p>
              </div>
              <Link to={'/portal-juridico-financeiro/gerar-contrato'}>
                <div className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                  Gerar contrato
                </div>
              </Link>
            </div>
    )
}

export default AutomationContract