import { ContractModelData } from './types';

export const escapeLatex = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

const formatFullAddress = (
  street: string,
  num: string,
  comp: string | undefined,
  neigh: string,
  city: string,
  state: string,
  cep: string
): string => {
  const parts = [
    street ? `${street}, nº ${num || 'S/N'}` : '',
    comp ? comp : '',
    neigh ? `Bairro ${neigh}` : '',
    city && state ? `${city}/${state}` : city || state || '',
    cep ? `CEP: ${cep}` : '',
  ].filter(Boolean);
  return parts.join(', ');
};

export const generateLatexTemplate = (d: ContractModelData): string => {
  const subtitle = escapeLatex(d.projectSubtitle || 'DESENVOLVIMENTO DE SOFTWARE');
  const software = escapeLatex(d.softwareName || 'Sistema');

  const fullContractorAddress = formatFullAddress(
    d.contractorStreet,
    d.contractorNumber,
    d.contractorComplement,
    d.contractorNeighborhood,
    d.contractorCity,
    d.contractorState,
    d.contractorCep
  );

  const fullContractorRepAddress = formatFullAddress(
    d.contractorRep.street,
    d.contractorRep.number,
    d.contractorRep.complement,
    d.contractorRep.neighborhood,
    d.contractorRep.city,
    d.contractorRep.state,
    d.contractorRep.cep
  );

  const cName = escapeLatex(d.contractorName);
  const cDoc = escapeLatex(d.contractorDoc);
  const cAddr = escapeLatex(fullContractorAddress);

  const crName = escapeLatex(d.contractorRep.name);
  const crNat = escapeLatex(d.contractorRep.nationality || 'brasileiro(a)');
  const crCivil = escapeLatex(d.contractorRep.maritalStatus || 'solteiro(a)');
  const crProf = escapeLatex(d.contractorRep.profession);
  const crCpf = escapeLatex(d.contractorRep.cpf);
  const crAddr = escapeLatex(fullContractorRepAddress);

  const jName = escapeLatex(d.contractedName);
  const jStatus = escapeLatex(d.contractedCnpjStatus);
  const jCampus = escapeLatex(d.contractedCampus);
  const jAddr = escapeLatex(d.contractedAddress);
  const jCep = escapeLatex(d.contractedCep);
  const jNeigh = escapeLatex(d.contractedNeighborhood);
  const jCity = escapeLatex(d.contractedCityState);

  const jrRole = escapeLatex(d.contractedRepRole);
  const jrName = escapeLatex(d.contractedRep.name);
  const jrNat = escapeLatex(d.contractedRep.nationality);
  const jrCivil = escapeLatex(d.contractedRep.maritalStatus);
  const jrProf = escapeLatex(d.contractedRep.profession);
  const jrCpf = escapeLatex(d.contractedRep.cpf);
  const jrAddr = escapeLatex(d.contractedRep.address);
  const jrCep = escapeLatex(d.contractedRep.cep);

  const valTotal = escapeLatex(d.totalValue || 'R$ 0,00');
  const valWords = escapeLatex(d.totalValueWords || 'zero reais');
  const instCount = escapeLatex(d.installmentsCount || '1');
  const instVal = escapeLatex(d.installmentValue || 'R$ 0,00');
  const instWords = escapeLatex(d.installmentValueWords || 'zero reais');
  const termMonths = escapeLatex(d.termMonths || '12');

  const signCity = escapeLatex(d.signatureCity || 'Medianeira');
  const signDate = escapeLatex(d.signatureDate || '\\today');

  const customClausesTex = d.customClauses.length > 0
    ? `\n% ========================================================\n% CLÁUSULAS ADICIONAIS\n% ========================================================\n` +
      d.customClauses
        .map((clause, idx) => {
          const safeTitle = escapeLatex(clause.title || `CLÁUSULA ADICIONAL ${idx + 1}`);
          const safeContent = escapeLatex(clause.content);
          const paragraphs = clause.paragraphs
            .map((p) => `\\noindent ${escapeLatex(p)}\\\\`)
            .join('\n');

          return `\\noindent \\textbf{${safeTitle}}\\\\\n${safeContent ? safeContent + '\\\\' : ''}\n${paragraphs}`;
        })
        .join('\n\n')
    : '';

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[brazil]{babel}
\\usepackage[top=3.5cm,bottom=3cm,left=2cm,right=2cm,headheight=2.5cm]{geometry}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\usepackage{indentfirst}
\\usepackage{setspace}

% CONFIGURAÇÃO DE CABEÇALHO E RODAPÉ FIXOS
\\pagestyle{fancy}
\\fancyhf{} % Limpa configurações padrão

% Cabeçalho fixo em todas as páginas
\\fancyhead[L]{\\includegraphics[height=1.8cm]{${d.logoLeftPath || 'logo-ada.png'}}}
\\fancyhead[C]{\\textbf{CONTRATO DE PRESTAÇÃO DE SERVIÇOS}\\\\{\\footnotesize ${subtitle}}}
\\fancyhead[R]{\\includegraphics[height=1.8cm]{${d.logoRightPath || 'logo-utfpr.png'}}}
\\renewcommand{\\headrulewidth}{0.6pt}

% Rodapé fixo em todas as páginas
\\fancyfoot[L]{\\footnotesize ${jName}}
\\fancyfoot[R]{\\footnotesize Página \\thepage}
\\renewcommand{\\footrulewidth}{0.4pt}

\\onehalfspacing
\\setlength{\\parindent}{1.25cm}

\\begin{document}

\\vspace*{0.2cm}

\\noindent Pelo presente instrumento particular, que entre si fazem, de um lado como \\textbf{CONTRATANTE} e assim doravante indicada, \\textbf{${cName}}, inscrita no CNPJ/CPF nº ${cDoc}, com sede em ${cAddr}, representada por ${crName}, ${crNat}, ${crCivil}, ${crProf}, CPF nº ${crCpf}, residente e domiciliado(a) em ${crAddr}; e de outro lado, como \\textbf{CONTRATADA}, assim doravante indicada, a \\textbf{${jName}}, ${jStatus}, com sede na ${jCampus}, situada na ${jAddr}, CEP: ${jCep}, Bairro ${jNeigh}, ${jCity}, neste ato representada por seu ${jrRole}, ${jrName}, ${jrNat}, ${jrCivil}, ${jrProf}, portador do CPF nº ${jrCpf}, residente e domiciliado à ${jrAddr}, CEP: ${jrCep}, mediante as seguintes cláusulas e condições:

\\vspace{0.4cm}
\\begin{center}
    \\textbf{DO OBJETO DO CONTRATO}
\\end{center}

\\noindent \\textbf{CLÁUSULA PRIMEIRA.} Constitui objeto do presente contrato o desenvolvimento do software ${software}, pela CONTRATADA à CONTRATANTE, com funcionalidades descritas no Anexo I (Proposta Técnica e Comercial), parte integrante deste instrumento.

\\vspace{0.3cm}
\\noindent \\textbf{CLÁUSULA SEGUNDA. DOS SERVIÇOS CONTRATADOS}\\\\
Os serviços consistirão em análise de requisitos, desenvolvimento, testes funcionais, entrega funcional e transferência de arquivos-fonte conforme especificações técnicas acordadas.

\\vspace{0.4cm}
\\begin{center}
    \\textbf{DAS OBRIGAÇÕES DAS PARTES E PRAZOS}
\\end{center}

\\noindent \\textbf{CLÁUSULA TERCEIRA.} A CONTRATANTE deverá fornecer à CONTRATADA todas as informações e acessos necessários.\\\\
\\textbf{CLÁUSULA QUARTA.} A CONTRATANTE se obriga a apresentar documentos quando solicitados.\\\\
\\textbf{CLÁUSULA QUINTA.} A CONTRATANTE deverá efetuar o devido pagamento em conformidade com a Cláusula 7ª.\\\\
\\textbf{CLÁUSULA SEXTA.} A CONTRATADA se compromete a cumprir suas obrigações no prazo de ${termMonths} meses.

\\vspace{0.4cm}
\\begin{center}
    \\textbf{DO PAGAMENTO E DESCONTO SOCIAL}
\\end{center}

\\noindent \\textbf{CLÁUSULA SÉTIMA.} Pela prestação dos serviços, a CONTRATANTE pagará à CONTRATADA a quantia total de \\textbf{${valTotal} (${valWords})}, dividida em \\textbf{${instCount} parcelas de ${instVal} (${instWords})} cada, sendo a primeira devida no momento da assinatura deste contrato, e as demais mensalmente.\\\\
\\textbf{CLÁUSULA OITAVA.} A CONTRATADA, na qualidade de instituição sem fins lucrativos, compromete-se a conceder à CONTRATANTE um desconto em respeito à sua finalidade social.
${customClausesTex}

\\vspace{0.4cm}
\\begin{center}
    \\textbf{DA RESCISÃO, CONDIÇÕES GERAIS E FORO}
\\end{center}

\\noindent \\textbf{CLÁUSULA NONA.} A rescisão injustificada pela CONTRATANTE implicará cláusula penal de 10\\% do valor total devidamente atualizado.\\\\
\\textbf{CLÁUSULA DÉCIMA.} O não cumprimento das obrigações pela CONTRATADA implicará restituição corrigida acrescida de cláusula penal de 10\\%.\\\\
\\textbf{CLÁUSULA DÉCIMA PRIMEIRA.} A rescisão não extingue direitos e deveres adquiridos durante a vigência.\\\\
\\textbf{CLÁUSULA DÉCIMA SEGUNDA.} Em caso de interesse mútuo, o contrato poderá ser distratado sem ônus.\\\\
\\textbf{CLÁUSULA DÉCIMA TERCEIRA.} Serviços adicionais demandarão novo instrumento contratual.\\\\
\\textbf{CLÁUSULA DÉCIMA QUARTA.} Assim que a CONTRATADA realizar a emissão do CNPJ, este contrato passa a ser vinculado à pessoa jurídica.\\\\
\\textbf{CLÁUSULA DÉCIMA QUINTA.} O presente contrato é inarrependível.\\\\
\\textbf{CLÁUSULA DÉCIMA SEXTA.} Para dirimir quaisquer controvérsias oriundas do presente instrumento, as partes elegem o foro da Comarca de ${signCity}.

\\vspace{0.8cm}
\\noindent Por estarem justos e contratados, firmam o presente instrumento, em duas vias de igual teor, junto a 2 (duas) testemunhas.

\\vspace{0.8cm}
\\begin{center}
    ${signCity}, ${signDate}.
\\end{center}

\\vspace{1.5cm}
\\noindent
\\begin{minipage}[t]{0.48\\textwidth}
    \\centering
    \\rule{\\textwidth}{0.4pt}\\\\
    \\textbf{CONTRATADA}\\\\
    ${jrName}\\\\
    ${jrRole} - ${jName}
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
    \\centering
    \\rule{\\textwidth}{0.4pt}\\\\
    \\textbf{CONTRATANTE}\\\\
    ${crName}\\\\
    ${cName}
\\end{minipage}

\\vspace{1.5cm}
\\noindent
\\begin{minipage}[t]{0.48\\textwidth}
    \\rule{\\textwidth}{0.4pt}\\\\
    Testemunha 1:\\\\
    Nome:\\\\
    CPF:
\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.48\\textwidth}
    \\rule{\\textwidth}{0.4pt}\\\\
    Testemunha 2:\\\\
    Nome:\\\\
    CPF:
