export async function fetchCep(cep) {
  // Remove qualquer caractere que não seja número
  const cleanedCep = cep.replace(/\D/g, '');

  if (cleanedCep.length !== 8) {
    throw new Error('CEP deve conter 8 dígitos.');
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);

  if (!response.ok) { // se a busca não for realizada
    throw new Error('Não foi possível consultar o CEP.');
  }

  const data = await response.json();

  if (data.erro) { // se buscou e não encontrou nada
    throw new Error('CEP não encontrado.');
  }

  return data;
}