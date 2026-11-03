import React from 'react';
import { ContractData } from './types';
import { maskCurrency } from './utils';

interface SectionTermsProps {
  data: ContractData;
  onChange: (field: keyof ContractData, val: string) => void;
}

export const SectionTerms: React.FC<SectionTermsProps> = ({ data, onChange }) => (
  <div className="space-y-3 rounded-xl border border-purple-200 bg-white p-4">
    <h3 className="text-sm font-semibold text-purple-900">3. Parâmetros do Contrato e Foro</h3>
    
    <div>
      <label className="text-xs font-medium text-purple-600">Título do Documento</label>
      <input
        className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        value={data.contractTitle}
        onChange={(e) => onChange('contractTitle', e.target.value)}
        placeholder="CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE TI"
      />
    </div>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div>
        <label className="text-xs font-medium text-purple-600">Valor Total</label>
        <input
          className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={data.contractValue}
          onChange={(e) => onChange('contractValue', maskCurrency(e.target.value))}
          placeholder="R$ 0,00"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-purple-600">Data de Início</label>
        <input
          type="date"
          className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={data.startDate}
          onChange={(e) => onChange('startDate', e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-purple-600">Data de Término</label>
        <input
          type="date"
          className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={data.endDate}
          onChange={(e) => onChange('endDate', e.target.value)}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="md:col-span-2">
        <label className="text-xs font-medium text-purple-600">Comarca do Foro (Cidade)</label>
        <input
          className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          value={data.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="Medianeira"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-purple-600">UF</label>
        <input
          className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm uppercase text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          maxLength={2}
          value={data.state}
          onChange={(e) => onChange('state', e.target.value.toUpperCase())}
          placeholder="PR"
        />
      </div>
    </div>
  </div>
);