import { AppMainContainer } from "@/themes/components";
import UsuarioForm from "./_form";

export const metadata = {
    title: "Editar cadastro"
};

type UsuariosEditarPageProps = {
    params: Promise<{
        userID: string;
    }>;
};

export default async function UsuariosEditarPage({ params }: UsuariosEditarPageProps) {
    const { userID } = await params;

    return (
        <AppMainContainer
            title="Editar cadastro"
            eyebrow="Manutenção conectada"
            description="Edição vinculada aos dados reais dos usuários persistidos no Firebase."
        >
            <UsuarioForm userID={userID} />
        </AppMainContainer>
    );
}
