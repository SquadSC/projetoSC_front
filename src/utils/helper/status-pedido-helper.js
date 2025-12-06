/**
 * Utilitário para trabalhar com status de pedido
 * Mapeia descrições de status para IDs e vice-versa
 */

/**
 * Mapeia a descrição do status para o ID correspondente
 * @param {string} statusDescricao - Descrição do status
 * @returns {number|null} ID do status ou null se não encontrado
 */
export function getStatusIdFromDescription(statusDescricao) {
  if (!statusDescricao) {
    return null;
  }

  const statusMap = {
    Criado: 1,
    Enviado: 2,
    Validação: 3,
    Pagamento: 4,
    Produção: 5,
    Concluído: 7,
    Concluido: 7, // Variação possível
    Cancelado: 8,
    // Mapeamentos antigos para compatibilidade
    Aberto: 1,
    'Aceito pela confeiteira': 3,
    'Validado pelo fornecedor': 4,
    'Agendamento confirmado': 5,
    'Em producao': 5,
    'Em produção': 5,
  };

  // Busca exata
  if (statusMap[statusDescricao]) {
    return statusMap[statusDescricao];
  }

  // Busca case-insensitive
  const statusLower = statusDescricao.toLowerCase().trim();
  for (const [key, value] of Object.entries(statusMap)) {
    if (key.toLowerCase() === statusLower) {
      return value;
    }
  }

  return null;
}

/**
 * Mapeia o ID do status para a descrição correspondente
 * @param {number} statusId - ID do status
 * @returns {string|null} Descrição do status ou null se não encontrado
 */
export function getStatusDescriptionFromId(statusId) {
  if (!statusId) return null;

  const statusMap = {
    1: 'Criado',
    2: 'Enviado',
    3: 'Validação',
    4: 'Pagamento',
    5: 'Produção',
    7: 'Concluído',
    8: 'Cancelado',
  };

  return statusMap[statusId] || null;
}

/**
 * Verifica se um pedido está pendente (status 2, 3 ou 4)
 * @param {string|number} status - Descrição ou ID do status
 * @returns {boolean} true se o pedido está pendente
 */
export function isPendingOrder(status) {
  if (!status) return false;

  // Se for número, usa direto
  if (typeof status === 'number') {
    return [2, 3, 4].includes(status);
  }

  // Se for string, converte primeiro
  const statusId = getStatusIdFromDescription(status);
  return statusId !== null && [2, 3, 4].includes(statusId);
}
