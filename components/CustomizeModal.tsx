"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COBERTURAS,
  MASSAS,
  RECHEIOS_PREMIUM,
  RECHEIOS_SIMPLES,
  RECHEIO_PREMIUM_PRICE,
  type Cobertura,
  type CustomCake,
  type Massa,
  type TamanhoCustom,
} from "@/lib/catalog";
import { formatBRL, useCart } from "@/lib/cart";

interface CustomizeModalProps {
  cake: CustomCake | null;
  onClose: () => void;
}

export function CustomizeModal({ cake, onClose }: CustomizeModalProps) {
  const { addItem } = useCart();

  const [tamanho, setTamanho] = useState<TamanhoCustom | null>(null);
  const [massa, setMassa] = useState<Massa | null>(null);
  const [cobertura, setCobertura] = useState<Cobertura | null>(null);
  const [recheios, setRecheios] = useState<string[]>([]);

  // Reinicia as escolhas sempre que abre um novo bolo.
  useEffect(() => {
    setTamanho(null);
    setMassa(null);
    setCobertura(null);
    setRecheios([]);
  }, [cake]);

  // Fecha com ESC.
  useEffect(() => {
    if (!cake) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cake, onClose]);

  const tamanhos = useMemo(
    () =>
      cake
        ? (Object.keys(cake.precoBase)
            .map(Number)
            .sort((a, b) => a - b) as TamanhoCustom[])
        : [],
    [cake],
  );

  const premiumCount = recheios.filter((name) =>
    RECHEIOS_PREMIUM.some((r) => r.name === name),
  ).length;

  const precoBase = cake && tamanho ? cake.precoBase[tamanho] : 0;
  const total = precoBase + premiumCount * RECHEIO_PREMIUM_PRICE;

  if (!cake) return null;

  const canAdd =
    tamanho !== null &&
    massa !== null &&
    cobertura !== null &&
    recheios.length > 0;

  const toggleRecheio = (name: string) => {
    setRecheios((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const handleAdd = () => {
    if (!canAdd || tamanho === null) return;
    const details = [
      `Tamanho: ${tamanho} cm`,
      `Massa: ${massa}`,
      `Cobertura: ${cobertura}`,
      `Recheios: ${recheios.join(", ")}`,
    ];
    if (premiumCount > 0) {
      details.push(
        `${premiumCount} recheio(s) premium (+${formatBRL(
          premiumCount * RECHEIO_PREMIUM_PRICE,
        )})`,
      );
    }
    addItem({
      productId: cake.id,
      title: `${cake.name} — ${tamanho} cm`,
      details,
      unitPrice: total,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-chocolate/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Personalizar ${cake.name}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-creme p-6 shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{cake.name}</h3>
            <p className="mt-1 text-sm text-chocolate/70">{cake.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1 text-chocolate/60 hover:bg-white/70 hover:text-chocolate"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>

        {/* 1. Tamanho */}
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">1. Escolha o tamanho</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {tamanhos.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTamanho(t)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  tamanho === t
                    ? "border-chocolate bg-chocolate text-creme"
                    : "border-chocolate/25 bg-white/70 hover:bg-white"
                }`}
              >
                {t} cm — {formatBRL(cake.precoBase[t])}
              </button>
            ))}
          </div>
        </fieldset>

        {/* 2. Massa */}
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">2. Escolha a massa</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {MASSAS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMassa(m)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  massa === m
                    ? "border-chocolate bg-chocolate text-creme"
                    : "border-chocolate/25 bg-white/70 hover:bg-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </fieldset>

        {/* 3. Cobertura */}
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">
            3. Escolha a cobertura
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {COBERTURAS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCobertura(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  cobertura === c
                    ? "border-chocolate bg-chocolate text-creme"
                    : "border-chocolate/25 bg-white/70 hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        {/* 4. Recheios */}
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">
            4. Escolha os recheios
          </legend>
          <p className="mt-1 text-xs text-chocolate/60">
            Recheios simples são gratuitos. Cada recheio premium adiciona{" "}
            {formatBRL(RECHEIO_PREMIUM_PRICE)}.
          </p>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-chocolate/50">
            Simples (grátis)
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {RECHEIOS_SIMPLES.map((r) => (
              <label
                key={r.name}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  recheios.includes(r.name)
                    ? "border-chocolate bg-white"
                    : "border-chocolate/20 bg-white/60"
                }`}
              >
                <input
                  type="checkbox"
                  checked={recheios.includes(r.name)}
                  onChange={() => toggleRecheio(r.name)}
                  className="accent-chocolate"
                />
                {r.name}
              </label>
            ))}
          </div>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-chocolate/50">
            Premium (+{formatBRL(RECHEIO_PREMIUM_PRICE)} cada)
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {RECHEIOS_PREMIUM.map((r) => (
              <label
                key={r.name}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  recheios.includes(r.name)
                    ? "border-chocolate bg-white"
                    : "border-chocolate/20 bg-white/60"
                }`}
              >
                <input
                  type="checkbox"
                  checked={recheios.includes(r.name)}
                  onChange={() => toggleRecheio(r.name)}
                  className="accent-chocolate"
                />
                {r.name}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 5. Total + 6. Adicionar */}
        <div className="sticky bottom-0 mt-6 -mx-6 -mb-6 border-t border-chocolate/10 bg-creme px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-chocolate/70">Preço total</span>
            <span className="font-display text-2xl font-semibold">
              {formatBRL(total)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="btn-primary mt-3 w-full"
          >
            {canAdd
              ? "Adicionar ao carrinho"
              : "Selecione tamanho, massa, cobertura e recheio"}
          </button>
        </div>
      </div>
    </div>
  );
}
