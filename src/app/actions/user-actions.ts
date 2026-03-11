"use server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Função auxiliar para validar domínios
const isValidDomain = (url: string | null, domain: string) => {
  if (!url) return true; // Se estiver vazio, consideramos válido (o usuário pode querer remover o link)
  return url.startsWith(`https://${domain}`) || url.startsWith(`http://${domain}`);
};

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "Não autorizado" }

  // Coleta das URLs
  const linkedinUrl = formData.get("linkedinUrl") as string
  const instagramUrl = formData.get("instagramUrl") as string
  const orcidUrl = formData.get("orcidUrl") as string
  const lattesUrl = formData.get("lattesUrl") as string

  // 1. Validação de Domínios
  if (!isValidDomain(linkedinUrl, "linkedin.com") && !isValidDomain(linkedinUrl, "www.linkedin.com")) {
    return { error: "Este link não é válido" }
  }
  if (!isValidDomain(instagramUrl, "instagram.com") && !isValidDomain(instagramUrl, "www.instagram.com")) {
   return { error: "Este link não é válido" }
  }
  if (!isValidDomain(orcidUrl, "orcid.org")) {
     return { error: "Este link não é válido" }
  }
  if (!isValidDomain(lattesUrl, "lattes.cnpq.br")) {
     return { error: "Este link não é válido" }
  }

  // Busca do estado atual para o username (lógica que já tínhamos)
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { username: true }
  });

  const rawUsername = formData.get("username") as string;
  let cleanUsername = currentUser?.username;

  if (!currentUser?.username && rawUsername) {
    cleanUsername = rawUsername
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        username: cleanUsername,
        name: (formData.get("name") as string) || undefined,
        description: (formData.get("description") as string) || undefined,
        image: (formData.get("image") as string) || undefined,
        linkedinUrl: linkedinUrl || null, // Usamos null para permitir que o usuário apague o link
        instagramUrl: instagramUrl || null,
        orcidUrl: orcidUrl || null,
        lattesUrl: lattesUrl || null,
      }
    });

    revalidatePath("/dashboard")
    revalidatePath(`/profile/${updatedUser.username || updatedUser.id}`)
    
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Username já em uso." }
    return { error: "Erro ao atualizar perfil." }
  }
}