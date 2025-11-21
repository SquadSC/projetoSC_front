/**
 * Utilitário para trabalhar com status de pedido
 * Mapeia descrições de status para IDs e vice-versa
 */

/**
 * Mapeia a descrição do status para o ID correspondente
 * @param {string} statusDescricao - Descrição do status (ex: "Aceito pela confeiteira")
 * @returns {number|null} ID do status ou null se não encontrado
 */
export function getStatusIdFromDescription(statusDescricao) {
  if (!statusDescricao) return null;

  const statusMap = {
    'Aberto': 1,
    'Enviado': 2,
    'Aceito pela confeiteira': 3,
    'Validado pelo fornecedor': 4,
    'Agendamento confirmado': 5,
    'Em producao': 6,
    'Em produção': 6, // Variação possível
    'Concluido': 7,
    'Concluído': 7, // Variação possível
    'Cancelado': 8,
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
    1: 'Aberto',
    2: 'Enviado',
    3: 'Aceito pela confeiteira',
    4: 'Validado pelo fornecedor',
    5: 'Agendamento confirmado',
    6: 'Em produção',
    7: 'Concluído',
    8: 'Cancelado',
  };

  return statusMap[statusId] || null;
}

/**
 * Verifica se um pedido está pendente (status 3, 4 ou 5)
 * @param {string|number} status - Descrição ou ID do status
 * @returns {boolean} true se o pedido está pendente
 */
export function isPendingOrder(status) {
  if (!status) return false;

  // Se for número, verifica diretamente
  if (typeof status === 'number') {
    return [3, 4, 5].includes(status);
  }

  // Se for string, converte para ID primeiro
  const statusId = getStatusIdFromDescription(status);
  return statusId !== null && [3, 4, 5].includes(statusId);
}

