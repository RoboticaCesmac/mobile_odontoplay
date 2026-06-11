# OdontoPlay Gerenciador

Painel administrativo web do OdontoPlay para consultar cadastros de criancas, acompanhar progresso nos jogos e gerenciar usuarios vinculados ao aplicativo.

## Tecnologias

- Next.js 15
- TypeScript
- Tailwind CSS
- Firebase

## Como executar

```bash
cd gerenciador
npm install
npm run dev
```

## Firebase Admin

Para que a exclusao de usuarios no gerenciador apague tambem a conta do Firebase Authentication, crie um arquivo `.env.local` na pasta `gerenciador` com estas variaveis:

```env
FIREBASE_ADMIN_PROJECT_ID=seu-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=seu-client-email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
```

Sem essa configuracao, o gerenciador continua listando e editando usuarios, mas a exclusao completa de Auth + Firestore nao funciona.
