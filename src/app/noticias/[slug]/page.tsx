import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from 'next/link';
import remarkGfm from 'remark-gfm'

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const news = await prisma.news.findUnique({
    where: { slug: slug },
    include: { author: { select: { username: true, name:true } } }
  })

  if (!news) return notFound()

return (

  <main className="w-full min-h-screen bg-app-bg py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <article className="max-w-3xl mx-auto">
      <header className="mb-10">
        
        <Link 
          href="/noticias" 
          className="text-brand-600 dark:text-brand-400 hover:text-brand-500 hover:underline mb-6 inline-flex items-center gap-2 text-sm font-bold transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Voltar para notícias
        </Link>
          
<h1 className="text-4xl md:text-5xl font-extrabold text-app-fg mb-6 leading-tight tracking-tight">
  {news.title}
</h1>

  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
  {/* Data da Postagem */}
  <time dateTime={news.createdAt.toISOString()}>
    {new Date(news.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
  </time>

  <span className="text-slate-300 dark:text-slate-700">&bull;</span>

  {/* Autor e Link */}
  <div className="flex items-center gap-1.5">
    <span>Escrito por</span>
    <Link 
      href={`/profile/${news.author.username || news.author.id}`} 
      className="text-brand hover:text-brand-dark font-bold transition-all hover:underline decoration-2 underline-offset-4"
    >
      {news.author.name}
    </Link>
  </div>
</div>
      </header>

      {news.coverImage && (
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-md border border-card-border bg-card-bg">
          <img
            src={news.coverImage}
            alt={`Capa da notícia: ${news.title}`}
            className="w-full h-full object-cover" 
          />
        </div>
      )}


<div className="prose prose-lg dark:prose-invert prose-brand max-w-none !text-app-fg">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {news.content}
  </ReactMarkdown>
</div>
    </article>
  </main>
)
}