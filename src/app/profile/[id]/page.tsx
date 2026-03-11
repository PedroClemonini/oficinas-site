import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Linkedin, Instagram, Newspaper, Calendar } from "lucide-react";
import Link from "next/link";
import { OrcidIcon, LattesIcon } from "@/components/Icons";
// 1. Defina a interface correta para o Next.js 15
interface PublicProfileProps {
  params: Promise<{ id: string }>
}

export default async function PublicProfilePage({ params }: PublicProfileProps) {
  // 2. VOCÊ PRECISA DAR AWAIT NO PARAMS ANTES DE USAR O ID
  const { id } = await params;

  if (!id) notFound();

  // 3. Agora o id não será mais undefined
const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: id },
        { id: id }
      ]
    },
    include: {
      news: {
        where: { published: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) notFound();

  return (
    <main className="min-h-screen bg-app-bg text-app-fg py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header do Perfil */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-20">
          <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0">
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "Membro"}
              fill
              className="rounded-[3rem] object-cover border-8 border-card-bg shadow-2xl ring-2 ring-brand/10"
            />
          </div>

          <div className="flex-1 text-center md:text-left pt-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
              {user.name}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-8 font-medium">
              {user.description || "Pesquisador e entusiasta de tecnologia no Laboratório Oficinas 4.0."}
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              {user.linkedinUrl && (
                <a href={user.linkedinUrl} target="_blank" className="p-4 bg-card-bg border border-card-border rounded-2xl text-brand hover:bg-brand hover:text-white transition-all shadow-sm">
                  <Linkedin size={24} />
                </a>
              )}
              {user.instagramUrl && (
                <a href={user.instagramUrl} target="_blank" className="p-4 bg-card-bg border border-card-border rounded-2xl text-brand hover:bg-brand hover:text-white transition-all shadow-sm">
                  <Instagram size={24} />
                </a>
              )}
                            {user.orcidUrl && (
                <a href={user.orcidUrl} target="_blank" className="p-4 bg-card-bg border border-card-border rounded-2xl text-brand hover:bg-brand hover:text-white transition-all shadow-sm">
                  <OrcidIcon size={24} />
                </a>
              )}
                            {user.lattesUrl && (
                <a href={user.lattesUrl} target="_blank" className="p-4 bg-card-bg border border-card-border rounded-2xl text-brand hover:bg-brand hover:text-white transition-all shadow-sm">
                  <LattesIcon size={24} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Notícias do Autor */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-brand/10 rounded-lg text-brand">
              <Newspaper size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Publicações de {user.name?.split(' ')[0]}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {user.news.map((item) => (
              <Link href={`/noticias/${item.slug}`} key={item.id} className="group flex flex-col bg-card-bg border border-card-border rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-56 w-full">
                  <Image src={item.coverImage || "/placeholder.jpg"} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold group-hover:text-brand transition-colors line-clamp-2">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}