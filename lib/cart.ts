"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CONTACT, whatsappLink } from "./catalog";

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export interface CartItem {
  /** Identificador único da linha do carrinho. */
  id: string;
  /** Identificador do produto de origem. */
  productId: string;
  title: string;
  /** Linhas de personalização exibidas abaixo do título. */
  details: string[];
  /** Preço por unidade. */
  unitPrice: number;
  quantity: number;
}

export type NewCartItem = Omit<CartItem, "id">;

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: NewCartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const STORAGE_KEY = "tereza-cakes-cart";

function loadItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

/** Monta a mensagem de texto do pedido para o WhatsApp. */
export function buildOrderMessage(items: CartItem[], total: number): string {
  if (items.length === 0) return CONTACT.defaultMessage;

  const lines: string[] = [
    "Olá, Tereza Cakes! Gostaria de fazer o seguinte pedido:",
    "",
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}) ${item.title} — ${item.quantity}x ${formatBRL(
        item.unitPrice,
      )} = ${formatBRL(item.unitPrice * item.quantity)}`,
    );
    item.details.forEach((d) => lines.push(`   • ${d}`));
  });

  lines.push("");
  lines.push(`Total: ${formatBRL(total)}`);
  lines.push("");
  lines.push("Podemos combinar a entrada e a retirada/entrega?");

  return lines.join("\n");
}

export function orderWhatsAppLink(items: CartItem[], total: number): string {
  return whatsappLink(buildOrderMessage(items, total));
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* localStorage indisponível — persistência é só um bônus */
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: NewCartItem) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setItems((prev) => [...prev, { ...item, id }]);
    setOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, quantity) } : it,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    isOpen,
    setOpen,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    totalPrice,
  };

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de <CartProvider>");
  }
  return ctx;
}
