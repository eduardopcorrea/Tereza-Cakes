import { whatsappLink } from "@/lib/catalog";

export function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-20 bg-gradient-to-b from-rosa/25 via-creme to-creme"
    >
      <div className="container-site grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-chocolate/70">
            Confeitaria artesanal · Vila Velha, ES
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Bolos feitos à mão para adoçar as suas celebrações
          </h1>
          <p className="mt-5 max-w-lg text-lg text-chocolate/80">
            Bolos de encomenda personalizados, bolos caseiros e docinhos
            preparados com ingredientes selecionados e todo carinho da Tereza
            Cakes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalogo" className="btn-primary">
              Ver catálogo
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Pedir pelo WhatsApp
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-rosa/40 to-white shadow-card ring-1 ring-white/60">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="text-6xl" role="img" aria-label="Bolo">
                🎂
              </span>
              <p className="font-display text-xl text-chocolate/70">
                Cada bolo é único, assim como a sua festa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
