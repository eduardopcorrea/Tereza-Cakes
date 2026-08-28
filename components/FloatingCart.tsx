"use client";

import { useEffect, useState } from "react";
import {
  formatBRL,
  orderWhatsAppLink,
  useCart,
} from "@/lib/cart";

export function FloatingCart() {
  const {
    items,
    isOpen,
    setOpen,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    totalPrice,
  } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  // Evita mismatch de hidratação: só renderiza depois de montar no cliente.
  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-chocolate px-5 py-3 text-creme shadow-card transition-transform hover:scale-105"
        aria-label="Abrir carrinho"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="text-sm font-semibold">Carrinho</span>
        {totalItems > 0 && (
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-rosa px-1.5 text-xs font-bold text-chocolate">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-chocolate/40"
          onClick={() => setOpen(false)}
        >
          <aside
            className="flex h-full w-full max-w-md flex-col bg-creme shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Carrinho de pedidos"
          >
            <header className="flex items-center justify-between border-b border-chocolate/10 p-5">
              <h2 className="text-lg font-semibold">Seu pedido</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar carrinho"
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
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-chocolate/60">
                  Seu carrinho está vazio. Escolha algo no catálogo. 🧁
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-xl bg-white/80 p-4 ring-1 ring-chocolate/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          {item.details.map((d, i) => (
                            <p key={i} className="text-xs text-chocolate/60">
                              {d}
                            </p>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-semibold text-rosa-escuro hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Diminuir quantidade"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-7 w-7 rounded-full border border-chocolate/25 bg-white text-sm leading-none"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Aumentar quantidade"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-7 w-7 rounded-full border border-chocolate/25 bg-white text-sm leading-none"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatBRL(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-chocolate/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-chocolate/70">Total geral</span>
                <span className="font-display text-2xl font-semibold">
                  {formatBRL(totalPrice)}
                </span>
              </div>
              <a
                href={orderWhatsAppLink(items, totalPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-whatsapp mt-4 w-full ${
                  items.length === 0 ? "pointer-events-none opacity-50" : ""
                }`}
                aria-disabled={items.length === 0}
              >
                Finalizar pelo WhatsApp
              </a>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="mt-2 w-full text-xs text-chocolate/50 hover:text-chocolate"
                >
                  Esvaziar carrinho
                </button>
              )}
              <p className="mt-3 text-center text-xs text-chocolate/50">
                O pagamento e a entrada de 50% são combinados pelo WhatsApp.
              </p>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
