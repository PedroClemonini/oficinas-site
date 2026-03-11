"use client"
import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselItem {
  id: string | number;
  title: string;
  image: string;
  slug?: string; // Adicionado para o link real
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  actionText?: string;
  actionUrl?: string;
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

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-300">
      
      {/* Cabeçalho Dinâmico - text-[#003d6a] -> text-app-fg */}
      <div className="flex items-end justify-between mb-8 px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-app-fg tracking-tight">
          {title}
        </h2>
        
        {actionText && actionUrl && (
          <Link href={actionUrl} className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline transition-colors mb-1 hidden sm:block">
            {actionText} &rarr;
          </Link>
        )}
      </div>

      <div className="relative group/carousel">
        
        {/* Setas - bg-white -> bg-card-bg | border-gray-100 -> border-card-border */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-card-bg shadow-xl border border-card-border text-app-fg opacity-0 group-hover/carousel:opacity-100 hover:scale-110 transition-all duration-300 disabled:opacity-0"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {items.map((item) => (
            <Link 
              href={`/noticias/${item.slug || item.id}`}
              key={item.id} 
              className="min-w-[280px] md:min-w-[340px] snap-start flex flex-col gap-4 group cursor-pointer"
            >
              {/* Card de Imagem */}
              <div className="w-full h-52 overflow-hidden rounded-2xl shadow-lg border border-card-border bg-card-bg transition-all duration-500 group-hover:shadow-2xl group-hover:border-brand-500/30">
                <img 
                  src={item.image || '/placeholder.jpg'} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
              </div>
              
              {/* Título - text-gray-800 -> text-app-fg */}
              <h3 className="text-app-fg font-bold text-lg leading-tight group-hover:text-brand-500 transition-colors line-clamp-2 px-1">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-card-bg shadow-xl border border-card-border text-app-fg opacity-0 group-hover/carousel:opacity-100 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>

      </div>
    </section>
  );
};
export default CarouselMenu;