"use client";
import { AppButton, AppInput, AppModal } from "@/themes/components";
import { Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import UserServices from "@/services/user";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [ showResetPasswordModal, setShowResetPasswordModal ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ errorLogin, setErrorLogin ] = useState<string | null>(null);
    const [ messageResetPassword, setMessageResetPassword ] = useState<{success: boolean, message: string} | null>(null);
    const router = useRouter();

    const onSubmitLogin = async ({email, password}: any) => {
        setErrorLogin(null);
        const { success } = await UserServices.login(email, password);
        if (success)
            router.push("/admin/dashboard");
        else
            setErrorLogin("Login ou senha incorreta");
    }

    const onSubmitResetPassword = async () => {
        setErrorLogin(null);
        setEmail("");
        const { success } = await UserServices.resetPassword(email);
        if (success)
            setMessageResetPassword({success: true, message: "Enviamos um email de recuperação de acesso."});
        else
            setMessageResetPassword({success: false, message: "Não foi possível resetar a senha."});
    }

    const closeModal = () => {
        setEmail("");
        setShowResetPasswordModal(false);
        setMessageResetPassword(null);
    }

    return (
        <>
            <Formik
                initialValues={{email: "", password: ""}}
                validationSchema={Yup.object({
                    email: Yup.string().required("Campo obrigatório").email("Campo precisa ser um email"),
                    password: Yup.string().required("Campo obrigatório").min(6, "Campo precisa ter pelo menos 6 caracteres")
                })}
                onSubmit={onSubmitLogin}
            >
                {({handleChange, handleSubmit, isSubmitting, isValid, errors}) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex w-[360px] flex-col rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Painel administrativo</p>
                            <h1 className="ff-default mt-3 text-[37px] text-slate-950">Entrar</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500">Acesse o gerenciador do OdontoPlay.</p>
                            <AppInput placeholder="EMAIL" name="email" onChange={handleChange} icon="ios-email" error={errors.email} />
                            <AppInput placeholder="SENHA" name="password" type="password" onChange={handleChange} icon="locked" openPassword error={errors.password}/>

                            <div className="mt-3 min-h-[24px]">
                                {errorLogin && <p className="ff-default text-center text-[16px] text-[tomato]">{errorLogin}</p>}
                            </div>

                            <AppButton title="Entrar no gerenciador" onClick={handleSubmit} disabled={isSubmitting || !isValid} form="round" />
                            <p className="mt-3 cursor-pointer text-center text-[13px] ff-default text-(--primary-color)" onClick={() => setShowResetPasswordModal(true)}>Esqueci minha senha</p>
                        </div>
                    </form>
                )}
            </Formik>

            {showResetPasswordModal && <AppModal title="Recuperar acesso" onClose={() => closeModal()}>
                <div className="flex flex-col items-stretch">
                    <Image className="my-10 self-center" src="/assets/img/icons/reset-password.png" alt="icone resetar senha" width={120} height={120} />

                    <p className="text-center ff-default text-[16px]">Digite seu e-mail administrativo para recuperar o acesso.</p>

                    <AppInput placeholder="Digite seu email" icon="android-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    {messageResetPassword?.success == false && <p className="ff-default mt-3 text-center text-[20px] text-[tomato]">{messageResetPassword.message}</p>}
                    {messageResetPassword?.success == true && <p className="ff-default mt-3 text-center text-[20px] text-[green]">{messageResetPassword.message}</p>}

                    <div className="flex justify-between">
                        <button className="mt-5 w-[170px] cursor-pointer rounded-full border border-[red] bg-white py-2 text-[red]" onClick={closeModal}>Cancelar</button>
                        <button className="mt-5 w-[170px] cursor-pointer rounded-full bg-(--primary-color) py-2 text-white" onClick={onSubmitResetPassword}>Enviar</button>
                    </div>
                </div>
            </AppModal>}
        </>
    )
}