\\end{minipage}

\\end{document}
`;
};

export const downloadTexFile = (data: ContractModelData) => {
  const content = generateLatexTemplate(data);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const filename = (data.projectSubtitle || 'contrato')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_');
  link.download = `${filename}.tex`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printContractAsPdf = (d: ContractModelData) => {
  const win = window.open('', '_blank');
  if (!win) return;

  const fullContractorAddress = formatFullAddress(
    d.contractorStreet,
    d.contractorNumber,
    d.contractorComplement,
    d.contractorNeighborhood,
    d.contractorCity,
    d.contractorState,
    d.contractorCep
  );

  const fullContractorRepAddress = formatFullAddress(
    d.contractorRep.street,
    d.contractorRep.number,
    d.contractorRep.complement,
    d.contractorRep.neighborhood,
    d.contractorRep.city,
    d.contractorRep.state,
    d.contractorRep.cep
  );

  const logoLeft = window.location.origin + '/' + (d.logoLeftPath || 'logo-ada.png');
  const logoRight = window.location.origin + '/' + (d.logoRightPath || 'logo-utfpr.png');

  const customClausesHtml = d.customClauses
    .map(
      (c) => `
      <div style="margin-bottom: 12px;">
        <p><strong>${c.title}</strong></p>
        ${c.content ? `<p>${c.content}</p>` : ''}
        ${c.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>`
    )
    .join('');

  win.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>${d.projectSubtitle || 'Contrato'}</title>
      <style>
        @page {
          size: A4;
          margin: 15mm 20mm;
        }
        body { 
          font-family: 'Times New Roman', Times, serif; 
          font-size: 11pt; 
          line-height: 1.5; 
          color: #000; 
          margin: 0;
          background: #fff;
        }

        /* Estrutura de tabela para repetição de cabeçalho e rodapé em todas as páginas */
        table.page-layout {
          width: 100%;
          border-collapse: collapse;
        }

        thead.page-header {
          display: table-header-group;
        }

        tfoot.page-footer {
          display: table-footer-group;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1.5px solid #000;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }

        .header-logo {
          width: 75px;
          height: 55px;
          object-fit: contain;
        }

        .header-title-box {
          flex: 1;
          text-align: center;
          padding: 0 10px;
        }

        .header-title-box h1 {
          font-size: 12pt;
          margin: 0 0 3px 0;
          font-weight: bold;
        }

        .header-title-box h2 {
          font-size: 9.5pt;
          margin: 0;
          font-weight: bold;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #666;
          padding-top: 6px;
          margin-top: 15px;
          font-size: 9pt;
          color: #333;
        }

        .body-content {
          padding-top: 10px;
        }

        h3 { 
          font-size: 11pt; 
          text-align: center; 
          margin: 16px 0 8px 0; 
          font-weight: bold; 
        }

        p { 
          text-align: justify; 
          text-indent: 1.25cm; 
          margin: 0 0 8px 0; 
        }

        .no-indent { text-indent: 0; }

        .signatures { 
          margin-top: 40px; 
          display: flex; 
          justify-content: space-between; 
          page-break-inside: avoid; 
        }

        .sig-box { width: 45%; text-align: center; }
        .sig-line { border-top: 1px solid #000; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <table class="page-layout">
        <!-- CABEÇALHO REPETIDO EM TODAS AS PÁGINAS -->
        <thead class="page-header">
          <tr>
            <td>
              <div class="header-content">
                <img src="${logoLeft}" alt="Logo Esquerda" class="header-logo" onerror="this.style.visibility='hidden'" />
                <div class="header-title-box">
                  <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>
                  <h2>${d.projectSubtitle || ''}</h2>
                </div>
                <img src="${logoRight}" alt="Logo Direita" class="header-logo" onerror="this.style.visibility='hidden'" />
              </div>
            </td>
          </tr>
        </thead>

        <!-- RODAPÉ REPETIDO EM TODAS AS PÁGINAS -->
        <tfoot class="page-footer">
          <tr>
            <td>
              <div class="footer-content">
                <span>${d.contractedName}</span>
                <span>${d.signatureCity} - ${d.contractorState || 'PR'}</span>
              </div>
            </td>
          </tr>
        </tfoot>

        <!-- CONTEÚDO PRINCIPAL (QUEBRA NATURALMENTE ENTRE AS FOLHAS) -->
        <tbody>
          <tr>
            <td class="body-content">
              <p class="no-indent">
                Pelo presente instrumento particular, que entre si fazem, de um lado como <strong>CONTRATANTE</strong> e assim doravante indicada, <strong>${d.contractorName}</strong>, inscrita no CNPJ/CPF nº ${d.contractorDoc}, com sede em ${fullContractorAddress}, representada por ${d.contractorRep.name}, ${d.contractorRep.nationality}, ${d.contractorRep.maritalStatus}, ${d.contractorRep.profession}, CPF nº ${d.contractorRep.cpf}, residente e domiciliado(a) em ${fullContractorRepAddress}; e de outro lado, como <strong>CONTRATADA</strong>, assim doravante indicada, a <strong>${d.contractedName}</strong>, ${d.contractedCnpjStatus}, com sede na ${d.contractedCampus}, situada na ${d.contractedAddress}, CEP: ${d.contractedCep}, Bairro ${d.contractedNeighborhood}, ${d.contractedCityState}, neste ato representada por seu ${d.contractedRepRole}, ${d.contractedRep.name}, ${d.contractedRep.nationality}, ${d.contractedRep.maritalStatus}, ${d.contractedRep.profession}, portador do CPF nº ${d.contractedRep.cpf}, residente e domiciliado à ${d.contractedRep.address}, CEP: ${d.contractedRep.cep}, mediante as seguintes cláusulas e condições:
              </p>

              <h3>DO OBJETO DO CONTRATO</h3>
              <p><strong>CLÁUSULA PRIMEIRA.</strong> Constitui objeto do presente contrato o desenvolvimento do software ${d.softwareName}, pela CONTRATADA à CONTRATANTE, com funcionalidades descritas no Anexo I (Proposta Técnica e Comercial), parte integrante deste instrumento.</p>

              <p class="no-indent"><strong>CLÁUSULA SEGUNDA. DOS SERVIÇOS CONTRATADOS</strong><br/>
              Os serviços consistirão em análise de requisitos, desenvolvimento, testes funcionais, entrega funcional e transferência de arquivos-fonte conforme especificações técnicas acordadas.</p>

              <h3>DAS OBRIGAÇÕES DAS PARTES E PRAZOS</h3>
              <p><strong>CLÁUSULA TERCEIRA.</strong> A CONTRATANTE deverá fornecer à CONTRATADA todas as informações e acessos necessários.</p>
              <p><strong>CLÁUSULA QUARTA.</strong> A CONTRATANTE se obriga a apresentar documentos quando solicitados.</p>
              <p><strong>CLÁUSULA QUINTA.</strong> A CONTRATANTE deverá efetuar o devido pagamento em conformidade com a Cláusula 7ª.</p>
              <p><strong>CLÁUSULA SEXTA.</strong> A CONTRATADA se compromete a cumprir suas obrigações no prazo de ${d.termMonths} meses.</p>

              <h3>DO PAGAMENTO</h3>
              <p><strong>CLÁUSULA SÉTIMA.</strong> Pela prestação dos serviços, a CONTRATANTE pagará à CONTRATADA a quantia total de <strong>${d.totalValue} (${d.totalValueWords})</strong>, dividida em <strong>${d.installmentsCount} parcelas de ${d.installmentValue} (${d.installmentValueWords})</strong> cada, sendo a primeira devida na assinatura deste contrato.</p>
              <p><strong>CLÁUSULA OITAVA.</strong> A CONTRATADA, na qualidade de instituição sem fins lucrativos, compromete-se a conceder à CONTRATANTE um desconto em respeito à sua finalidade social.</p>

              ${customClausesHtml ? `<h3>CLÁUSULAS ADICIONAIS</h3>${customClausesHtml}` : ''}

              <h3>DA RESCISÃO E FORO</h3>
              <p><strong>CLÁUSULA NONA.</strong> A rescisão injustificada pela CONTRATANTE implicará cláusula penal de 10% do valor total atualizado.</p>
              <p><strong>CLÁUSULA DÉCIMA.</strong> O não cumprimento das obrigações pela CONTRATADA implicará restituição corrigida acrescida de cláusula penal de 10%.</p>
              <p><strong>CLÁUSULA DÉCIMA SEXTA.</strong> Para dirimir quaisquer controvérsias oriundas do presente instrumento, as partes elegem o foro da Comarca de ${d.signatureCity}.</p>

              <p class="no-indent" style="text-align: center; margin-top: 30px;">
                ${d.signatureCity}, ${d.signatureDate}.
              </p>

              <div class="signatures">
                <div class="sig-box">
                  <div class="sig-line"></div>
                  <strong>CONTRATADA</strong><br/>
                  <span>${d.contractedRep.name}</span><br/>
                  <small>${d.contractedRepRole} - ${d.contractedName}</small>
                </div>
                <div class="sig-box">
                  <div class="sig-line"></div>
                  <strong>CONTRATANTE</strong><br/>
                  <span>${d.contractorRep.name}</span><br/>
                  <small>${d.contractorName}</small>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <script>
        window.onload = function() { window.focus(); window.print(); };
      </script>
    </body>
    </html>
  `);
  win.document.close();
};