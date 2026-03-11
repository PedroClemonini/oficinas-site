import Image from "next/image";
import { Banner } from "@/components";
import CarouselMenu from "@/components/CarouselMenu";
import { prisma } from "@/lib/prisma";

// Transformamos o componente em async para buscar os dados
export default async function Home() {
  
  // 1. Buscamos as últimas 6 notícias publicadas no servidor
  const latestNews = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
    select: {
      id: true,
      title: true,
      coverImage: true, // Certifique-se que o campo no banco é coverImage
      slug: true
    }
  });

  // 2. Formatamos os dados para o padrão que o CarouselMenu espera
  const carouselItems = latestNews.map(news => ({
    id: news.id,
    title: news.title,
    image: news.coverImage || '/default-news.jpg',
    slug: news.slug || ""
  }));

  return (
    /* bg-app-bg e text-app-fg garantem que o Dark Mode funcione aqui também */
    <main className="min-h-screen bg-app-bg text-app-fg transition-colors duration-300">
      
      {/* Seção Hero/Banner */}
      <Banner />

      {/* Carrossel de Notícias Reais */}
      <div className="py-8">
        <CarouselMenu 
          title="Últimas notícias" 
          items={carouselItems} 
          actionText="Ver todas as publicações"
          actionUrl="/noticias"
        />
      </div>
      
      {/* Se quiser adicionar outras seções aqui futuramente */}
      
    </main>
  );
}