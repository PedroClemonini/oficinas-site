"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function unlinkAccount(provider: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Não autorizado" }

  // 1. Verificar se o usuário tem outra forma de login (Senha ou outro Provider)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: true }
  })

  const hasPassword = !!user?.password
  const otherAccounts = user?.accounts.filter(acc => acc.provider !== provider) || []

  if (!hasPassword && otherAccounts.length === 0) {
    return { error: "Você não pode desvincular sua única forma de acesso. Defina uma senha primeiro." }
  }

  // 2. Deletar o vínculo
  await prisma.account.deleteMany({
    where: {
      userId: session.user.id,
      provider: provider
    }
  })

  revalidatePath("/dashboard")
  return { success: `Conta ${provider} desvinculada.` }
}