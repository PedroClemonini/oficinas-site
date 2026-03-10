import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from 'next/link';

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const news = await prisma.news.findUnique({
    where: { slug: slug },
    include: { author: { select: { name: true } } }
  })

  if (!news) return notFound()

  return (
    <main className="w-full min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
      <header className="mb-10">

        <Link 
            href="/noticias" 
            className="text-blue-600 hover:text-[#003d6a] hover:underline mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            &larr; Voltar para notícias
          </Link>
          
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">{news.title}</h1>
        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            {/* Como criamos o markdown sem horas no 'date', lidamos com a data formatada */}
            <span>{new Date(news.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
            <span>&bull;</span>
            <span>Escrito por <span className="text-[#003d6a]">{news.author.name}</span></span>
          </div>

     
</header>
        {/* Renderiza a Capa se existir */}
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-md border border-gray-100">
        {news.coverImage && (
          <img
            src={news.coverImage}
            alt={`Capa da notícia: ${news.title}`}
            className="w-full h-full object-cover" 
          />
        )}
</div>

      <div className="prose prose-lg prose-blue max-w-none text-slate-700">
        <ReactMarkdown>{news.content}</ReactMarkdown>
      </div>
    </article>
    </main>
  )
}