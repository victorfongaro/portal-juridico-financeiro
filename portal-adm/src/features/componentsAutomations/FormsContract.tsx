import React, { useState } from 'react';
import { ContractModelData, ContractClause } from './formsContract/types';
import { maskCpfCnpj, maskCurrency, maskCep } from './formsContract/utils';
import { downloadTexFile, printContractAsPdf } from './formsContract/latexGenerator';

const INITIAL_DATA: ContractModelData = {
  projectSubtitle: 'DESENVOLVIMENTO DE SOFTWARE - SISTEMA M.A.P.',
  softwareName: 'Sistema M.A.P.',
  logoLeftPath: 'logo-ada.png',
  logoRightPath: 'logo-utfpr.png',
  termMonths: '12',

  // Contratante - Endereço desmembrado
  contractorName: '',
  contractorDoc: '',
  contractorStreet: '',
  contractorNumber: '',
  contractorComplement: '',
  contractorNeighborhood: '',
  contractorCity: 'Medianeira',
  contractorState: 'PR',
  contractorCep: '',
  contractorRep: {
    name: '',
    nationality: 'brasileiro',
    maritalStatus: 'solteiro',
    profession: '',
    cpf: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: 'Medianeira',
    state: 'PR',
    cep: '',
  },

  // Contratada (ADA EJ)
  contractedName: 'ADA – Empresa Júnior de Ciência da Computação',
  contractedCnpjStatus: 'associação civil sem fins lucrativos, ainda não inscrita no CNPJ',
  contractedCampus: 'Universidade Tecnológica Federal do Paraná – Campus Medianeira',
  contractedAddress: 'Avenida Brasil, nº 4232',
  contractedCep: '85.772-332',
  contractedNeighborhood: 'Bairro Independência',
  contractedCityState: 'Medianeira/PR',
  
  // Representante Legal da Contratada (Dinâmico / Editável)
  contractedRepRole: 'Presidente',
  contractedRep: {
    name: '',
    nationality: 'brasileiro',
    maritalStatus: 'solteiro',
    profession: 'estudante',
    cpf: '',
    street: 'Rua Paraná',
    number: '4691',
    neighborhood: 'Bairro Independência',
    city: 'Medianeira',
    state: 'PR',
    cep: '85.722-340',
  },

  // Financeiro
  totalValue: 'R$ 10.000,00',
  totalValueWords: 'dez mil reais',
  installmentsCount: '12',
  installmentValue: 'R$ 833,33',
  installmentValueWords: 'oitocentos e trinta e três reais e trinta e três centavos',

  // Cláusulas adicionais
  customClauses: [],

  signatureCity: 'Medianeira',
  signatureDate: '12 de dezembro de 2025',
};

