import { Suspense } from "react";
import { AppButton, AppMainContainer } from "@/themes/components";
import UserList from "./_list";

export const metadata = {
    title:"Usuários cadastrados"
}

export default function UsuariosPage() {  
    return (
        <AppMainContainer
            title="Usuários cadastrados"
            eyebrow="Gestão administrativa"
            description="Consulte, acompanhe e gerencie os usuários cadastrados no OdontoPlay."
        >
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-[20px] font-bold text-slate-900">Base de usuários do aplicativo</h1>

                <AppButton title="Novo cadastro" form="round" type="outline" icon="person-add" href="/admin/usuarios/novo" />
            </div>

            <Suspense>
                <UserList />
            </Suspense>
        </AppMainContainer>
    )
}
