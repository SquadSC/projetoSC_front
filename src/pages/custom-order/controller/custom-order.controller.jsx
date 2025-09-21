import { CustomOrderView } from '../view/custom-order.view';

export function CustomOrderController() {
  // Dados mocados do pedido
  const product = {
    price: 87,
    theme: 'Floral',
    observation:
      'Se possível, embalar os doces e salgados separadamente para facilitar a organização. Qualquer dúvida sobre a personalização do bolo ou itens complementares, favor entrar em contato no número (11) 99673-3647.',
    attachment: [
      './src/assets/cake-images/cake-floral.png',
      './src/assets/cake-images/cake-azul.png',
      './src/assets/cake-images/cake-frutas.png',
    ],
    ingredientList: [
      { name: '1,0 Kg', type: 'Peso do bolo', isPremium: false },
      { name: 'Branca', type: 'Tipo da Massa', isPremium: false },
      { name: 'Doce de leite, Chocolate', type: 'Recheio', isPremium: false },
      { name: 'Morango', type: 'Adicional', isPremium: false },
    ],
    quantity: 1,
  };

  // Objeto do pedido
  // const pedido = {
  //   idCliente: 1, // Substituir pelo ID do cliente logado
  //   idProduto: 123, // Substituir pelo ID do produto selecionado
  //   quantidade: 1, // Quantidade do produto
  //   listaIngredientes: [1, 2, 3], // IDs dos ingredientes personalizados
  //   informacaoBolo: {
  //     tema: "Aniversário",
  //     detalhes: "Bolo com tema de super-heróis",
  //   },
  //   isRetirada: false, // false para entrega, true para retirada
  //   formaPagamento: "pix",
  //   enderecoId: 45, // Substituir pelo ID do endereço selecionado
  //   dataEntregaEsperada: "2023-12-25T15:00:00", // Data e hora esperada
  // };
  function handleCreateOrder() {
    // Enviar o pedido para o backend - descomentar quando as outras telas estiverem prontas
    // request
    //   .post("/pedidos", pedido)
    //   .then(() => {
    //     alert("Pedido criado com sucesso!");
    //   })
    //   .catch((error) => {
    //     console.error("Erro ao criar pedido:", error);
    //     alert("Erro ao criar pedido. Tente novamente.");
    //   });
        alert("Pedido criado (mock)!\n" + JSON.stringify(product, null, 2));

  }

  return <CustomOrderView product={product} onSubmit={handleCreateOrder} />;
}
