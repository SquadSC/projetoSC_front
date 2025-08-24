import { CartView } from "../view/cart.view";


export function CartController() {
  
  const produtos = [
    {
      nome: "Personalizado",
      preco: 150.75,
      descricao: "Bolo de 1Kg, 5x Brigadeiro Gourmet, 5x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 280.75,
      descricao: "Bolo de 1.5Kg, 10x Brigadeiro Gourmet, 30x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 170.0,
      descricao: "Bolo de 1Kg, 15x Brigadeiro Gourmet, 15x Salgados."
    }, 
    {
      nome: "Personalizado",
      preco: 150.75,
      descricao: "Bolo de 1Kg, 5x Brigadeiro Gourmet, 5x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 280.75,
      descricao: "Bolo de 1.5Kg, 10x Brigadeiro Gourmet, 30x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 170.0,
      descricao: "Bolo de 1Kg, 15x Brigadeiro Gourmet, 15x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 150.75,
      descricao: "Bolo de 1Kg, 5x Brigadeiro Gourmet, 5x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 280.75,
      descricao: "Bolo de 1.5Kg, 10x Brigadeiro Gourmet, 30x Salgados."
    },
    {
      nome: "Personalizado",
      preco: 170.0,
      descricao: "Bolo de 1Kg, 15x Brigadeiro Gourmet, 15x Salgados."
    }

  ];

  return <CartView produtos={produtos} />;
}
