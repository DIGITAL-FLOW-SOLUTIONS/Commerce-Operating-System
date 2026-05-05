import React, { createContext, useContext, useState, useEffect } from "react";

interface CustomerSession {
  customerId: string;
  phone: string;
  name?: string | null;
  email?: string | null;
  hasPassword: boolean;
}

interface CustomerContextValue {
  session: CustomerSession | null;
  setSession: (session: CustomerSession | null) => void;
  clearSession: () => void;
}

const CustomerContext = createContext<CustomerContextValue | null>(null);

export function CustomerProvider({ storeId, children }: { storeId: string; children: React.ReactNode }) {
  const key = `sokoa_customer_${storeId}`;

  const [session, setSessionState] = useState<CustomerSession | null>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setSession = (s: CustomerSession | null) => {
    setSessionState(s);
    if (s) {
      localStorage.setItem(key, JSON.stringify(s));
    } else {
      localStorage.removeItem(key);
    }
  };

  const clearSession = () => setSession(null);

  return (
    <CustomerContext.Provider value={{ session, setSession, clearSession }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}
