import React, { useState } from 'react';
import { ContractData } from './formsContract/types';
import { SectionParties } from './formsContract/SectionParties';
import { SectionTerms } from './formsContract/SectionTerms';
import { downloadTexFile, generateLatexTemplate } from './formsContract/latexGenerator';

const INITIAL_DATA: ContractData = {
  contractorName: '',
  contractorDoc: '',
  contractorAddress: '',
  contractorEmail: '',
  contractedName: '',
  contractedDoc: '',
  contractedAddress: '',
  contractTitle: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS',
  contractValue: '',
  startDate: '',
  endDate: '',
  city: 'Medianeira',
  state: 'PR',
};

export const FormsContract: React.FC = () => {
  const [data, setData] = useState<ContractData>(INITIAL_DATA);
  const [showPreview, setShowPreview] = useState(false);

  const handleFieldChange = (field: keyof ContractData, val: string) => {
    setData((prev) => ({ ...prev, [field]: val }));
  };

  const handleDownload = () => {
    if (!data.contractorName || !data.contractedName) {
      alert('Preencha ao menos os nomes das partes antes de exportar.');
      return;
    }
    downloadTexFile(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Gerador de Base de Contrato (.tex)
          </h1>
          <p className="text-xs text-neutral-500">
            Preencha os metadados para exportar o arquivo pronto para compilação LaTeX.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            {showPreview ? 'Ocultar Código' : 'Ver LaTeX'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5 transition"
          >
            Baixar .tex
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <SectionParties data={data} onChange={handleFieldChange} />
        <SectionTerms data={data} onChange={handleFieldChange} />

        {showPreview && (
          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-neutral-100">
            <h4 className="text-xs font-mono uppercase text-neutral-400 mb-2">Pré-visualização do Arquivo LaTeX:</h4>
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre p-2 bg-black/50 rounded">
              {generateLatexTemplate(data)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsContract;