import { ORDER_INFO } from "@/lib/catalog";

const STEPS = [
  {
    n: 1,
    title: "Escolha no catálogo",
    text: "Navegue pelos bolos e docinhos e selecione o que deseja.",
  },
  {
    n: 2,
    title: "Personalize",
    text: "Nos bolos personalizáveis, defina tamanho, massa, cobertura e recheios.",
  },
  {
    n: 3,
    title: "Confirme pelo WhatsApp",
    text: "Revise o carrinho e envie o pedido com um clique. A gente responde com os detalhes.",
  },
  {
    n: 4,
    title: "Pague a entrada",
    text: "Entrada de 50% via Pix ou PicPay para reservar a data.",
  },
  {
    n: 5,
    title: "Retire ou combine a entrega",
    text: "Retirada em Vila Velha, ES, ou entrega com taxa combinada conforme o endereço.",
  },
];

export function HowToOrder() {
  return (
    <section id="como-pedir" className="section bg-rosa/10">
      <div className="container-site">
        <h2 className="section-title">Como pedir</h2>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl bg-white/80 p-5 shadow-card ring-1 ring-chocolate/5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rosa font-display text-sm font-bold text-chocolate">
                {step.n}
              </span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-chocolate/70">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-chocolate/15 bg-creme p-6">
          <h3 className="text-lg font-semibold">Informações do pedido</h3>
          <ul className="mt-3 space-y-2">
            {ORDER_INFO.map((info) => (
              <li key={info} className="flex gap-2 text-sm text-chocolate/80">
                <span aria-hidden className="text-rosa-escuro">
                  •
                </span>
                {info}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
