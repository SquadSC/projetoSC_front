# React + Vite

Este projeto foi criado com **React + Vite**, já configurado com HMR (Hot Module Replacement) e ESLint.  

Existem dois plugins oficiais:  

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) → usa **Babel**  
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) → usa **SWC**  

---

# Como criar uma nova tela (página) no projeto

Este guia mostra **passo a passo** como adicionar uma página no projeto, mesmo que você não conheça muito de React.

---

## 1. Crie a pasta da nova página

No diretório `src/pages`, crie uma pasta com o nome da página.  
Exemplo: `profile`

Estrutura sugerida:

```
src/pages/profile/
  index.page.jsx
  controller/
    profile.controller.jsx
  view/
    profile.view.jsx
  components/
```

---

## 2. Crie o componente de visualização (View)

A **View** é a parte visual da página.  

No arquivo `src/pages/profile/view/profile.view.jsx`:

```jsx
export function ProfileView() {
  return <h1>Profile Page</h1>;
}
```

---

## 3. Crie o controller da página

O **Controller** é responsável pela lógica da página (ex: chamar API, estados) e renderizar a View.  

No arquivo `src/pages/profile/controller/profile.controller.jsx`:

```jsx
import { ProfileView } from '../view/profile.view';

export function ProfileController() {
  return <ProfileView />;
}
```

---

## 4. Exporte o controller no index da página

No arquivo `src/pages/profile/index.page.jsx`:

```jsx
export { ProfileController } from './controller/profile.controller';
```

---

## 5. Adicione o caminho da rota no `routes-url.js`

Sempre centralizamos as rotas no arquivo `src/utils/enums/routes-url.js`:  

```js
export const ROUTES_PATHS = {
  // ...outras rotas
  PROFILE: '/profile',
};
```

Isso evita que cada pessoa coloque rotas soltas pelo projeto.  

---

## 6. Adicione a rota no `routes.jsx`

Abra `src/routes.jsx` e:  

- Importe o controller:
  ```jsx
  import { ProfileController } from './pages/profile/index.page';
  ```

- Adicione ao array de rotas:
  ```jsx
  const routes = [
    // ...outras rotas
    {
      path: ROUTES_PATHS.PROFILE,
      element: <ProfileController />,
    },
  ];
  ```

---

## 7. Teste a nova página

Rode o projeto e acesse no navegador:  
👉 `http://localhost:5173/profile`

Você deverá ver o título `Profile Page`.

---

## Estrutura final do projeto (exemplo com `profile`)

```
src/
  pages/
    profile/
      index.page.jsx
      controller/
        profile.controller.jsx
      view/
        profile.view.jsx
      components/
  utils/
    enums/
      routes-url.js
  routes.jsx
```

---

## Dicas rápidas

- Sempre crie **uma pasta por página**.  
- Use **nomes em inglês** para arquivos e pastas.  
- Se precisar de componentes reutilizáveis, coloque-os dentro da pasta `components` da página.  
- Para dúvidas, fale com **@EduardoAAzevedo** ou consulte a documentação do React e Material UI.  
