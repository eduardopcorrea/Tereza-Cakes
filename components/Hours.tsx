import { HOURS } from "@/lib/catalog";

export function Hours() {
  return (
    <section id="horarios" className="section">
      <div className="container-site max-w-2xl">
        <h2 className="section-title">Horários</h2>
        <p className="mt-2 text-chocolate/75">
          Atendimento para pedidos e retiradas.
        </p>

        <ul className="mt-6 divide-y divide-chocolate/10 overflow-hidden rounded-2xl bg-white/80 shadow-card ring-1 ring-chocolate/5">
          {HOURS.map((h) => (
            <li
              key={h.label}
              className="flex items-center justify-between px-5 py-4"
            >
              <span className="font-medium">{h.label}</span>
              <span className="text-chocolate/75">{h.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
