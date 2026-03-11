import { createNews } from "@/app/actions/create-news"
import { NewsForm } from "@/components/NewsForm"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
export default function NovaNoticiaPage() {
return (
  /* Substituímos bg-slate-950 por bg-app-bg e text-white por text-app-fg */
  <div className="min-h-screen bg-app-bg text-app-fg p-4 md:p-8 transition-colors duration-300">
    <div className="max-w-4xl mx-auto">
      
      <div className="flex items-center gap-4 mb-8">
        {/* Botão de voltar agora usa bg-card-bg e border-card-border */}
        <Link 
          href="/dashboard" 
          className="p-2 bg-card-bg hover:bg-brand-500/10 rounded-xl transition-colors border border-card-border group"
        >
          <ArrowLeft size={20} className="text-slate-400 group-hover:text-brand-500" />
        </Link>
        
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="text-brand-500" />
          Nova Notícia
        </h1>
      </div>

      {/* O NewsForm já foi atualizado para ser dinâmico internamente */}
      <NewsForm action={createNews} />
    </div>
  </div>
);
}