const BENEFITS = [
  {
    icon: "🥣",
    title: "Produção artesanal",
    text: "Tudo feito à mão, em pequenas fornadas, do jeito caseiro.",
  },
  {
    icon: "🎉",
    title: "Para celebrações",
    text: "Aniversários, chás, casamentos e cada motivo para comemorar.",
  },
  {
    icon: "💬",
    title: "Atendimento personalizado",
    text: "Você monta o bolo do seu jeito e combina tudo direto com a Tereza.",
  },
  {
    icon: "🌿",
    title: "Ingredientes selecionados",
    text: "Matéria-prima de qualidade para um sabor que faz diferença.",
  },
];

export function Benefits() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white/70 p-6 shadow-card ring-1 ring-chocolate/5"
            >
              <span className="text-3xl" role="img" aria-hidden>
                {b.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-chocolate/75">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
