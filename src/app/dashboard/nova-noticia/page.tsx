"use client"
import { useState } from "react"
import { createNews } from "@/app/actions/create-news"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft, Save, FileText, UploadCloud } from "lucide-react"
import Link from "next/link"

export default function NovaNoticiaPage() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  // Novo estado para guardar o arquivo selecionado
  const [file, setFile] = useState<File | null>(null) 
  const router = useRouter()

  // Função para gerar a URL (slug) automaticamente enquanto você digita o título
const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  }

async function handleAction(formData: FormData) {
    setLoading(true)
    
    let coverImageUrl = ""

    // 1. Se o usuário selecionou um arquivo, fazemos o upload na nossa API primeiro
    if (file) {
      const uploadData = new FormData()
      uploadData.append("file", file)

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      })

      if (uploadRes.ok) {
        const { url } = await uploadRes.json()
        coverImageUrl = url // Pegamos a URL local gerada (ex: /uploads/123-foto.jpg)
      } else {
        alert("Erro ao fazer upload da imagem de capa.")
        setLoading(false)
        return
      }
    }

    // 2. Injetamos a URL gerada no formData que vai para a Server Action
    formData.append("coverImage", coverImageUrl)

    // 3. Chama a função que salva no banco (PostgreSQL)
    const res = await createNews(formData)
    
    if (res.error) {
      alert(res.error)
      setLoading(false)
    } else {
      router.push("/noticias")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800">
            <ArrowLeft size={20} className="text-slate-400" />
          </Link>
          
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-indigo-500" />
            Escrever Notícia
          </h1>
        </div>

        <form action={handleAction} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
     <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Imagem de Capa</label>
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-4 hover:border-indigo-500 transition-colors bg-slate-950/50">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center gap-3 text-slate-400">
                <UploadCloud className="text-indigo-500" />
                <span>
                  {file ? <span className="text-indigo-400 font-medium">{file.name}</span> : "Clique ou arraste uma imagem aqui"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Título</label>
              <input 
                name="title" 
                value={title}
                onChange={handleTitleChange}
                placeholder="Ex: Novo Switch Core Instalado" 
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none transition-all"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">URL Amigável (Slug)</label>
              <input 
                name="slug" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="novo-switch-core-instalado" 
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none transition-all font-mono text-sm text-indigo-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Resumo (Para o Card)</label>
            <input 
              name="resume" 
              placeholder="Uma breve descrição sobre a notícia..." 
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

<div className="flex flex-col gap-2">
  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Conteúdo (Markdown)</label>
  <textarea 
    name="content" 
    rows={15}
    // A correção está aqui: usamos {} e \n
    placeholder={"Escreva sua notícia aqui usando Markdown...\n\n## Subtítulo\n- Item 1\n- Item 2\n\n**Texto em negrito**"} 
    className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none transition-all font-mono text-sm resize-y"
    required
  />
</div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="published" defaultChecked className="w-5 h-5 rounded border-slate-700 bg-slate-950 accent-indigo-500" />
              <span className="text-slate-300 font-medium">Publicar imediatamente</span>
            </label>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Salvar Notícia
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}