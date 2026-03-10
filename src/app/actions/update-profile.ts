"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "Não autorizado" }

  const newName = formData.get("name") as string
  const newImage = formData.get("image") as string // Por enquanto, aceitaremos uma URL direta

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        name: newName || undefined,
        image: newImage || undefined
      }
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Erro ao atualizar perfil" }
  }
}