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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Seção - Centralizado para combinar com o grid */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nossa Coordenação
          </h2>
          <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Conheça os especialistas à frente da nossa infraestrutura e tecnologia.
          </p>
        </div>

        {/* Grid de Coordenadores */}
        <div className="flex flex-wrap justify-center gap-12 lg:gap-8">
          {coordinators.map((person) => (
            <div key={person.name} className="group flex flex-col items-center text-center">
              {/* Container da Imagem - Agora com largura definida para o grid centralizar */}
              <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-slate-100 mb-6 shadow-sm border border-slate-100">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Informações Centralizadas */}
              <div className="max-w-[220px]">
                <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
                  {person.name}
                </h3>
                <p className="text-[11px] font-bold text-brand-light uppercase tracking-[0.1em] mt-1.5">
                  {person.role}
                </p>
                <p className="mt-4 text-[13px] text-slate-500 leading-relaxed font-medium">
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