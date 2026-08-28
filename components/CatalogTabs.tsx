"use client";

import { useState } from "react";
import {
  CUSTOM_CAKES,
  DOCINHOS,
  DOCINHO_MINIMO,
  FIXED_CAKES,
  docinhoPrecoUnitario,
  type CustomCake,
  type Docinho,
  type FixedCake,
} from "@/lib/catalog";
import { formatBRL, useCart } from "@/lib/cart";
import { CakeCard } from "./CakeCard";
import { CustomizeModal } from "./CustomizeModal";

type Tab = "bolos" | "docinhos";

export function CatalogTabs() {
  const [tab, setTab] = useState<Tab>("bolos");
  const [modalCake, setModalCake] = useState<CustomCake | null>(null);

  return (
    <section id="catalogo" className="section">
      <div className="container-site">
        <h2 className="section-title">Catálogo</h2>
        <p className="mt-2 max-w-2xl text-chocolate/75">
          Monte seu bolo do zero ou escolha uma das nossas opções prontas. No
          final, o pedido é confirmado pelo WhatsApp.
        </p>

        <div className="mt-6 inline-flex rounded-full border border-chocolate/15 bg-white/60 p-1">
          <button
            type="button"
            onClick={() => setTab("bolos")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tab === "bolos"
                ? "bg-chocolate text-creme"
                : "text-chocolate/70 hover:text-chocolate"
            }`}
          >
            Bolos e tortas
          </button>
          <button
            type="button"
            onClick={() => setTab("docinhos")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tab === "docinhos"
                ? "bg-chocolate text-creme"
                : "text-chocolate/70 hover:text-chocolate"
            }`}
          >
            Docinhos
          </button>
        </div>

        {tab === "bolos" ? (
          <div className="mt-8 space-y-10">
            <div>
              <h3 className="text-xl font-semibold">Bolos personalizáveis</h3>
              <p className="mt-1 text-sm text-chocolate/70">
                Escolha tamanho, massa, cobertura e recheios. O preço é
                calculado na hora.
              </p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CUSTOM_CAKES.map((cake) => (
                  <CustomCakeCard
                    key={cake.id}
                    cake={cake}
                    onCustomize={() => setModalCake(cake)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Bolos prontos</h3>
              <p className="mt-1 text-sm text-chocolate/70">
                Preço fixo por tamanho, sem personalização. Escolha o tamanho e
                adicione ao carrinho.
              </p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {FIXED_CAKES.map((cake) => (
                  <FixedCakeCard key={cake.id} cake={cake} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-sm text-chocolate/70">
              Docinhos vendidos por cento, com pedido mínimo de{" "}
              {DOCINHO_MINIMO} unidades.
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DOCINHOS.map((d) => (
                <DocinhoCard key={d.id} docinho={d} />
              ))}
            </div>
          </div>
        )}
      </div>

      <CustomizeModal cake={modalCake} onClose={() => setModalCake(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function priceRange(precos: Record<number, number>): string {
  const values = Object.values(precos);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max
    ? formatBRL(min)
    : `${formatBRL(min)} – ${formatBRL(max)}`;
}

function CustomCakeCard({
  cake,
  onCustomize,
}: {
  cake: CustomCake;
  onCustomize: () => void;
}) {
  const menor = Math.min(...Object.values(cake.precoBase));
  return (
    <CakeCard
      title={cake.name}
      description={cake.description}
      priceLabel={`A partir de ${formatBRL(menor)}`}
      emoji="🎂"
      badge="Personalizável"
    >
      <button type="button" onClick={onCustomize} className="btn-primary w-full">
        Personalizar
      </button>
    </CakeCard>
  );
}

function FixedCakeCard({ cake }: { cake: FixedCake }) {
  const { addItem } = useCart();
  const tamanhos = Object.keys(cake.precos)
    .map(Number)
    .sort((a, b) => a - b);
  const [tamanho, setTamanho] = useState<number | null>(
    tamanhos.length === 1 ? tamanhos[0] : null,
  );

  const handleAdd = () => {
    if (tamanho === null) return;
    addItem({
      productId: cake.id,
      title: `${cake.name} — ${tamanho} cm`,
      details: [`Tamanho: ${tamanho} cm`],
      unitPrice: cake.precos[tamanho],
      quantity: 1,
    });
  };

  return (
    <CakeCard
      title={cake.name}
      description={cake.description}
      priceLabel={priceRange(cake.precos)}
      emoji="🍰"
      badge="Pronto"
    >
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-chocolate/60">
            Tamanho
          </span>
          <div className="mt-1 flex flex-wrap gap-2">
            {tamanhos.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTamanho(t)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  tamanho === t
                    ? "border-chocolate bg-chocolate text-creme"
                    : "border-chocolate/25 bg-white/70 hover:bg-white"
                }`}
              >
                {t} cm · {formatBRL(cake.precos[t])}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={tamanho === null}
          className="btn-primary w-full"
        >
          {tamanho === null ? "Escolha o tamanho" : "Adicionar ao carrinho"}
        </button>
      </div>
    </CakeCard>
  );
}

function DocinhoCard({ docinho }: { docinho: Docinho }) {
  const { addItem } = useCart();
  const unit = docinhoPrecoUnitario(docinho);
  const [qtd, setQtd] = useState(DOCINHO_MINIMO);

  const setSafe = (value: number) => {
    if (Number.isNaN(value)) return;
    setQtd(Math.max(DOCINHO_MINIMO, Math.round(value)));
  };

  const handleAdd = () => {
    const q = Math.max(DOCINHO_MINIMO, qtd);
    addItem({
      productId: docinho.id,
      title: docinho.name,
      details: [
        `Quantidade: ${q} unidades`,
        `${formatBRL(unit)} por unidade (${formatBRL(
          docinho.precoCento,
        )} o cento)`,
      ],
      unitPrice: unit,
      quantity: q,
    });
  };

  return (
    <CakeCard
      title={docinho.name}
      description={docinho.description}
      priceLabel={`${formatBRL(docinho.precoCento)} o cento`}
      emoji="🍬"
      badge={`Mínimo ${DOCINHO_MINIMO} unidades`}
    >
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-chocolate/60">
            Quantidade (unidades)
          </span>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              aria-label="Diminuir"
              onClick={() => setSafe(qtd - 10)}
              className="h-9 w-9 rounded-full border border-chocolate/25 bg-white/70 text-lg leading-none hover:bg-white"
            >
              −
            </button>
            <input
              type="number"
              min={DOCINHO_MINIMO}
              step={1}
              value={qtd}
              onChange={(e) => setSafe(Number(e.target.value))}
              className="w-20 rounded-lg border border-chocolate/25 bg-white px-2 py-1.5 text-center text-sm"
            />
            <button
              type="button"
              aria-label="Aumentar"
              onClick={() => setSafe(qtd + 10)}
              className="h-9 w-9 rounded-full border border-chocolate/25 bg-white/70 text-lg leading-none hover:bg-white"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-sm text-chocolate/70">
          Subtotal:{" "}
          <span className="font-semibold text-chocolate">
            {formatBRL(unit * Math.max(DOCINHO_MINIMO, qtd))}
          </span>
        </p>
        <button type="button" onClick={handleAdd} className="btn-primary w-full">
          Adicionar ao carrinho
        </button>
      </div>
    </CakeCard>
  );
}
