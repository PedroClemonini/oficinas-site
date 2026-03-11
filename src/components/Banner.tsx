import { ArrowRight } from "lucide-react"

export function Banner() {
  return (
  /* 1. bg-slate-950 -> bg-app-bg | Adicionamos transition para o toggle de tema */
  <section className="relative w-full py-24 lg:py-40 overflow-hidden bg-app-bg transition-colors duration-500">
    
    {/* 2. Background Decorativo: Ajustamos a opacidade para o Light Mode não ficar estranho */}
    <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
      <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-brand-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
    </div>

    <div className="container relative z-10 mx-auto px-4 text-center">
      
      {/* Selo Opcional Dinâmico */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 border border-brand-500/20 rounded-full bg-brand-500/5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
        </span>
        Inovação & Tecnologia
      </div>

      {/* Título Principal: text-white -> text-app-fg */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-app-fg mb-8 leading-[1.1]">
       O Novo Laboratório <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-blue-400 to-cyan-400 animate-gradient-x">
           Oficinas 4.0
        </span>
      </h1>

      {/* Subtítulo (Descomentado e ajustado) */}
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 font-medium leading-relaxed">
        Pesquisa aplicada, consultoria industrial e desenvolvimento de talentos para a nova economia digital.
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="group flex items-center gap-2 px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-500/25 active:scale-95">
          Conheça agora
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        {/* Botão Secundário para preencher o layout */}
        <button className="px-10 py-4 bg-card-bg text-app-fg border border-card-border font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          Nossos Serviços
        </button>
      </div>
    </div>
  </section>
)
}