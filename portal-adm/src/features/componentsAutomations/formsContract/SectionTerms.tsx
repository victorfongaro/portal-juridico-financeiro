import React from 'react';
import { ContractData } from './types';
import { maskCurrency } from './utils';

interface SectionTermsProps {
  data: ContractData;
  onChange: (field: keyof ContractData, val: string) => void;
}

export const SectionTerms: React.FC<SectionTermsProps> = ({ data, onChange }) => (
  <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900 space-y-3">
    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">3. Parâmetros do Contrato e Foro</h3>
    
    <div>
      <label className="text-xs text-neutral-500 font-medium">Título do Documento</label>
      <input
        className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        value={data.contractTitle}
        onChange={(e) => onChange('contractTitle', e.target.value)}
        placeholder="CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE TI"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="text-xs text-neutral-500 font-medium">Valor Total</label>
        <input
          className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          value={data.contractValue}
          onChange={(e) => onChange('contractValue', maskCurrency(e.target.value))}
          placeholder="R$ 0,00"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 font-medium">Data de Início</label>
        <input
          type="date"
          className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          value={data.startDate}
          onChange={(e) => onChange('startDate', e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 font-medium">Data de Término</label>
        <input
          type="date"
          className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          value={data.endDate}
          onChange={(e) => onChange('endDate', e.target.value)}
        />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <label className="text-xs text-neutral-500 font-medium">Comarca do Foro (Cidade)</label>
        <input
          className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          value={data.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="Medianeira"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-500 font-medium">UF</label>
        <input
          className="w-full h-9 border rounded-md px-3 text-sm uppercase dark:bg-neutral-800 dark:border-neutral-700"
          maxLength={2}
          value={data.state}
          onChange={(e) => onChange('state', e.target.value.toUpperCase())}
          placeholder="PR"
        />
      </div>
    </div>
  </div>
);