export interface RepresentativeData {
  name: string;
  nationality: string;
  maritalStatus: string;
  profession: string;
  cpf: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

export interface ContractClause {
  id: string;
  title: string;       // Ex: CLÁUSULA NONA - DA PROPRIEDADE INTELECTUAL
  content: string;     // Texto principal da cláusula
  paragraphs: string[];// Parágrafos opcionais (Parágrafo Primeiro, etc.)
}

export interface ContractModelData {
  // Cabeçalho e Logos
  projectSubtitle: string;
  logoLeftPath: string;  // Caminho da imagem esquerda (ex: logo-ada.png)
  logoRightPath: string; // Caminho da imagem direita (ex: logo-utfpr.png)

  // Contratante (Cliente) - Endereço desmembrado
  contractorName: string;
  contractorDoc: string; // CNPJ ou CPF
  contractorStreet: string;
  contractorNumber: string;
  contractorComplement?: string;
  contractorNeighborhood: string;
  contractorCity: string;
  contractorState: string;
  contractorCep: string;
  contractorRep: RepresentativeData;

  // Contratada (ADA EJ)
  contractedName: string;
  contractedCnpjStatus: string;
  contractedCampus: string;
  contractedAddress: string;
  contractedCep: string;
  contractedNeighborhood: string;
  contractedCityState: string;
  contractedRepRole: string;
  contractedRep: RepresentativeData;

  // Objeto & Financeiro
  softwareName: string;
  termMonths: string;
  totalValue: string;
  totalValueWords: string;
  installmentsCount: string;
  installmentValue: string;
  installmentValueWords: string;

  // Cláusulas Adicionais Dinâmicas (Sem limites)
  customClauses: ContractClause[];

  // Foro e Assinatura
  signatureCity: string;
  signatureDate: string;
}