# PROMPT PARA O CLAUDE CODE — Site Tereza Cakes

Copie e cole o conteúdo abaixo inteiro no Claude Code, dentro da pasta onde quer criar o projeto.

---

Crie um site institucional/vitrine para a confeitaria **Tereza Cakes**, usando **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, pronto para deploy na Vercel. É um site simples, sem backend, sem banco de dados e sem autenticação — o "pedido" final é sempre finalizado via link do WhatsApp com mensagem pré-preenchida.

Há um arquivo de logo em anexo (`Tereza Cakes.jpg`) — use-o em `public/logo.jpg` (converta/otimize se necessário) no header e no favicon.

## Stack e estrutura de pastas

```
tereza-cakes/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Benefits.tsx
│   ├── CatalogTabs.tsx
│   ├── CakeCard.tsx
│   ├── CustomizeModal.tsx
│   ├── FloatingCart.tsx
│   ├── HowToOrder.tsx
│   ├── Hours.tsx
│   ├── Location.tsx
│   └── Footer.tsx
├── lib/
│   ├── catalog.ts
│   └── cart.ts
└── public/
    └── logo.jpg
```

Use `next/font/google` para carregar **Fraunces** (headlines) e **DM Sans** (corpo do texto).

## Identidade visual

- Cores (definir no `tailwind.config.ts` como cores custom): rosa suave `#D4A5A5`, branco, creme (tom quente claro, ex: `#FAF3EC`), chocolate (marrom escuro, ex: `#4A2C2A`)
- Layout responsivo, mobile-first (nav vira menu hambúrguer no celular)
- Visual artesanal, acolhedor, elegante — nada de aparência corporativa genérica

## Dados do catálogo (`lib/catalog.ts`)

Centralize TODOS os dados de produtos e preços neste arquivo, tipados, para facilitar edição futura:

**Massas:** Chocolate, Baunilha

**Cobertura:** Chantilly, Pasta americana, Chocolate

**Recheios simples (sem custo adicional):** Brigadeiro, Brigadeiro branco, Doce de leite, Beijinho

**Recheios premium (R$15 cada):** Ninho, Damasco, Nozes, Ameixa, Laranja, Limão siciliano, Brigadeiro com Nutella, Chocolate meio amargo, Doce de leite com nozes, Baunilha com geleia de morango

**Bolos de encomenda (customizáveis) — preço base por tipo e tamanho:**

| Tipo | 10cm | 15cm | 17cm | 20cm | 25cm |
|---|---|---|---|---|---|
| Naked Cake ou Rústico | R$50 | R$150 | R$230 | R$350 | R$470 |
| Chantilly ou Chocolate | R$60 | R$160 | R$250 | R$370 | R$490 |
| Pasta americana | R$80 | R$190 | R$290 | R$430 | R$560 |

**Bolos sem customização (preço fixo, sem modal):**

| Produto | 12cm | 16cm | 17cm | 20cm | 25cm |
|---|---|---|---|---|---|
| Bolo Caseirinho | R$8 | R$14 | R$18 | R$20 | R$30 |
| Bolo Caseirinho com cobertura | R$15 | R$18 | R$28 | R$70 | R$85 |

**Bolo Piscininha:** apenas 25cm, R$85 (sem customização)

**Docinhos (vendidos por cento, mínimo 30 unidades):**
- Bombons especiais: R$380 o cento
- Docinho simples: R$190 o cento
- Docinho saborizado: R$280 o cento

## Informações de contato e localização (usar em todo o site)

- **WhatsApp:** +55 27 99573-3887 — link `https://wa.me/5527995733887?text=...`
- **Mensagem padrão inicial:** "Olá! Quero conhecer o catálogo da Tereza Cakes e fazer um pedido."
- **Endereço:** Ed Rio Branco - R. Felipe dos Santos, 56 - apto 202 - Itapuã, Vila Velha - ES, 29101-535
- **Instagram:** https://www.instagram.com/tecalyriocakes/

**Horários:**
- Segunda a Sexta: 08:30–18:30
- Sábado: 08:30–12:00
- Domingo: Fechado

