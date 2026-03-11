import { updateNews } from "@/app/actions/update-news"
import { NewsForm } from "@/components/NewsForm"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

export default async function EditarNoticiaPage({ params }: any) {
  const { id } = await params
  const news = await prisma.news.findUnique({ where: { id } })

  // Usamos o .bind para injetar o ID como primeiro argumento da Action
  const updateWithId = updateNews.bind(null, id)

return (
    /* Trocamos bg-slate-950 por bg-app-bg e text-white por text-app-fg */
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
            Editar Notícia
          </h1>
        </div>

        {/* O NewsForm centralizado já cuida das cores internas dos inputs */}
        <NewsForm initialData={news} action={updateWithId} />
      </div>
    </div>
  )
}