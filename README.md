# paulositecopy

Reprodução fiel do site institucional [medrobots.pt](https://www.medrobots.pt), reconstruída
com uma stack moderna e mantível, substituindo a implementação original em Wix.

## Objetivo desta fase

Reproduzir o conteúdo, a estrutura de páginas, a navegação e o comportamento visual do site
existente — sem redesenhar, sem corrigir texto e sem melhorar UX. Essas melhorias ficam para
uma fase seguinte.

## Stack

- React 19
- Vite
- React Router
- CSS puro (sem frameworks de UI)

## Estrutura

```
src/
├── components/   # Navbar, Footer, Hero, Button, Section, FeatureCard, ProductCard, FAQItem
├── layouts/      # MainLayout (Navbar + Outlet + Footer)
├── pages/        # Home, UltraBot, Benefits, Company, Projects, FAQ, Contact
├── data/         # navigation.js, faq.js, products.js — conteúdo do site original
├── hooks/        # useContactForm — estado e validação do formulário de contacto
└── styles/       # variables.css, globals.css, responsive.css
```

## Rotas

| Rota          | Página     |
|---------------|------------|
| `/`           | Home       |
| `/ultrabot`   | UltraBot   |
| `/benefits`   | Benefits   |
| `/thecompany` | The Company|
| `/projeto`    | Project (PharmaRobot) |
| `/faq`        | FAQ        |
| `/contacts`   | Contact    |

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Notas / próximas fases

- As imagens ainda apontam para o CDN da Wix (`static.wixstatic.com`); migração para
  `src/assets/` fica para a fase de otimização de assets.
- Suporte a PT/EN ainda não implementado — o site original tem alternância de idioma que não
  foi totalmente mapeada nesta fase.
- Formulário de contacto é apenas frontend; a integração com um backend/serviço de email fica
  para depois (a lógica já está isolada em `useContactForm`).
