export const allMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export const expenseTypes = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export const currConv = {
  USD: 'Dólar Comercial', EUR: 'Euro', CAD: 'Dólar Canadense',
};

export const tableTitles = [
  'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];

export const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: allMethods[0],
  tag: expenseTypes[0],
  buttonText: 'Adicionar despesa',
  editId: '',
};
