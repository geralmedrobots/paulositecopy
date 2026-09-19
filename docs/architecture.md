# Arquitetura

A aplicação mantém a estrutura inicial: `src/components`, `src/layouts`, `src/pages`, `src/data`, `src/styles`, `src/hooks`, `src/App.jsx` e `src/main.jsx`. O catálogo de rotas em `src/data/routes.js` controla páginas, idioma de origem, aliases, sitemap e metadados. `src/data/content.json` contém os textos públicos em blocos simples; `faq.js`, `contact.js`, `forms.js` e `jobs.js` cobrem os restantes dados. Os componentes renderizam JSX e CSS próprios, sem HTML ou runtime gerados pela plataforma anterior.

`MainLayout` partilha Navbar, Footer, ligação para saltar ao conteúdo e gestão de foco na mudança de rota. As páginas são carregadas por rota. `Hero`, `ImageSection`, `Media`, `Content` e `Section` concentram os padrões visuais. Os diálogos de orçamento e candidatura usam o elemento nativo `<dialog>`; vídeo de fundo permite pausa e respeita a preferência de movimento reduzido. A FAQ apresenta todas as respostas, como na fonte pública. Os estilos usam camadas `base`, `components` e `responsive`, com regras responsive centralizadas.

Os ficheiros de `src/assets` contêm os meios locais. `src/data/assets.js` associa nomes semânticos, dimensões e textos alternativos; [assets.json](assets.json) regista página, secção, ficheiro, dimensões, tamanho e hash. As fotografias foram convertidas com qualidade alta e mantidas visualmente próximas dos originais; não há pedidos de imagem ou vídeo a serviços externos em execução.

O formulário é controlado por `useContactForm` e entrega dados através de `contactService`. A validação impede emails inválidos, o identificador de tentativa ajuda o serviço a evitar duplicações, e só uma resposta JSON `{ "ok": true }` produz sucesso. Sem endpoint, a submissão é desativada. A proteção contra abuso, validação do lado do servidor, armazenamento e entrega real pertencem ao serviço a ligar posteriormente.

O documento declara o idioma verdadeiro da rota: `en` na maioria das páginas e `pt` em PharmaRobot. A indicação do outro idioma é desativada enquanto não existir conteúdo equivalente aprovado. Esta é uma limitação editorial, não uma tradução parcial apresentada como completa.

No build, `scripts/build-pages.js` produz entradas HTML com título, descrição, canonical, Open Graph, idioma e política de indexação por rota. `SEO` atualiza esses elementos durante a navegação client-side. As páginas históricas distintas têm `noindex`; o projeto duplicado usa redirecionamento. O HTML inicial contém metadados, mas o corpo da aplicação continua a ser renderizado por React no browser.
