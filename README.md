# Med Robots

Website institucional reconstruído em React, Vite, React Router e CSS próprio. O conteúdo público é preservado em [src/data/content.json](src/data/content.json); imagens, vídeos, fontes e logótipos são servidos localmente.

## Arranque

Requer Node.js 20.19+ ou 22.12+ e npm. Na pasta do projeto:

```bash
npm ci
npm run dev
```

A aplicação local abre no endereço apresentado pelo Vite. Para verificar a entrega:

```bash
npm test
npm run lint
npm run build
npm run preview
```

O build cria `dist/`, incluindo entradas HTML com metadados específicos para cada rota, `sitemap.xml` e `robots.txt`.

## Conteúdo e rotas

Existem 18 páginas canónicas: Home, UltraBot, Benefits, Healthcare Industry, The Company, Recruitment, PharmaRobot, FAQ, Contact, Privacy, Cookies, Gender Equality, quatro vagas, Original Home e Solutions. As duas páginas históricas finais conservam conteúdo próprio e não entram no sitemap. Cinco endereços antigos redirecionam para rotas canónicas; o catálogo completo está em [src/data/routes.js](src/data/routes.js).

A fonte pública está maioritariamente em inglês. PharmaRobot está em português. A alternativa de idioma permanece desativada em cada página porque não existe uma tradução equivalente verificada. A tradução e a alternância contextual precisam de conteúdo aprovado; não há texto traduzido artificialmente.

## Formulários

O formulário de contacto e o diálogo “Order Now” usam [src/services/contactService.js](src/services/contactService.js). Sem `VITE_CONTACT_ENDPOINT`, mostram o endereço de email e não permitem um envio que aparentaria ter sido concluído. Consulte [.env.example](.env.example) e [docs/deployment.md](docs/deployment.md) para o contrato do serviço. As candidaturas abrem as instruções e o endereço de recrutamento; não enviam automaticamente emails ou anexos.

## Documentação

- [Arquitetura](docs/architecture.md)
- [Assets e proveniência](docs/assets.json)
- [Preparação de alojamento](docs/deployment.md)
- [Validação e limites](docs/qa.md)

Não foi feita publicação, alteração do domínio ou envio de mensagens reais.
