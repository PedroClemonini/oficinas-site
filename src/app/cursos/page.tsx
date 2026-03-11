import React from 'react';
import { Hammer } from 'lucide-react'; // Usando lucide para manter o padrão do projeto

const Cursos = () => {
  return ( 
    /* Trocamos bg-gray-50 por bg-app-bg (dinâmico) */
   <main className="w-full min-h-screen bg-app-bg text-app-fg flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <div className="text-center">
        
        {/* Ícone usando a cor da marca definida no seu CSS global */}
        <div className="flex justify-center mb-6 text-foreground animate-pulse">
          <Hammer size={64} strokeWidth={1.5} />
        </div>

        {/* Trocamos text-slate-800 por text-app-fg */}
        <h1 className="text-3xl md:text-4xl font-bold text-app-fg tracking-tight mb-4">
          Área em Construção
        </h1>
        
        {/* Usamos text-slate-500 com variante dark para o texto de apoio */}
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Estamos configurando os servidores e preparando o conteúdo. 
          Volte em breve para conferir nossa nova grade de cursos!
        </p>

        {/* Um detalhe visual extra para preencher o espaço enquanto não há cursos */}
        <div className="mt-8 flex gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.3s]" />
        </div>
      </div>
    </main>
  );
};

export default Cursos;