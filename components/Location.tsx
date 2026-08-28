import { CONTACT, mapsLink } from "@/lib/catalog";

export function Location() {
  return (
    <section id="localizacao" className="section bg-rosa/10">
      <div className="container-site max-w-2xl">
        <h2 className="section-title">Localização</h2>
        <p className="mt-4 text-chocolate/80">{CONTACT.address}</p>
        <a
          href={mapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-6"
        >
          Abrir no Google Maps
        </a>
      </div>
    </section>
  );
}
