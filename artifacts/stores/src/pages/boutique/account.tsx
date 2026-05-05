import { useParams, useLocation } from "wouter";
import { useCustomer } from "@/lib/customer-context";
import { useEffect } from "react";

export default function BoutiqueAccountRedirect() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const { session } = useCustomer();

  useEffect(() => {
    if (session) {
      navigate(`/boutique/${storeId}/dashboard`, { replace: true });
    } else {
      navigate(`/boutique/${storeId}/login`, { replace: true });
    }
  }, [session, storeId, navigate]);

  return null;
}
