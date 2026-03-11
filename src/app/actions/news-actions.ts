"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function toggleVisibility(newsId: string, currentStatus: boolean) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Não autorizado")

  await prisma.news.update({
    where: { 
      id: newsId,
      authorId: session.user.id // Garante que o usuário só mude o que é dele
    },
    data: { published: !currentStatus }
  })

  revalidatePath("/dashboard")
}