"use client"
import React, { useRef } from 'react';
// Dados de exemplo adaptados para formato de notícias
// 1. Definimos o formato de CADA item do carrossel
export interface CarouselItem {
  id: string | number;
  title: string;
  image: string;
}

// 2. Definimos as Props que o componente inteiro vai receber
interface CarouselProps {
  title: string;          // O título da seção (ex: "Últimas notícias", "Serviços")
  items: CarouselItem[];  // A lista de itens para renderizar
  actionText?: string;    // Texto do link (Opcional)
  actionUrl?: string;     // URL do link (Opcional)
}

const CarouselMenu = ({ title, items, actionText, actionUrl }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Se não houver itens, não renderiza nada para evitar um espaço vazio
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Cabeçalho Dinâmico */}
      <div className="flex items-end justify-between mb-8 pl-2">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003d6a] tracking-tight">
          {title}
        </h2>
        
        {/* Renderiza o link apenas se passarmos as propriedades actionText e actionUrl */}
        {actionText && actionUrl && (
          <a href={actionUrl} className="text-sm font-semibold text-blue-600 hover:text-[#003d6a] hover:underline transition-colors mb-1 hidden sm:block">
            {actionText} &rarr;
          </a>
        )}
      </div>

      {/* Container Relativo para posicionar as setas */}
      <div className="relative group/carousel">
        
        <button 
          onClick={() => scroll('left')} 
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-[#003d6a] opacity-0 group-hover/carousel:opacity-100 hover:bg-gray-50 transition-all duration-300 disabled:opacity-0"
          aria-label="Anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Mapeando os itens dinâmicos que vieram das props */}
          {items.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start flex flex-col gap-4 cursor-pointer group"
            >
              <div className="w-full h-48 overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
              
              <h3 className="text-gray-800 font-bold text-lg leading-snug group-hover:text-[#003d6a] transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-[#003d6a] opacity-0 group-hover/carousel:opacity-100 hover:bg-gray-50 transition-all duration-300"
          aria-label="Próximo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>
    </section>
  );
};
export default CarouselMenu;