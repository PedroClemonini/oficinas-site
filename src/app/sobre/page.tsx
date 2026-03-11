import React from 'react';
import { ArmSection, CoordinatorsSection } from '@/components'; // Descomente se quiser usar o logo aqui também

const Sobre = () => {
  return (
    <main className="w-full min-h-screen bg-app-bg transition-colors duration-300">

      <section className="bg-[#003d6a] dark:bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            O laboratório referência em Indústria 4.0 em Guarulhos
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
            Conheça quem somos e como transformamos desafios tecnológicos em soluções reais para o mercado.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-app-fg mb-6">Nossa História</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
              O <b>Laboratório Oficinas 4.0 do IFSP Guarulhos</b> é um centro de excelência estabelecido por meio da Chamada Pública 02/2020 (IFES/SETEC), dedicado a preparar talentos para os desafios da <b>Indústria 4.0</b>.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Foi idealizado pelos esforços dos professores Me. Rogério Daniel Dantas, Me. Cristiano Alves Pessoa, Dr. Wilson Carlos da Silva Jr, Dr. Osias Baptista de Souza e Dr. Hamilton Piva Rodrigues em 2020.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 border border-card-border">
            <img
              src="/historia.jpg"
              alt="Infraestrutura do Laboratório"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-card-bg border-y border-card-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl h-96 border border-card-border">
              <img
                src="/abordagem.jpeg"
                alt="Pesquisa Aplicada"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-app-fg mb-6">Nossa Abordagem</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Hoje buscamos integrar a excelência acadêmica ao dinamismo do mercado, posicionando-nos como um <b>Hub de Inovação</b>. Focamos em pesquisa aplicada, transformando conhecimento científico em serviços e novas startups.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Nossa missão é aproximar o IFSP do mercado, impulsionando a colaboração técnico-científica e respondendo às demandas da nova economia com agilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Nossas Especialidades Técnicas */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-app-fg">Nossa Expertise</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
              Tecnologias de ponta para a transformação digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


            {/* Card 1 */}
            <div className="p-8 bg-card-bg rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 400 400" strokeWidth="16" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M57 193.48C61.6479 150.493 84.5896 129 125.825 129C187.678 129 195.16 272 269.08 272C330.771 272 343 201.978 343 193.48" />
                </svg>

              </div>
              <h3 className="text-xl font-bold text-app-fg mb-3">Análise de Falhas</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                A integração entre análise de vibrações e Inteligência Artificial transforma a manutenção. Sensores captam padrões mecânicos, enquanto algoritmos de IA identificam anomalias e preveem quebras com precisão. Essa sinergia elimina paradas inesperadas, reduz custos e garante a máxima eficiência operacional através do monitoramento preditivo em tempo real.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-card-bg rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-app-fg mb-3"> Indústria e IoT</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Utilizando dispositivos IoT para conectar o chão de fábrica à inteligência de dados. Integrando sensores e redes inteligentes, a Indústria 4.0 permite monitoramento em tempo real, decisões autônomas e processos otimizados, elevando a produtividade e a precisão operacional através de ecossistemas digitais totalmente integrados.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-card-bg rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  viewBox="0 0 512 512"
                  /* Removido width/height fixos para o Tailwind controlar */
                  className="w-8 h-8 transition-all duration-300 hover:scale-110"
                  fill="currentColor" /* O segredo para o SVG herdar a cor do texto */
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M202.622,344.796l-6.208,11.926l-0.263,0.484c-14.411,24.499-41.026,39.714-69.478,39.714
          c-14.272,0-28.371-3.847-40.731-11.122c-18.544-10.908-31.733-28.37-37.122-49.195c-0.238-0.886-0.434-1.78-0.632-2.674
          L37.92,412.74h173.617L202.622,344.796z"/>
                    <path d="M212.883,59.091L66.446,280.944c-19.578,33.283-8.465,76.172,24.844,95.749
          c33.299,19.587,76.17,8.464,95.756-24.843l99.391-191.063l-54.788-52.082C217.361,93.974,212.497,77.52,212.883,59.091z
           M150.794,330.533c-7.808,13.288-24.909,17.716-38.188,9.916c-13.287-7.824-17.724-24.909-9.907-38.196
          c7.808-13.288,24.909-17.716,38.187-9.908C154.165,300.161,158.611,317.254,150.794,330.533z"/>
                    <path d="M216.401,422.247H34.278c-12.402,0-22.449,10.055-22.449,22.457V512h227.012v-67.296
          C238.841,432.302,228.794,422.247,216.401,422.247z"/>
                    <path d="M450.024,185.737c7.184,0,14.082,1.255,20.48,3.559L328.505,19.542c-22.646-24.606-60.956-26.188-85.554-3.535
          c-24.606,22.637-26.18,60.949-3.535,85.546l149.955,142.458C390.65,211.663,417.356,185.737,450.024,185.737z M299.584,77.537
          c-9.374,8.628-23.973,8.013-32.602-1.361c-8.645-9.375-8.038-23.974,1.345-32.603c9.375-8.644,23.974-8.038,32.619,1.346
          C309.575,54.293,308.967,68.892,299.584,77.537z"/>
                    <polygon points="431.668,365.227 451.246,387.249 470.815,365.227 470.815,328.975 431.668,328.975 	" />
                    <path d="M450.024,196.292c-27.698,0-50.155,22.449-50.155,50.155v72.169h100.301v-72.169
          C500.171,218.741,477.73,196.292,450.024,196.292z M450.024,264.492c-10.818,0-19.578-8.768-19.578-19.578
          c0-10.818,8.76-19.586,19.578-19.586c10.81,0,19.586,8.767,19.586,19.586C469.61,255.723,460.835,264.492,450.024,264.492z"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-app-fg mb-3">Robótica e Embarcados</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Integra hardware dedicado e sistemas embarcados de alto desempenho para criar soluções autônomas e precisas. Através de microcontroladores e sensores inteligentes, esses sistemas processam dados em tempo real, permitindo que máquinas interajam com o ambiente de forma eficiente, segura e totalmente programável para tarefas complexas.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 bg-card-bg rounded-3xl border border-card-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
              </div>
              <h3 className="text-xl font-bold text-app-fg mb-3">Software</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Soluções digitais escaláveis e seguras para o seu negócio. Desenvolvemos softwares focados em performance e experiência do usuário, utilizando arquiteturas modernas e seguras. Do backend à nuvem, entregamos sistemas robustos que automatizam fluxos de trabalho e suportam o crescimento acelerado da sua empresa.
              </p>
            </div>




          </div>
        </div>
      </section>
      <ArmSection />
      <CoordinatorsSection />


    </main>
  );
};

export default Sobre;  