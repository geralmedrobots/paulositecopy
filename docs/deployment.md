# Preparação para publicação

O projeto foi preparado localmente. Não houve publicação, push ou alteração de DNS. Execute `npm ci`, `npm test`, `npm run lint` e `npm run build` antes de distribuir `dist/`. Configure `VITE_SITE_URL` para a origem HTTPS definitiva antes do build; confirme o domínio e os caminhos de `sitemap.xml`, `robots.txt`, favicon, imagem Open Graph e páginas HTML geradas.

O alojamento deve servir ficheiros estáticos de `dist/` e aceitar acesso direto a cada rota. Para cada caminho canónico sem extensão, sirva `dist/<caminho>/index.html`; o fallback genérico para `dist/index.html` daria os metadados da Home às outras páginas. Configure redirecionamentos HTTP permanentes dos cinco aliases em `src/data/routes.js` para os destinos canónicos, conservando a query string. Para caminhos desconhecidos, sirva `dist/404.html` com estado HTTP 404. O redirecionamento no cliente conserva também o fragmento. `npm run preview` implementa estas regras apenas para validação local; configure as regras equivalentes no alojamento escolhido.

## Serviço de contacto

Ainda não existe endpoint de envio. Crie um serviço próprio ou escolha um serviço aprovado e defina `VITE_CONTACT_ENDPOINT` no ambiente do build como um caminho da mesma origem (por exemplo `/api/contact`) ou um endereço HTTPS autorizado. `VITE_*` é público no bundle: não inclua tokens nem credenciais. Se a origem for diferente, configure CORS estritamente para a origem do website.

O frontend envia um POST JSON deste formato:

```json
{
  "kind": "contact",
  "fields": {
    "firstName": "",
    "lastName": "",
    "email": "name@example.com",
    "phone": "",
    "address": "",
    "message": ""
  },
  "requestId": "uuid"
}
```

`kind` também pode ser `order`, com campos `name`, `email`, `message`. O serviço deve validar novamente todos os dados, impedir abuso e duplicações por `requestId`, processar a mensagem e responder com estado 2xx e JSON `{ "ok": true }` apenas depois de aceitar efetivamente a entrega. Respostas não confirmadas ou falhas deixam o formulário em erro. Confirme privacidade, retenção, antifraude e forma de notificação antes de ativar envios. Teste a integração num ambiente controlado, sem contactar clientes reais.

## Conteúdo de idioma

É necessário disponibilizar e aprovar traduções equivalentes PT/EN de cada página para ativar a alternância no mesmo contexto. O projeto conserva o conteúdo de origem e identifica o idioma de cada página. A mudança de idioma está desativada até este conteúdo existir.
