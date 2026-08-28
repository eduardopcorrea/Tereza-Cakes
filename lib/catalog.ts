/**
 * Catálogo da Tereza Cakes.
 *
 * TODOS os dados de produtos e preços ficam centralizados aqui para facilitar
 * edição futura. Nenhum outro arquivo deve "hardcodar" preço ou nome de produto.
 */

/* ------------------------------------------------------------------ */
/* Contato e informações gerais                                        */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  whatsappNumber: "5527995733887",
  whatsappDisplay: "+55 27 99573-3887",
  defaultMessage:
    "Olá! Quero conhecer o catálogo da Tereza Cakes e fazer um pedido.",
  instagram: "https://www.instagram.com/tecalyriocakes/",
  address:
    "Ed Rio Branco - R. Felipe dos Santos, 56 - apto 202 - Itapuã, Vila Velha - ES, 29101-535",
  addressShort: "Itapuã, Vila Velha - ES",
} as const;

/** Monta um link wa.me com a mensagem já codificada. */
export function whatsappLink(message: string = CONTACT.defaultMessage): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

/** Link de busca do Google Maps para o endereço da confeitaria. */
export function mapsLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CONTACT.address,
  )}`;
}

export const HOURS: { label: string; value: string }[] = [
  { label: "Segunda a Sexta", value: "08:30 – 18:30" },
  { label: "Sábado", value: "08:30 – 12:00" },
  { label: "Domingo", value: "Fechado" },
];

export const ORDER_INFO: string[] = [
  "Antecedência mínima de 3 dias para encomendas.",
  "Entrada de 50% do valor para confirmar o pedido.",
  "Pagamento via Pix ou PicPay.",
  "Retirada no local, em Vila Velha - ES.",
  "Taxa de entrega combinada por WhatsApp conforme o endereço de entrega.",
];

/* ------------------------------------------------------------------ */
/* Bolos customizáveis (abrem o modal de personalização)               */
/* ------------------------------------------------------------------ */

export type Massa = "Chocolate" | "Baunilha";
export type Cobertura = "Chantilly" | "Pasta americana" | "Chocolate";

export const MASSAS: Massa[] = ["Chocolate", "Baunilha"];
export const COBERTURAS: Cobertura[] = [
  "Chantilly",
  "Pasta americana",
  "Chocolate",
];

export interface Recheio {
  name: string;
  premium: boolean;
  /** Custo adicional por bolo (0 para os simples). */
  price: number;
}

export const RECHEIO_PREMIUM_PRICE = 15;

export const RECHEIOS_SIMPLES: Recheio[] = [
  "Brigadeiro",
  "Brigadeiro branco",
  "Doce de leite",
  "Beijinho",
].map((name) => ({ name, premium: false, price: 0 }));

export const RECHEIOS_PREMIUM: Recheio[] = [
  "Ninho",
  "Damasco",
  "Nozes",
  "Ameixa",
  "Laranja",
  "Limão siciliano",
  "Brigadeiro com Nutella",
  "Chocolate meio amargo",
  "Doce de leite com nozes",
  "Baunilha com geleia de morango",
].map((name) => ({ name, premium: true, price: RECHEIO_PREMIUM_PRICE }));

export const RECHEIOS: Recheio[] = [...RECHEIOS_SIMPLES, ...RECHEIOS_PREMIUM];

/** Tamanhos disponíveis para bolos customizáveis, em cm. */
export type TamanhoCustom = 10 | 15 | 17 | 20 | 25;

export interface CustomCake {
  id: string;
  name: string;
  description: string;
  /** Preço base por tamanho (cm → R$). */
  precoBase: Record<TamanhoCustom, number>;
}

export const CUSTOM_CAKES: CustomCake[] = [
  {
    id: "naked-rustico",
    name: "Naked Cake ou Rústico",
    description:
      "Camadas à mostra, com pouco creme por fora. Charme artesanal para festas descontraídas.",
    precoBase: { 10: 50, 15: 150, 17: 230, 20: 350, 25: 470 },
  },
  {
    id: "chantilly-chocolate",
    name: "Chantilly ou Chocolate",
    description:
      "Cobertura lisa de chantilly ou ganache de chocolate. Clássico e elegante.",
    precoBase: { 10: 60, 15: 160, 17: 250, 20: 370, 25: 490 },
  },
  {
    id: "pasta-americana",
    name: "Pasta americana",
    description:
      "Acabamento perfeito em pasta americana, ideal para bolos temáticos e decorados.",
    precoBase: { 10: 80, 15: 190, 17: 290, 20: 430, 25: 560 },
  },
];

/* ------------------------------------------------------------------ */
/* Bolos sem customização (preço fixo por tamanho)                     */
/* ------------------------------------------------------------------ */

export interface FixedCake {
  id: string;
  name: string;
  description: string;
  /** cm → R$ */
  precos: Record<number, number>;
}

export const FIXED_CAKES: FixedCake[] = [
  {
    id: "caseirinho",
    name: "Bolo Caseirinho",
    description: "Bolo caseiro simples, sem cobertura. Aquele sabor de casa.",
    precos: { 12: 8, 16: 14, 17: 18, 20: 20, 25: 30 },
  },
  {
    id: "caseirinho-cobertura",
    name: "Bolo Caseirinho com cobertura",
    description: "O caseirinho com uma cobertura carinhosa por cima.",
    precos: { 12: 15, 16: 18, 17: 28, 20: 70, 25: 85 },
  },
  {
    id: "piscininha",
    name: "Bolo Piscininha",
    description: "Bolo piscininha, apenas no tamanho 25 cm.",
    precos: { 25: 85 },
  },
];

/* ------------------------------------------------------------------ */
/* Docinhos (vendidos por cento, mínimo 30 unidades)                   */
/* ------------------------------------------------------------------ */

export const DOCINHO_MINIMO = 30;

export interface Docinho {
  id: string;
  name: string;
  description: string;
  /** Preço do cento (100 unidades). */
  precoCento: number;
}

export const DOCINHOS: Docinho[] = [
  {
    id: "bombons-especiais",
    name: "Bombons especiais",
    description: "Bombons finos recheados, feitos à mão.",
    precoCento: 380,
  },
  {
    id: "docinho-simples",
    name: "Docinho simples",
    description: "Brigadeiro, beijinho e companhia, enrolados na hora.",
    precoCento: 190,
  },
  {
    id: "docinho-saborizado",
    name: "Docinho saborizado",
    description: "Docinhos gourmet em sabores especiais.",
    precoCento: 280,
  },
];

/** Preço unitário do docinho (cento ÷ 100). */
export function docinhoPrecoUnitario(d: Docinho): number {
  return d.precoCento / 100;
}