export const FormsContract: React.FC = () => {
  const [data, setData] = useState<ContractModelData>(INITIAL_DATA);

  const updateRep = (rep: 'contractorRep' | 'contractedRep', field: string, val: string) => {
    setData((prev) => ({
      ...prev,
      [rep]: { ...prev[rep], [field]: val },
    }));
  };

  const addClause = () => {
    const newClause: ContractClause = {
      id: crypto.randomUUID(),
      title: 'CLÁUSULA - ',
      content: '',
      paragraphs: [],
    };
    setData((prev) => ({
      ...prev,
      customClauses: [...prev.customClauses, newClause],
    }));
  };

  const updateClause = (id: string, field: keyof ContractClause, val: any) => {
    setData((prev) => ({
      ...prev,
      customClauses: prev.customClauses.map((c) =>
        c.id === id ? { ...c, [field]: val } : c
      ),
    }));
  };

  const removeClause = (id: string) => {
    setData((prev) => ({
      ...prev,
      customClauses: prev.customClauses.filter((c) => c.id !== id),
    }));
  };

  const addParagraph = (clauseId: string) => {
    setData((prev) => ({
      ...prev,
      customClauses: prev.customClauses.map((c) =>
        c.id === clauseId
          ? { ...c, paragraphs: [...c.paragraphs, 'PARÁGRAFO ÚNICO. '] }
          : c
      ),
    }));
  };

  const updateParagraph = (clauseId: string, pIdx: number, val: string) => {
    setData((prev) => ({
      ...prev,
      customClauses: prev.customClauses.map((c) => {
        if (c.id !== clauseId) return c;
        const newP = [...c.paragraphs];
        newP[pIdx] = val;
        return { ...c, paragraphs: newP };
      }),
    }));
  };

  const removeParagraph = (clauseId: string, pIdx: number) => {
    setData((prev) => ({
      ...prev,
      customClauses: prev.customClauses.map((c) => {
        if (c.id !== clauseId) return c;
        return { ...c, paragraphs: c.paragraphs.filter((_, i) => i !== pIdx) };
      }),
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Barra de Ações Superior */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-slate-800">
            Gerador de Contrato (Modelo ADA EJ)
          </h1>
          <p className="text-xs text-slate-500">
            Preencha os dados das partes e emita em PDF ou código-fonte LaTeX (.tex).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => downloadTexFile(data)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition cursor-pointer"
          >
            Descarregar .tex (LaTeX)
          </button>
          <button
            type="button"
            onClick={() => printContractAsPdf(data)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer"
          >
            Gerar PDF
          </button>
        </div>
      </div>

      {/* 1. Identificação do Projeto */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">1. Identificação do Projeto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Subtítulo do Cabeçalho</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={data.projectSubtitle}
              onChange={(e) => setData({ ...data, projectSubtitle: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Nome do Software (Cláusula 1ª)</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={data.softwareName}
              onChange={(e) => setData({ ...data, softwareName: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 2. Representante Legal da Contratada (ADA EJ) - DINÂMICO */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">2. Representante Legal da Contratada (ADA EJ)</h2>
          <p className="text-xs text-slate-500">Defina o membro responsável pela assinatura deste instrumento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Cargo na Empresa Júnior</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractedRepRole}
              placeholder="Ex: Presidente / Diretor Jurídico-Financeiro"
              onChange={(e) => setData({ ...data, contractedRepRole: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-slate-600 font-medium block mb-1">Nome Completo do Representante</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractedRep.name}
              placeholder="Nome do representante da ADA"
              onChange={(e) => updateRep('contractedRep', 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">CPF</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractedRep.cpf}
              placeholder="000.000.000-00"
              onChange={(e) => updateRep('contractedRep', 'cpf', maskCpfCnpj(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Profissão / Ocupação</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractedRep.profession}
              placeholder="estudante"
              onChange={(e) => updateRep('contractedRep', 'profession', e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Endereço Residencial</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractedRep.address || `${data.contractedRep.street}, nº ${data.contractedRep.number}`}
              placeholder="Rua Paraná, nº 4691"
              onChange={(e) => updateRep('contractedRep', 'address', e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">CEP</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractedRep.cep}
              placeholder="85722-340"
              onChange={(e) => updateRep('contractedRep', 'cep', maskCep(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 3. Dados da Contratante (Cliente) com Endereço Granular */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">3. Contratante (Empresa / Cliente)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="text-xs text-slate-600 font-medium block mb-1">Razão Social / Nome</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorName}
              placeholder="MAP MANUTENÇÃO AGRICOLA PERINI LTDA"
              onChange={(e) => setData({ ...data, contractorName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">CNPJ / CPF</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorDoc}
              placeholder="00.000.000/0000-00"
              onChange={(e) => setData({ ...data, contractorDoc: maskCpfCnpj(e.target.value) })}
            />
          </div>
        </div>

        <h3 className="text-xs font-bold uppercase text-slate-500 pt-2 border-t border-slate-100">
          Endereço da Sede do Cliente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-3">
            <label className="text-xs text-slate-600 font-medium block mb-1">Logradouro (Rua, Av.)</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorStreet}
              placeholder="Rua Pará"
              onChange={(e) => setData({ ...data, contractorStreet: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Número</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorNumber}
              placeholder="3320"
              onChange={(e) => setData({ ...data, contractorNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Complemento</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorComplement}
              placeholder="Sala 02"
              onChange={(e) => setData({ ...data, contractorComplement: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Bairro</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorNeighborhood}
              placeholder="Itaipu"
              onChange={(e) => setData({ ...data, contractorNeighborhood: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Cidade</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorCity}
              placeholder="Medianeira"
              onChange={(e) => setData({ ...data, contractorCity: e.target.value })}
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">UF</label>
                <input
                  className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm uppercase text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                  maxLength={2}
                  value={data.contractorState}
                  onChange={(e) => setData({ ...data, contractorState: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">CEP</label>
                <input
                  className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                  value={data.contractorCep}
                  placeholder="85722-136"
                  onChange={(e) => setData({ ...data, contractorCep: maskCep(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xs font-bold uppercase text-slate-500 pt-3 border-t border-slate-100">
          Representante Legal da Contratante
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Nome do Representante</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorRep.name}
              placeholder="Sr. Adriano Perin"
              onChange={(e) => updateRep('contractorRep', 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Profissão</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorRep.profession}
              placeholder="Tecnólogo eletromecânico"
              onChange={(e) => updateRep('contractorRep', 'profession', e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">CPF</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.contractorRep.cpf}
              placeholder="000.000.000-00"
              onChange={(e) => updateRep('contractorRep', 'cpf', maskCpfCnpj(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 4. Condições Financeiras */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">4. Condições Financeiras (Cláusula 7ª)</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Valor Total</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.totalValue}
              onChange={(e) => setData({ ...data, totalValue: maskCurrency(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Valor por Extenso</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.totalValueWords}
              onChange={(e) => setData({ ...data, totalValueWords: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Nº de Parcelas</label>
            <input
              type="number"
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.installmentsCount}
              onChange={(e) => setData({ ...data, installmentsCount: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">Valor da Parcela</label>
            <input
              className="w-full h-10 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              value={data.installmentValue}
              onChange={(e) => setData({ ...data, installmentValue: maskCurrency(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* 5. Cláusulas Adicionais Ilimitadas */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              5. Cláusulas Adicionais Customizáveis
            </h2>
            <p className="text-xs text-slate-500">
              Adicione tópicos contratuais extras que serão compilados na ordem pretendida.
            </p>
          </div>
          <button
            type="button"
            onClick={addClause}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1 cursor-pointer"
          >
            <span>+</span> Adicionar Cláusula
          </button>
        </div>

        {data.customClauses.length === 0 ? (
          <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
            Nenhuma cláusula adicional adicionada. O contrato seguirá com a estrutura padrão.
          </div>
        ) : (
          <div className="space-y-4">
            {data.customClauses.map((clause, idx) => (
              <div
                key={clause.id}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 relative"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                  <input
                    className="flex-1 h-9 border border-slate-300 rounded-md px-3 text-xs font-bold uppercase text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                    placeholder="TÍTULO DA CLÁUSULA (Ex: CLÁUSULA NONA - DA PROPRIEDADE INTELECTUAL)"
                    value={clause.title}
                    onChange={(e) => updateClause(clause.id, 'title', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeClause(clause.id)}
                    className="text-xs font-bold text-red-500 hover:text-red-700 px-2 py-1 rounded cursor-pointer"
                    title="Remover Cláusula"
                  >
                    Excluir
                  </button>
                </div>

                <div>
                  <textarea
                    rows={2}
                    className="w-full border border-slate-300 rounded-md p-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                    placeholder="Texto principal da cláusula..."
                    value={clause.content}
                    onChange={(e) => updateClause(clause.id, 'content', e.target.value)}
                  />
                </div>

                {clause.paragraphs.length > 0 && (
                  <div className="pl-4 space-y-2 border-l-2 border-slate-200">
                    {clause.paragraphs.map((paragraph, pIdx) => (
                      <div key={pIdx} className="flex gap-2 items-center">
                        <textarea
                          rows={1}
                          className="flex-1 border border-slate-300 rounded-md p-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-500"
                          placeholder="PARÁGRAFO PRIMEIRO..."
                          value={paragraph}
                          onChange={(e) => updateParagraph(clause.id, pIdx, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeParagraph(clause.id, pIdx)}
                          className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => addParagraph(clause.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  + Adicionar Parágrafo nesta cláusula
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsContract;