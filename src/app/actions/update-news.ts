"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateNews(newsId: string, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Não autorizado" }

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const resume = formData.get("resume") as string
  const content = formData.get("content") as string
  const coverImage = formData.get("coverImage") as string

  try {
    await prisma.news.update({
      where: { 
        id: newsId,
        authorId: session.user.id // Trava de segurança: só edita se for o autor
      },
      data: { title, slug, resume, content, coverImage }
    })

    revalidatePath("/dashboard")
    revalidatePath(`/noticias/${slug}`)
    return { success: true }
  } catch (error) {
    return { error: "Erro ao atualizar a notícia." }
  }
}