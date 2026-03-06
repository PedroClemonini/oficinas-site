import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getNoticiaBySlug } from '@/lib/noticias';

// 1. A função agora é 'async' e o params é tipado como Promise
export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. Extraímos o params usando 'await' (Regra do Next.js 15)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 3. Agora podemos passar o slug em segurança
  const noticia = getNoticiaBySlug(slug);

  // Se a notícia não for encontrada, mostra a página de Erro 404 do Next.js
  if (!noticia) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        
        {/* Cabeçalho do Artigo */}
        <header className="mb-10">
          <Link 
            href="/noticias" 
            className="text-blue-600 hover:text-[#003d6a] hover:underline mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            &larr; Voltar para notícias
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {noticia.title}
          </h1>
          
          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            {/* Como criamos o markdown sem horas no 'date', lidamos com a data formatada */}
            <span>{new Date(noticia.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
            <span>&bull;</span>
            <span>Escrito por <span className="text-[#003d6a]">{noticia.author}</span></span>
          </div>
        </header>

        {/* Imagem de Capa */}
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-md border border-gray-100">
          <img 
            src={noticia.coverImage} 
            alt={noticia.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Conteúdo do Markdown formatado pelo Tailwind */}
        <div className="prose prose-lg prose-blue max-w-none text-slate-700">
          <ReactMarkdown>
            {noticia.content}
          </ReactMarkdown>
        </div>

      </article>
    </main>
  );
}