import React from 'react';
import { MapPin, Mail } from 'lucide-react';
import { Logo } from "@/components"
import { ThemeToggle } from "@/components/ThemeToggle"
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    /* bg-white -> bg-card-bg | text-gray-300 -> text-slate-500/dark:text-slate-400 */
    <footer className="bg-card-bg text-slate-600 dark:text-slate-400 py-16 border-t-4 border-brand-600 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Coluna 1: Logo e Social */}
          <div className="flex flex-col gap-6">
            <div className="w-32">
                {/* O Logo agora herda a cor text-app-fg que definimos no global */}
                <Logo className="text-app-fg" />
            </div>
            <p className="text-sm leading-relaxed">
              Especialistas em Indústria 4.0, IoT e sistemas embarcados. Unindo academia e mercado para criar o futuro da manufatura avançada.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-app-bg border border-card-border flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all shadow-sm" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-app-bg border border-card-border flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all shadow-sm" aria-label="GitHub">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-app-fg font-bold text-lg mb-6">Explorar</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li><a href="/" className="hover:text-brand-500 transition-colors">Início</a></li>
              <li><a href="/sobre" className="hover:text-brand-500 transition-colors">O Laboratório</a></li>
              <li><a href="/noticias" className="hover:text-brand-500 transition-colors">Publicações</a></li>
              <li><a href="/portfolio" className="hover:text-brand-500 transition-colors">Projetos</a></li>
            </ul>
          </div>

          {/* Especialidades */}
          <div>
            <h3 className="text-app-fg font-bold text-lg mb-6">Expertise</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li className="flex items-center gap-2">Análise de Falhas</li>
              <li className="flex items-center gap-2">Automação & IoT</li>
              <li className="flex items-center gap-2">Robótica</li>
              <li className="flex items-center gap-2">Software Industrial</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-app-fg font-bold text-lg mb-6">Contato</h3>
            <ul className="flex flex-col gap-5 text-sm font-medium">
              <li className="flex items-start gap-3">
                <span className="p-1.5 bg-brand-500/10 rounded-lg text-brand-500"><MapPin size={16} /></span>
                <span>Av. Salgado Filho, 3501<br />Sala E1 - Guarulhos, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="p-1.5 bg-brand-500/10 rounded-lg text-brand-500"><Mail size={16} /></span>
                <span>contato@laboficinas40.com.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Rodapé Final */}
 <div className="border-t border-card-border mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-500/80">
  
  {/* Copyright - Lado Esquerdo */}
  <p className="order-2 md:order-1 text-center md:text-left leading-loose">
    &copy; {currentYear} Laboratório Oficinas 4.0 IFSP. <span className="hidden sm:inline">Todos os direitos reservados.</span>
  </p>

  {/* Links e Toggle - Lado Direito */}
  <div className="order-1 md:order-2 flex items-center gap-8 justify-center">
    <div className="flex items-center gap-6 border-r border-card-border pr-8 mr-2">
      <a href="#" className="hover:text-brand transition-colors duration-300">Privacidade</a>
      <a href="#" className="hover:text-brand transition-colors duration-300">Cookies</a>
    </div>
    
    {/* O ThemeToggle ganha destaque mas mantém o alinhamento central */}
    <div className="flex items-center">
      <ThemeToggle />
    </div>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;