import Image from "next/image";
import { CONTACT, whatsappLink } from "@/lib/catalog";

const QUICK_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#como-pedir", label: "Como pedir" },
  { href: "#horarios", label: "Horários" },
  { href: "#localizacao", label: "Localização" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-chocolate/10 bg-creme">
      <div className="container-site grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Tereza Cakes"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-chocolate/15"
            />
            <span className="font-display text-lg font-semibold">
              Tereza Cakes
            </span>
          </div>
          <p className="mt-3 text-sm text-chocolate/70">
            Confeitaria artesanal em {CONTACT.addressShort}.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-chocolate/60">
            Links rápidos
          </h3>
          <ul className="mt-3 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-chocolate/75 hover:text-chocolate"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-chocolate/60">
            Contato
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-chocolate/75">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-chocolate"
              >
                WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-chocolate"
              >
                Instagram @tecalyriocakes
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-chocolate/60">
            Endereço
          </h3>
          <p className="mt-3 text-sm text-chocolate/75">{CONTACT.address}</p>
        </div>
      </div>

      <div className="border-t border-chocolate/10 py-5">
        <p className="container-site text-center text-xs text-chocolate/50">
          © {year} Tereza Cakes. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
