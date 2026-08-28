# CLAUDE.md — Site Tereza Cakes

## Sobre o projeto

Site institucional/vitrine para a confeitaria **Tereza Cakes**.

- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Deploy:** Vercel (zero configuração adicional)
- **Sem** backend, banco de dados ou autenticação. O pedido final é sempre
  concluído via link do WhatsApp (`wa.me`) com mensagem pré-preenchida.
- Especificação completa do site em
  [ignorados/prompt-claude-code-tereza-cakes.md](ignorados/prompt-claude-code-tereza-cakes.md).

## Regra: organização de arquivos não-funcionais

**Tudo que não for código ou asset de funcionamento do site deve ficar dentro
da pasta `ignorados/` na raiz do projeto.**

Isso inclui, entre outros:

- prompts e briefings em markdown
- anotações, rascunhos e documentação extra gerada durante o processo
- scripts auxiliares de uso único, saídas de análise, arquivos temporários
- qualquer artefato que não seja importado/servido pelo site

Regras da pasta `ignorados/`:

- Não faz parte do site e **não deve ser importada por nenhum componente**.
- Vale para qualquer arquivo desse tipo criado agora ou no futuro — ao gerar
  um arquivo não-funcional, salve-o direto em `ignorados/`.
- Exceções que permanecem na raiz por convenção de ferramentas: este
  `CLAUDE.md`, `README.md`, e arquivos de configuração exigidos na raiz
  (`package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, etc.).

## Comandos

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção — rodar antes de entregar
npm run start    # servir build de produção
```
