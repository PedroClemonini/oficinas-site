import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma" // Importa a conexão que criamos antes
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Diz ao Auth.js para salvar usuários no seu Postgres
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return user;
      }
    })
 
  ],
  // Usamos JWT para a sessão por ser mais leve e performático
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Adiciona o ID do usuário do banco na sessão do navegador
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
}