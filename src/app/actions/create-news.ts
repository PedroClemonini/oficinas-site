"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createNews(formData: FormData) {
  // 1. Verifica quem está mandando a requisição (Segurança)
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { error: "Não autorizado" }

  // 2. Extrai os dados do formulário
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const resume = formData.get("resume") as string
  const coverImage = formData.get("coverImage") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on" // Checkbox retorna "on" se marcado

  if (!title || !slug || !content) {
    return { error: "Título, slug e conteúdo são obrigatórios." }
  }

  try {
    // 3. Grava no PostgreSQL
    await prisma.news.create({
      data: {
        title,
        slug,
        resume,
        coverImage,
        content,
        published,
        authorId: session.user.id // <-- Relacionamento mágico acontecendo aqui!
      }
    })

    // 4. Limpa o cache da página de notícias para a nova aparecer na hora
    revalidatePath("/noticias") 
    return { success: true }
    
  } catch (error: any) {
    // ADICIONE ESTA LINHA PARA VER O LOG REAL:
    console.error("🔥 ERRO DETALHADO NO PRISMA:", error);

    if (error.code === 'P2002') {
      return { error: "Este slug (URL) já está em uso. Escolha outro." }
    }
    return { error: "Erro interno ao salvar a notícia." }
  }
}