import { ContractData } from './types';

// Escapa caracteres que têm significado sintático no LaTeX
export const escapeLatex = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

export const generateLatexTemplate = (data: ContractData): string => {
  const safeTitle = escapeLatex(data.contractTitle || 'INSTRUMENTO PARTICULAR DE PRESTAÇÃO DE SERVIÇOS');
  const safeContractor = escapeLatex(data.contractorName || '___________________________');
  const safeContractorDoc = escapeLatex(data.contractorDoc || '___.___.___/____-__');
  const safeContractorAddr = escapeLatex(data.contractorAddress || '___________________________');
  
  const safeContracted = escapeLatex(data.contractedName || '___________________________');
  const safeContractedDoc = escapeLatex(data.contractedDoc || '___.___.___/____-__');
  const safeContractedAddr = escapeLatex(data.contractedAddress || '___________________________');

  const safeVal = escapeLatex(data.contractValue || 'R$ 0,00');
  const safeStart = escapeLatex(data.startDate || '__/__/____');
  const safeEnd = escapeLatex(data.endDate || '__/__/____');
  const safeCity = escapeLatex(data.city || 'Medianeira');
  const safeState = escapeLatex(data.state || 'PR');

  return `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[brazil]{babel}
\\usepackage[margin=2.5cm]{geometry}
\\usepackage{titlesec}
\\usepackage{indentfirst}
\\usepackage{setspace}

\\onehalfspacing
\\setlength{\\parindent}{1.25cm}

\\title{\\textbf{${safeTitle}}}
\\date{}

\\begin{document}

\\begin{center}
    {\\large \\textbf{${safeTitle}}}
\\end{center}

\\vspace{0.8cm}

\\noindent \\textbf{CONTRATANTE:} ${safeContractor}, inscrita no CNPJ/CPF sob nº ${safeContractorDoc}, com sede/domicílio em ${safeContractorAddr}.

\\vspace{0.4cm}

\\noindent \\textbf{CONTRATADA:} ${safeContracted}, inscrita no CNPJ/CPF sob nº ${safeContractedDoc}, com sede/domicílio em ${safeContractedAddr}.

\\vspace{0.6cm}
\\noindent Têm entre si, justo e contratado, o presente instrumento sob as cláusulas e condições seguintes:

\\vspace{0.6cm}

% ========================================================
% ADICIONE AS CLÁUSULAS MANUALMENTE A PARTIR DAQUI
% ========================================================

\\section*{CLÁUSULA PRIMEIRA - DO OBJETO}
O presente contrato tem por objeto a prestação de serviços de...

\\section*{CLÁUSULA SEGUNDA - DO PREÇO E DAS CONDIÇÕES}
Pela prestação dos serviços objeto deste contrato, a CONTRATANTE pagará à CONTRATADA o valor total de \\textbf{${safeVal}}.

\\section*{CLÁUSULA TERCEIRA - DA VIGÊNCIA}
O presente instrumento vigorará de ${safeStart} a ${safeEnd}.

\\section*{CLÁUSULA QUARTA - DO FORO}
Para dirimir quaisquer controvérsias oriundas deste contrato, as partes elegem o foro da Comarca de ${safeCity} - ${safeState}, com renúncia expressa a qualquer outro.

\\vspace{1.5cm}

\\begin{center}
    ${safeCity} - ${safeState}, \\today.
\\end{center}

\\vspace{2cm}

\\noindent
\\begin{minipage}[t]{0.48\\textwidth}
    \\centering
    \\rule{\\textwidth}{0.4pt}\\\\
    \\textbf{CONTRATANTE}\\\\
    ${safeContractor}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
    \\centering
    \\rule{\\textwidth}{0.4pt}\\\\
    \\textbf{CONTRATADA}\\\\
    ${safeContracted}
\\end{minipage}

\\end{document}
`;
};

export const downloadTexFile = (data: ContractData) => {
  const content = generateLatexTemplate(data);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  // Nome do arquivo limpo
  const filename = (data.contractTitle || 'contrato')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_');

  link.download = `${filename}.tex`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};