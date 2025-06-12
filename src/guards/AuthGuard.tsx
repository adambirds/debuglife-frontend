// src/components/admin/AuthGuard.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({children}: AuthGuardProps) => {
    const {user, loading, refreshUser} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            await refreshUser();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;
