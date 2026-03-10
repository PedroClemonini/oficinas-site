import Image from "next/image";
import { Banner } from "@/components";
import CarouselMenu from "@/components/CarouselMenu";
import Footer from "@/components/Footer";

const newsData = [
  { id: 1, title: 'Nova versão do Proxmox VE...', image: 'link-da-imagem.jpg' },
  { id: 2, title: 'Atualização do Docker', image: 'link-da-imagem.jpg' },
];

// Dados dos serviços (mesmo formato!)
const servicesData = [
  { id: 10, title: 'Consultoria em Redes', image: 'link-da-imagem.jpg' },
  { id: 11, title: 'Infraestrutura Cloud', image: 'link-da-imagem.jpg' },
];


export default function Home() {
  return (
 
     <main>

      <Banner />
      <CarouselMenu 
        title="Últimas notícias" 
        items={newsData} 
        actionText="Ver todas as publicações"
        actionUrl="/noticias"
      />
      
      </main>

  );
}
