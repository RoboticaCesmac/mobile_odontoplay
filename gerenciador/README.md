# TEMPLATE ADMIN

Template de gerenciador web basico.

----

## Informacoes do Projeto

Projeto criado com:
- NextJS V15
- TypeScript
- Tailwind CSS
- Firebase

----

## Baixar o projeto

```bash
git clone https://github.com/CarlosWGama/admin-template.git gerenciador
cd gerenciador
npm install
npm run dev
```

-----

## Firebase Admin

Para que a exclusao de usuarios no gerenciador apague tambem a conta do Firebase Authentication,
crie um arquivo `.env.local` na pasta `gerenciador` com estas variaveis:

```env
FIREBASE_ADMIN_PROJECT_ID=seu-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=seu-client-email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
```

Esses dados saem de:
- Firebase Console
- Configuracoes do projeto
- Contas de servico
- Gerar nova chave privada

Sem essa configuracao, o gerenciador continua listando e editando usuarios, mas a exclusao completa de Auth + Firestore nao funciona.

-----

## Autor

**Autor:** Carlos W. Gama
**Licenca:** MIT
