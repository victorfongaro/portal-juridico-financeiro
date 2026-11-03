export interface ContractData {
  // Contratante
  contractorName: string;
  contractorDoc: string;
  contractorAddress: string;
  contractorEmail: string;

  // Contratada
  contractedName: string;
  contractedDoc: string;
  contractedAddress: string;

  // Informações Base
  contractTitle: string;
  contractValue: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
}