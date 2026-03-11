"use client"
import Image from 'next/image'

const coordinators = [
  {
    name: "Dr. Wilson Carlos Jr da Silva",
    role: "Coordenador de Mecânica e Materiais",
    description: "Engenheiro Mecânico com sólida trajetória acadêmica e executiva doutorado em Engenharia Biomédica (UMC) e pós-doutorado pelo IPEN/USP. Especialista em ciência dos materiais, resistência mecânica e análise de falhas, com vasta experiência na gestão de cursos de engenharia e coordenação acadêmica.",
    image: "/wilson.jpeg"
  },
  {
    name: "Me. Cristiano Alves Pessoa",
    role: "Coordenador de Redes",
    description: "Mestre em Engenharia Biomédica (UMC) e docente do IFSP desde 2009, com sólida atuação em gestão educacional e coordenação de cursos de TI. Especialista em infraestrutura de redes, computação em nuvem e parcerias acadêmicas com grandes players do setor tecnológico.",
    image: "/cristiano.jpeg"
  },
  {
    name: "Me. Rogério Daniel Dantas",
    role: "Coordenador de IA",
    description: "Mestre em Engenharia da Informação pela UFABC (2010) e graduado em Mecatrônica Industrial. Docente do Instituto Federal de São Paulo (IFSP), com sólida experiência em sistemas automatizados, robótica e inteligência artificial aplicada à indústria e saúde.",
    image: "/dantas.jpeg"
  },
  {
    name: "Me. Jordy Luiz Cerminaro Spacca",
    role: "Coordenador de Robótica e Automação",
    description: "Mestre em Engenharia Elétrica pela UNESP (2019) e graduado em Engenharia de Controle e Automação. Docente do Instituto Federal de São Paulo (IFSP) no campus Guarulhos, com sólida trajetória no ensino superior e especialização em sistemas inteligentes e robótica.",
    image: "/jordy.png"
  },
//   {
//     name: "Dr. Osias Baptista de Souza Miranda",
//     role: "Coordenador de TI",
//     description: "Gestão de home labs e implementação de soluções Open Source.",
//     image: "/osias.png"
//   }
]

export function CoordinatorsSection() {
  return (
  /* 1. bg-white -> bg-app-bg | transição suave para o toggle */
  <section className="py-24 bg-app-bg transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6">
      
      {/* Cabeçalho da Seção - text-slate-900 -> text-app-fg */}
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-app-fg sm:text-4xl">
          Nossa Coordenação
        </h2>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Conheça os especialistas à frente da nossa infraestrutura e tecnologia.
        </p>
      </div>

      {/* Grid de Coordenadores */}
      <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
        {coordinators.map((person) => (
          <div key={person.name} className="group flex flex-col items-center text-center max-w-[240px]">
            
            {/* Container da Imagem - bg-slate-100 -> bg-card-bg | border-slate-100 -> border-card-border */}
            <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-3xl bg-card-bg mb-6 shadow-xl border border-card-border transition-all duration-300 group-hover:border-brand-500/50 group-hover:shadow-brand-500/10">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110 dark:brightness-90"
              />
            </div>

            {/* Informações Centralizadas */}
            <div className="px-2">
              <h3 className="text-[16px] font-extrabold text-app-fg tracking-tight leading-snug">
                {person.name}
              </h3>
              {/* text-brand-light -> brand-500 (dinâmico) */}
              <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.15em] mt-2">
                {person.role}
              </p>
              
              {/* Linha decorativa sutil que aparece no hover */}
              <div className="h-0.5 w-8 bg-brand-500/20 mx-auto my-4 group-hover:w-12 transition-all" />
              
              <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {person.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
}