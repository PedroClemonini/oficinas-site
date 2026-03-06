"use client"
import Image from 'next/image'

// Dados dos braços do Oficinas para facilitar a manutenção
const arms = [
  {
    name: "LADECAM",
    fullname: "Laboratório de Ensaios e Caracterização de Materiais",
    description: "Grupo de pesquisa do IFSP foca em análise de falhas, vibrações, inteligência artificial, materiais, manufatura aditiva e automação de processos industriais.",
    // Substitua pelo caminho da sua imagem real (ex: "/images/ladecam.png")
    image: "/ladecam.png", 
    color: "text-red-500" // Cor de destaque opcional
  },
  {
    name: "GERSE",
    fullname: "Grupo de Estudos em Robótica e Sistemas Embarcados",
    description: "Focado no desenvolvimento tecnológico, o grupo promove conhecimento em robótica, competições e sistemas embarcados, utilizando infraestrutura da instituição e apoio de empresas para projetos elaborados por estudantes",
    image: "/gerse.png",
    color: "text-green-500"
  },
    {
    name: "GruHackerSpace",
    fullname: "Makerspace & Segurança da Informação",
    description: "Espaço para experimentação hacker, CTFs, IoT e cultura maker em Guarulhos.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop",
    color: "text-blue-500"
  },
]

export function ArmSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabeçalho da Seção - Centralizado */}
        <div className="mb-20 text-center">
          <h2 className="text-sm font-bold text-brand-light uppercase tracking-[0.2em]">
            Nosso Ecossistema
          </h2>
          <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Os Braços do Oficinas
          </p>
          <p className="mt-6 text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Conheça as frentes especializadas que compõem nosso núcleo tecnológico e de inovação.
          </p>
        </div>

        {/* Container Flex para centralização total e responsividade */}
        <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
          {arms.map((arm) => (
            <div 
              key={arm.name} 
              className="group flex flex-col items-center text-center w-full sm:w-[calc(50%-1.5rem)] lg:w-[300px]"
            >
              
              {/* Bolinha com Imagem (rounded-full) */}
              <div className="relative aspect-square w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[240px] overflow-hidden rounded-full bg-slate-50 mb-8 shadow-xl border-4 border-white ring-2 ring-slate-100 transition-all duration-300 group-hover:ring-brand-light group-hover:shadow-2xl">
                <Image
                  src={arm.image}
                  alt={`Logo ou Imagem do ${arm.name}`}
                  fill
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay sutil no hover */}
                <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Informações Centralizadas */}
              <div className="w-full px-2">
                <h3 className={`text-2xl font-bold ${arm.color} tracking-tighter leading-tight`}>
                  {arm.name}
                </h3>
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mt-2 px-1">
                  {arm.fullname}
                </p>
                
                {/* Linha divisória sutil */}
                <div className="h-px w-16 bg-slate-100 mx-auto my-5 group-hover:w-24 transition-all duration-300 group-hover:bg-brand-light" />
                
                <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                  {arm.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}