import React from 'react';

import { Logo } from "@/components"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#002847] text-gray-300 py-12 border-t-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid principal do Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Coluna 1: Sobre a Empresa */}
          <div className="flex flex-col gap-4">
            {/* Se for usar o seu MyLogo aqui, lembre-se de mudar a classe dele para 'text-white' para aparecer no fundo escuro */}
            <div className="w-32 mb-4">
                <Logo className="text-white" />
            </div>
            <p className="text-sm leading-relaxed mt-2">
              Especialistas em infraestrutura de TI, redes de alta performance e virtualização. Entregamos estabilidade e segurança para o seu negócio.
            </p>
            {/* Redes Sociais */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-[#003d6a] flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#003d6a] flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" aria-label="GitHub">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Navegação</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Sobre o Laboratório</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Nossos Serviços</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Últimas Notícias</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Especialidades / Serviços */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Especialidades</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Análise de Falhas</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Automação e IoT</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Robótica e Embarcados</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Software</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Fale Conosco</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                <span>Avenida Salgado Filho, 3501 Sala E1<br />Guarulhos, SP - Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.074-6.97l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <span>contato@laboficinas40.com.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha Divisória */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {currentYear} Laboratório Oficinas 4.0 Guarulhos. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;