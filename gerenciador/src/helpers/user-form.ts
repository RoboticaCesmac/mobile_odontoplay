import * as Yup from "yup";
import { RegisteredUser } from "@/data/users";

export type UserFormValues = Pick<
  RegisteredUser,
  "nome" | "dataNascimento" | "genero" | "email" | "status"
> & {
  senha: string;
};

export const defaultUserFormValues: UserFormValues = {
  nome: "",
  dataNascimento: "",
  genero: "Masculino",
  email: "",
  senha: "",
  status: "Ativo",
};

const birthYearSchema = Yup.string()
  .required("Campo obrigatório")
  .matches(/^\d{4}$/, "Informe apenas o ano")
  .test("valid-birth-year", "Ano inválido", (value) => {
    if (!value) return false;

    const year = Number(value);
    const currentYear = new Date().getFullYear();

    return year >= 1900 && year <= currentYear;
  });

export const userFormSchema = Yup.object({
  nome: Yup.string().required("Campo obrigatório"),
  dataNascimento: birthYearSchema,
  genero: Yup.string().required("Campo obrigatório"),
  email: Yup.string().required("Campo obrigatório").email("Email inválido"),
  senha: Yup.string().required("Campo obrigatório").min(6, "Mínimo de 6 caracteres"),
  status: Yup.string().required("Campo obrigatório"),
});

export const editUserFormSchema = Yup.object({
  nome: Yup.string().required("Campo obrigatório"),
  dataNascimento: birthYearSchema,
  genero: Yup.string().required("Campo obrigatório"),
  email: Yup.string().required("Campo obrigatório").email("Email inválido"),
  senha: Yup.string().min(6, "Mínimo de 6 caracteres"),
  status: Yup.string().required("Campo obrigatório"),
});

export function formatBirthYear(value: string) {
  const cleaned = value.replace(/\D/g, "").slice(0, 8);
  const yearMatch = cleaned.match(/\d{4}$/);

  return yearMatch?.[0] ?? cleaned.slice(0, 4);
}

export function toEditFormValues(user: RegisteredUser): UserFormValues {
  return {
    ...user,
    dataNascimento: formatBirthYear(user.dataNascimento),
    senha: "",
  };
}
