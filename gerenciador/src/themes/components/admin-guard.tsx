"use client";

import Cookies from "js-cookie";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { isAdminEmail } from "@/services/admin-access";

type AdminGuardProps = {
    children: ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user || !isAdminEmail(user.email)) {
                Cookies.remove("user");
                await signOut(auth).catch(() => null);
                router.replace("/");
                return;
            }

            Cookies.set("user", JSON.stringify({
                uid: user.uid,
                name: "Administrador",
                email: user.email,
                role: "Administrador",
            }), { expires: 7, sameSite: "strict" });
            setAuthorized(true);
        });

        return unsubscribe;
    }, [router]);

    if (!authorized) {
        return (
            <div className="flex min-h-screen flex-1 items-center justify-center bg-slate-50 text-slate-600">
                Verificando acesso administrativo...
            </div>
        );
    }

    return <>{children}</>;
}
