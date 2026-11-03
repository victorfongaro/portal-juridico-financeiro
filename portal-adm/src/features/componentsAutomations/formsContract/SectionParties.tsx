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
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm mb-3">1. Dados da Contratante (Cliente)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-neutral-500 font-medium">Nome / Razão Social</label>
          <input
            className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            value={data.contractorName}
            onChange={(e) => onChange('contractorName', e.target.value)}
            placeholder="Empresa Contratante Ltda"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 font-medium">CPF ou CNPJ</label>
          <input
            className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            value={data.contractorDoc}
            onChange={(e) => onChange('contractorDoc', maskCpfCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-neutral-500 font-medium">Endereço Completo</label>
          <input
            className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            value={data.contractorAddress}
            onChange={(e) => onChange('contractorAddress', e.target.value)}
            placeholder="Rua, Número, Bairro, Cidade - UF"
          />
        </div>
      </div>
    </div>

    {/* Contratada */}
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm mb-3">2. Dados da Contratada (Prestador)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-neutral-500 font-medium">Nome / Razão Social</label>
          <input
            className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            value={data.contractedName}
            onChange={(e) => onChange('contractedName', e.target.value)}
            placeholder="Prestador de Serviços"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 font-medium">CPF ou CNPJ</label>
          <input
            className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            value={data.contractedDoc}
            onChange={(e) => onChange('contractedDoc', maskCpfCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-neutral-500 font-medium">Endereço Completo</label>
          <input
            className="w-full h-9 border rounded-md px-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            value={data.contractedAddress}
            onChange={(e) => onChange('contractedAddress', e.target.value)}
            placeholder="Sede ou domicílio"
          />
        </div>
      </div>
    </div>
  </div>
);