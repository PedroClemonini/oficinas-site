"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"

export async function changePassword(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "Não autorizado" }

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { password: true }
  })

  // Se o utilizador já tem uma senha, precisamos de validar a atual
  if (user?.password) {
    if (!currentPassword) return { error: "A senha atual é obrigatória." }
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) return { error: "A senha atual está incorreta." }
  }

  // Se chegou aqui, ou não tinha senha ou a senha atual estava correta
  const hashedNewPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashedNewPassword }
  })

  revalidatePath("/dashboard") // Atualiza a UI do dashboard
  return { success: "Senha definida com sucesso!" }
}