import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Noticias() {
  // Busca todas as notícias publicadas, ordenadas da mais nova para a mais antiga
  // E já traz o nome do autor junto via JOIN (include)

  const newsList = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true} }
    }
  })

  return (
  /* Substituímos bg-gray-50 por bg-app-bg */
  <main className="w-full min-h-screen bg-app-bg py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <div className="max-w-7xl mx-auto">

      <div className="mb-12">
        {/* Trocamos text-[#003d6a] por text-app-fg (sua cor brand/título) */}
        <h1 className="text-4xl font-extrabold text-app-fg tracking-tight">
          Notícias e Artigos
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium">
          Acompanhe as últimas atualizações, tutoriais e projetos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((noticia) => (
          <Link href={`/noticias/${noticia.slug}`} key={noticia.slug} className="group">
            {/* Trocamos bg-white por bg-card-bg e border-gray-100 por border-card-border */}
            <article className="bg-card-bg rounded-2xl overflow-hidden shadow-sm border border-card-border hover:shadow-xl hover:border-brand-500/50 transition-all duration-300 flex flex-col h-full relative">
              
              {/* Imagem de Capa */}
              <div className="w-full h-52 overflow-hidden relative">
                <img 
                  src={noticia.coverImage || '/placeholder-news.jpg'} 
                  alt={noticia.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay sutil para o modo dark não deixar a imagem "estourar" o brilho */}
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                  <span>{new Date(noticia.updatedAt).toLocaleDateString('pt-BR')}</span>
                  <span>&bull;</span>
                  <span>{noticia.author.name}</span>
                </div>

                {/* Trocamos text-gray-800 por text-app-fg */}
                <h2 className="text-xl font-bold text-app-fg group-hover:text-brand-500 transition-colors mb-3 line-clamp-2 leading-snug">
                  {noticia.title}
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {noticia.resume}
                </p>

                <div className="text-brand-600 dark:text-brand-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Ler artigo completo <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  </main>
)
}