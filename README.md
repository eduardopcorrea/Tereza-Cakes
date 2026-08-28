# Tereza Cakes

Site institucional/vitrine da confeitaria **Tereza Cakes** — bolos de encomenda,
bolos prontos e docinhos. O pedido é montado no site (carrinho local) e
finalizado por um link de WhatsApp com a mensagem já preenchida.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Fontes: Fraunces (títulos) e DM Sans (texto), via `next/font/google`
- Sem backend, banco de dados ou autenticação — pronto para deploy na Vercel

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```bash
npm run build    # build de produção (rodar antes de entregar)
npm run start    # servir o build de produção
npm run lint
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Produtos, preços, recheios, tamanhos | [lib/catalog.ts](lib/catalog.ts) |
| Contato, endereço, horários, regras de pedido | [lib/catalog.ts](lib/catalog.ts) (`CONTACT`, `HOURS`, `ORDER_INFO`) |
| Lógica do carrinho e mensagem do WhatsApp | [lib/cart.ts](lib/cart.ts) |
| Seções da home | [app/page.tsx](app/page.tsx) + `components/` |
| Cores e fontes | [tailwind.config.ts](tailwind.config.ts) |

## Deploy na Vercel

Importar o repositório na Vercel — nenhuma configuração extra é necessária.

## Pasta `ignorados/`

Arquivos que não fazem parte do funcionamento do site (briefings, anotações,
rascunhos) ficam em `ignorados/` e não são importados por nenhum componente.
Veja [CLAUDE.md](CLAUDE.md).
