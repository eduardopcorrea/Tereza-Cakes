import Image from "next/image";
import { whatsappLink } from "@/lib/catalog";

export function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-20 bg-gradient-to-b from-rosa/40 via-rosa-claro to-creme"
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

        <div className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-rosa/40 to-white p-6 shadow-card ring-1 ring-white/60">
            <Image
              src="/logo.jpg"
              alt="Logo da Tereza Cakes"
              width={150}
              height={150}
              priority
              className="mx-auto h-auto w-full max-w-[240px] rounded-2xl"
            />
            <p className="mt-4 text-center font-display text-lg text-chocolate/70">
              Cada bolo é único, assim como a sua festa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
