/**
 * Aplica máscara dinâmica para CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00)
 */
export const maskCpfCnpj = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  return digits
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

/**
 * Formata valores numéricos para o padrão de moeda brasileira (R$ 0.000,00)
 */
export const maskCurrency = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  const amount = (Number(digits) / 100).toFixed(2);
  const [integerPart, decimalPart] = amount.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${formattedInteger},${decimalPart}`;
};

/**
 * Formata telefones fixos ((00) 0000-0000) e celulares ((00) 00000-0000)
 */
export const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }

  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
};

/**
 * Formata CEP (00000-000)
 */
export const maskCep = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})/, '$1-$2');
};