**Informações de pedido (mostrar na seção "Como pedir"):**
- Antecedência mínima: 3 dias
- Entrada: 50% do valor
- Pagamento: Pix ou PicPay
- Retirada: local em Vila Velha, ES
- Taxa de entrega: configurável conforme localização (deixar texto genérico avisando que a taxa é combinada por WhatsApp conforme o endereço)

## Navegação

Header fixo (sticky) com âncoras: **Início | Catálogo | Como pedir | Horários | Localização**, mais logo à esquerda e botão de WhatsApp visível.

## Seções da homepage (`app/page.tsx`), nesta ordem

1. **Hero** — headline forte, subtítulo, foto/placeholder ilustrativo, dois CTAs (ex: "Ver catálogo" e "Pedir pelo WhatsApp")
2. **Benefícios** — 4 cards: produção artesanal, celebrações, atendimento personalizado, ingredientes selecionados (ícones simples)
3. **Catálogo** — com abas: **"Bolos e tortas"** e **"Docinhos"**
   - Aba Bolos: cards para os bolos customizáveis (abrem o modal de personalização) + cards para os bolos sem customização (Caseirinho, Caseirinho com cobertura, Piscininha) com preço fixo e botão "adicionar direto" (pede pra escolher o tamanho antes)
   - Aba Docinhos: cards para os 3 tipos, com nota "mínimo 30 unidades" e seletor de quantidade (múltiplos de 30 ou livre, mas nunca abaixo de 30)
4. **"Como pedir"** — passo a passo (escolher no catálogo → personalizar → confirmar pelo WhatsApp → pagar entrada → retirar/combinar entrega) + as informações de pedido listadas acima
5. **Horários** — tabela/lista simples
6. **Localização** — endereço em texto + botão que abre o Google Maps em nova aba (`https://www.google.com/maps/search/?api=1&query=...`)
7. **Footer** — logo, links rápidos, WhatsApp, Instagram, endereço resumido, direitos reservados

## Modal de personalização (`CustomizeModal.tsx`)

Abre ao clicar em um bolo customizável. Fluxo:
1. Escolher **tamanho** (define o preço base conforme a tabela do tipo de bolo)
2. Escolher **massa** (Chocolate ou Baunilha)
3. Escolher **cobertura** (Chantilly, Pasta americana ou Chocolate)
4. Escolher **recheios** — múltipla seleção entre simples (grátis) e premium (+R$15 cada, mostrar isso claramente)
5. Mostrar **preço total calculado em tempo real** (base do tamanho + soma dos recheios premium escolhidos)
6. Botão "Adicionar ao carrinho"

## Carrinho (`lib/cart.ts` + `FloatingCart.tsx`)

- Estado local em React (Context ou useState no nível da página), sem persistência obrigatória (localStorage é um bônus, não requisito)
- Ícone flutuante fixo (canto inferior direito) mostrando quantidade de itens
- Ao abrir: lista de itens com suas customizações e preço unitário, botão de remover, e **total geral calculado automaticamente**
- Botão **"Finalizar pelo WhatsApp"**: monta uma mensagem de texto formatada com todos os itens, customizações e o valor total, e abre `wa.me` com esse texto codificado (`encodeURIComponent`)

## Requisitos técnicos finais

- TypeScript em todo o projeto, com tipos para os produtos e itens do carrinho
- Sem chamadas de API externas, sem banco de dados, sem autenticação
- `next.config.js` e demais configs prontos para deploy direto na Vercel (zero configuração adicional)
- Metadata (`title`, `description`, favicon com a logo) configurada no `layout.tsx` para SEO básico
- Testar responsividade mobile e desktop
- Rodar `npm run build` ao final para garantir que não há erros antes de entregar

## Organização de arquivos não-funcionais

Tudo que não for código/asset de funcionamento do site (este prompt em markdown, anotações, rascunhos, documentação extra que você gerar durante o processo, etc.) deve ficar dentro de uma pasta **`ignorados/`** na raiz do projeto — inclusive este próprio arquivo de prompt, que deve ser movido/salvo em `ignorados/prompt-claude-code-tereza-cakes.md`. Essa pasta não faz parte do site e não deve ser importada por nenhum componente. Essa regra já está registrada no `CLAUDE.md` do projeto — siga-a também para qualquer novo arquivo desse tipo que você criar depois.
