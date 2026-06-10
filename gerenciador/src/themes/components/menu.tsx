"use client";
import { useRouter } from "next/navigation";
import AppMenuItem from "./menu-item";
import UserServices from "@/services/user";
import Image from "next/image";

export default function AppMenu() {
    const router = useRouter();

    const handleLogout = async () => {
        UserServices.logout();
        router.replace("/");
    }

    return (
         <aside className="m-4 mr-0 flex w-[84px] flex-col rounded-[30px] border border-white/70 bg-white/75 px-3 py-6 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur md:w-[320px] md:px-6">
            <div className="flex items-center justify-center">
                <Image
                    src="/assets/img/icons/logo_.png"
                    alt="Logo OdontoPlay"
                    width={180}
                    height={56}
                    className="h-auto w-[48px] md:w-[180px]"
                    priority
                />
            </div>

            <div className="hidden md:flex flex-col rounded-[28px] bg-[linear-gradient(135deg,#1d4ed8_0%,#0f766e_100%)] p-6 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Odontoplay</p>
                <h1 className="mt-2 text-[28px] font-semibold leading-tight">Gerenciador de usuários</h1>
                <p className="mt-3 text-sm text-white/75">Visual administrativo para listar, buscar e gerenciar os cadastros do app.</p>
            </div>

            <div className="mt-6 flex-1 md:mt-8">
                <AppMenuItem title="Dashboard" icon="grid" url="/admin/dashboard"/>
                <AppMenuItem title="Usuários" icon="ios-people" url="/admin/usuarios"/>
                <AppMenuItem title="Jogos" icon="podium" url="/admin/jogos"/>
            </div>

            <div className="mt-8 border-t border-slate-200/70 pt-4">
                <h1 className="flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-3 text-center text-[15px] font-semibold text-rose-500 transition hover:bg-rose-50" onClick={handleLogout}>
                    <i className="ion-log-out" />
                    <span className="hidden md:flex justify-center">Encerrar sessão</span>
                </h1>
            </div>
        </aside>
    )
}
