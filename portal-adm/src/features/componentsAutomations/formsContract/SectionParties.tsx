import React from 'react';
import { ContractData } from './types';
import { maskCpfCnpj } from './utils';

interface SectionPartiesProps {
  data: ContractData;
  onChange: (field: keyof ContractData, val: string) => void;
}

export const SectionParties: React.FC<SectionPartiesProps> = ({ data, onChange }) => (
  <div className="space-y-4">
    {/* Contratante */}
    <div className="rounded-xl border border-purple-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-purple-900">1. Dados da Contratante (Cliente)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-purple-600">Nome / Razão Social</label>
          <input
            className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={data.contractorName}
            onChange={(e) => onChange('contractorName', e.target.value)}
            placeholder="Empresa Contratante Ltda"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-purple-600">CPF ou CNPJ</label>
          <input
            className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={data.contractorDoc}
            onChange={(e) => onChange('contractorDoc', maskCpfCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-purple-600">Endereço Completo</label>
          <input
            className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={data.contractorAddress}
            onChange={(e) => onChange('contractorAddress', e.target.value)}
            placeholder="Rua, Número, Bairro, Cidade - UF"
          />
        </div>
      </div>
    </div>

    {/* Contratada */}
    <div className="rounded-xl border border-purple-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-purple-900">2. Dados da Contratada (Prestador)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-purple-600">Nome / Razão Social</label>
          <input
            className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={data.contractedName}
            onChange={(e) => onChange('contractedName', e.target.value)}
            placeholder="Prestador de Serviços"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-purple-600">CPF ou CNPJ</label>
          <input
            className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={data.contractedDoc}
            onChange={(e) => onChange('contractedDoc', maskCpfCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-purple-600">Endereço Completo</label>
          <input
            className="h-9 w-full rounded-md border border-purple-200 bg-white px-3 text-sm text-purple-950 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={data.contractedAddress}
            onChange={(e) => onChange('contractedAddress', e.target.value)}
            placeholder="Sede ou domicílio"
          />
        </div>
      </div>
    </div>
  </div>
);