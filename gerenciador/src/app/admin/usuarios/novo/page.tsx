import { AppMainContainer } from "@/themes/components";
import UsuarioForm from "./_form";

export const metadata = {
    title: "Novo cadastro"
}

export default function UsuariosNovoPage() {
    return (
        <AppMainContainer
            title="Novo cadastro"
            eyebrow="Criação conectada"
            description="Formulário administrativo conectado ao Firebase para adicionar usuários reais ao Odontoplay."
        >
            <UsuarioForm/>
        </AppMainContainer>
    )
}
