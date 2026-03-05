import React from 'react';
import { CoordinatorsSection } from '@/components'; // Descomente se quiser usar o logo aqui também

const Sobre = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      
      {/* Seção 1: Hero / Introdução */}
      <section className="bg-[#003d6a] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            O laboratório referência em Indústria 4.0 na cidade de Guarulhos
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
           Conheça quem somos e como podemos auxiliar a sua empresa e solucinar o seu problema!
          </p>
        </div>
      </section>
   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">História</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
             o <b>Laboratório Oficinas 4.0 do IFSP Guarulhos </b>é um centro de excelência estabelecido por meio da Chamada Pública 02/2020 (IFES/SETEC), dedicado a preparar talentos para os desafios da <b>Indústria 4.0</b>. Foi inicialmente concebido pelos esforços dos professores Me. Rogério Daniel Dantas, Me. Cristiano Alves Pessoa, Dr. Wilson Carlos da Silva Jr, Dr. Osias Baptista de Souza e Dr. Hamilton Piva Rodrigues, que buscaram a iniciativa e coordenaram os projetos que viabilizaram a criação do laboratório em 2020.
            </p>
          </div>
          {/* Imagem ilustrativa do escritório ou de infraestrutura */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-80">
            <img 
              src="/historia.jpg" 
              alt="Sala de servidores e infraestrutura" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Seção 2: Missão e Visão */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossa Abordagem</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
             Hoje buscamos integrar a excelência acadêmica ao dinamismo do mercado, posicionando-nos como um <b>Hub de Inovação</b> de referência em Guarulhos e São Paulo. Focamos no desenvolvimento de pesquisa aplicada em<b> Automação e Indústria 4.0</b>, transformando conhecimento científico em soluções práticas, serviços e novas startups.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nossa missão é promover a imersão prática de alunos e a especialização de professores em metodologias de inovação tecnológica, transformando a sala de aula em um ambiente de soluções reais. Ao aproximar o IFSP do mercado, o laboratório impulsiona a colaboração técnico-científica e responde às demandas da nova economia com agilidade e protagonismo técnico.
            </p>
          </div>
          {/* Imagem ilustrativa do escritório ou de infraestrutura */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-80">
            <img 
              src="/abordagem.jpeg" 
              alt="Sala de servidores e infraestrutura" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
   
      {/* Seção 3: Nossas Especialidades Técnicas */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003d6a]">Nossa Expertise</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Conheça nossas áreas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Análise de Falhas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                texto
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2"> Indústria e IoT</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
           texto
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Robótica e Embarcados</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
      texto
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Software</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
          texto
              </p>
            </div>


       

          </div>
        </div>
      </section>

      <CoordinatorsSection />
      
    </main>
  );
};

export default Sobre;  