import React from 'react';
import Link from 'next/link';
import { getTodasNoticias } from '@/lib/noticias';

const Noticias = () => {
  // Puxa as notícias direto da função que lê os arquivos .md
  const noticias = getTodasNoticias();

  return (
    <main className="w-full min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Página */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#003d6a] tracking-tight">Notícias e Artigos</h1>
          <p className="text-gray-500 mt-3 text-lg">
            Acompanhe as últimas atualizações, tutoriais e projetos.
          </p>
        </div>

        {/* Grid de Cards de Notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia) => (
            <Link href={`/noticias/${noticia.slug}`} key={noticia.slug} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                
                {/* Imagem de Capa */}
                <div className="w-full h-52 overflow-hidden relative">
                  <img 
                    src={noticia.coverImage} 
                    alt={noticia.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Data e Autor */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3">
                    <span>{new Date(noticia.date).toLocaleDateString('pt-BR')}</span>
                    <span>&bull;</span>
                    <span>{noticia.author}</span>
                  </div>

                  {/* Título e Resumo */}
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#003d6a] transition-colors mb-3 line-clamp-2">
                    {noticia.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {noticia.resume}
                  </p>

                  {/* Botão de "Ler mais" estilo link */}
                  <div className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Ler artigo completo <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>

              </article>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Noticias;