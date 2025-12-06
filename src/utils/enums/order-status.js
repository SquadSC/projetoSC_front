export const ORDER_STATUS = {
  CRIADO: 'Criado',
  ENVIADO: 'Enviado',
  VALIDACAO: 'Validação',
  PAGAMENTO: 'Pagamento',
  PRODUCAO: 'Produção',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
  EXPIRADO: 'Expirado', // Status virtual para pedidos em produção que passaram da data de entrega
};

export const ORDER_STATUS_ID = {
  CRIADO: 1,
  ENVIADO: 2,
  VALIDACAO: 3,
  PAGAMENTO: 4,
  PRODUCAO: 5,
  CONCLUIDO: 7,
  CANCELADO: 8,
};

export const STATUS_DESCRIPTION_TO_ID = {
  [ORDER_STATUS.CRIADO]: ORDER_STATUS_ID.CRIADO,
  [ORDER_STATUS.ENVIADO]: ORDER_STATUS_ID.ENVIADO,
  [ORDER_STATUS.VALIDACAO]: ORDER_STATUS_ID.VALIDACAO,
  [ORDER_STATUS.PAGAMENTO]: ORDER_STATUS_ID.PAGAMENTO,
  [ORDER_STATUS.PRODUCAO]: ORDER_STATUS_ID.PRODUCAO,
  [ORDER_STATUS.CONCLUIDO]: ORDER_STATUS_ID.CONCLUIDO,
  [ORDER_STATUS.CANCELADO]: ORDER_STATUS_ID.CANCELADO,
};

export const STATUS_ID_TO_DESCRIPTION = {
  [ORDER_STATUS_ID.CRIADO]: ORDER_STATUS.CRIADO,
  [ORDER_STATUS_ID.ENVIADO]: ORDER_STATUS.ENVIADO,
  [ORDER_STATUS_ID.VALIDACAO]: ORDER_STATUS.VALIDACAO,
  [ORDER_STATUS_ID.PAGAMENTO]: ORDER_STATUS.PAGAMENTO,
  [ORDER_STATUS_ID.PRODUCAO]: ORDER_STATUS.PRODUCAO,
  [ORDER_STATUS_ID.CONCLUIDO]: ORDER_STATUS.CONCLUIDO,
  [ORDER_STATUS_ID.CANCELADO]: ORDER_STATUS.CANCELADO,
};

export const OrderStatusHelper = {
  isPendingStep: status => {
    return [
      ORDER_STATUS.ENVIADO,
      ORDER_STATUS.VALIDACAO,
      ORDER_STATUS.PAGAMENTO,
    ].includes(status);
  },

  isProductionStep: status => {
    return status === ORDER_STATUS.PRODUCAO;
  },

  isCompleted: status => {
    return status === ORDER_STATUS.CONCLUIDO;
  },

  isCancelled: status => {
    return status === ORDER_STATUS.CANCELADO;
  },

  /**
   * Verifica se o pedido pode ser cancelado pelo cliente
   * Permite cancelamento nas etapas: Enviado, Validação, Pagamento, Produção
   */
  canBeCancelled: status => {
    return [
      ORDER_STATUS.ENVIADO,
      ORDER_STATUS.VALIDACAO,
      ORDER_STATUS.PAGAMENTO,
      ORDER_STATUS.PRODUCAO,
    ].includes(status);
  },

  isExpired: (status, dtEntregaEsperada) => {
    // Só verifica expiração para pedidos em produção
    if (status !== ORDER_STATUS.PRODUCAO) return false;

    if (!dtEntregaEsperada) return false;

    const dataEntrega = new Date(dtEntregaEsperada);
    const hoje = new Date();

    // Remove as horas para comparar apenas as datas
    hoje.setHours(0, 0, 0, 0);
    dataEntrega.setHours(0, 0, 0, 0);

    return hoje > dataEntrega;
  },

  getEffectiveStatus: (status, dtEntregaEsperada) => {
    // Se o pedido está em produção e passou da data de entrega, considera como expirado
    if (status === ORDER_STATUS.PRODUCAO && dtEntregaEsperada) {
      const dataEntrega = new Date(dtEntregaEsperada);
      const hoje = new Date();

      // Remove as horas para comparar apenas as datas
      hoje.setHours(0, 0, 0, 0);
      dataEntrega.setHours(0, 0, 0, 0);

      if (hoje > dataEntrega) {
        return ORDER_STATUS.EXPIRADO;
      }
    }
    return status;
  },

  getAllStatuses: () => {
    return Object.values(ORDER_STATUS);
  },

  getStatusId: statusDescription => {
    return STATUS_DESCRIPTION_TO_ID[statusDescription] || null;
  },

  getStatusDescription: statusId => {
    return STATUS_ID_TO_DESCRIPTION[statusId] || null;
  },

  getStatusText: status => {
    switch (status) {
      case ORDER_STATUS.CRIADO:
        return 'Criado';
      case ORDER_STATUS.ENVIADO:
        return 'Verificando Agenda';
      case ORDER_STATUS.VALIDACAO:
        return 'Verificando Fornecedor';
      case ORDER_STATUS.PAGAMENTO:
        return 'Verificando Pagamento 50%';
      case ORDER_STATUS.PRODUCAO:
        return 'Produção';
      case ORDER_STATUS.CONCLUIDO:
        return 'Concluído';
      case ORDER_STATUS.CANCELADO:
        return 'Cancelado';
      case ORDER_STATUS.EXPIRADO:
        return 'Prazo Expirado';
      default:
        return '';
    }
  },

  getStatusColor: status => {
    switch (status) {
      case ORDER_STATUS.CRIADO:
        return { backgroundColor: 'primary.main', color: 'white' };
      case ORDER_STATUS.ENVIADO:
        return { backgroundColor: 'primary.main', color: 'white' };
      case ORDER_STATUS.VALIDACAO:
        return { backgroundColor: 'primary.main', color: 'white' };
      case ORDER_STATUS.PAGAMENTO:
        return { backgroundColor: 'primary.main', color: 'white' };
      case ORDER_STATUS.PRODUCAO:
        return { backgroundColor: 'primary.main', color: 'white' };
      case ORDER_STATUS.CONCLUIDO:
        return { backgroundColor: '#4caf50', color: 'white' };
      case ORDER_STATUS.CANCELADO:
        return { backgroundColor: '#f44336', color: 'white' };
      case ORDER_STATUS.EXPIRADO:
        return { backgroundColor: '#ff9800', color: 'white' }; // Laranja para expirado
      default:
        return { backgroundColor: 'primary.main', color: 'white' };
    }
  },

  // Métodos de conveniência que consideram status expirado
  getEffectiveStatusText: (status, dtEntregaEsperada) => {
    const effectiveStatus = OrderStatusHelper.getEffectiveStatus(
      status,
      dtEntregaEsperada,
    );
    return OrderStatusHelper.getStatusText(effectiveStatus);
  },

  getEffectiveStatusColor: (status, dtEntregaEsperada) => {
    const effectiveStatus = OrderStatusHelper.getEffectiveStatus(
      status,
      dtEntregaEsperada,
    );
    return OrderStatusHelper.getStatusColor(effectiveStatus);
  },
};
