import { ArrowRight } from "lucide-react"

export function Banner() {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-slate-950">
      {/* Background Decorativo (Sutil para não distrair) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/10">
          Novo: Integração com Proxmox v3.0
        </span> */}

        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
         O Novo Laboratório <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-dark">
             Oficinas 4.0
          </span>
        </h1>

        {/* Subtítulo 
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10">
          Pesquisa, serviços, consultoria e extensão
        </p>
*/}
        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">
            Conheça agora
            <ArrowRight className="h-5 w-5" />
          </button>
          
        </div>
      </div>
    </section>
  )
}