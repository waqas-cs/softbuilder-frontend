// components/ProtectedRoute.tsx
"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/ AuthContext";

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default ProtectedRoute;
