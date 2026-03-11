"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Loader2, UploadCloud, X, FilePlus, FileEdit, Eye, Layout } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
interface NewsFormProps {
  initialData?: any;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  buttonText?: string;
}

export function NewsForm({ initialData, action, buttonText }: NewsFormProps) {
  const [loading, setLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false) // Estado do Toggle de Preview
  
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.coverImage || null)
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [content, setContent] = useState(initialData?.content || "")
  
  const router = useRouter()

  // Handler para troca de imagem (gera preview local instantâneo)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile)) // Cria URL temporária para o browser
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!initialData) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  async function handleAction(formData: FormData) {
    setLoading(true)
    let coverImageUrl = previewUrl || ""

    if (file) {
      const uploadData = new FormData()
      uploadData.append("file", file)
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData })
      if (uploadRes.ok) {
        const { url } = await uploadRes.json()
        coverImageUrl = url 
      } else {
        alert("Erro no upload da imagem.")
        setLoading(false)
        return
      }
    }

    formData.append("coverImage", coverImageUrl)
    formData.append("content", content) // Garante que o conteúdo do state vá para o form
    
    const res = await action(formData)
    if (res.error) {
      alert(res.error)
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  /* 1. bg-slate-900 -> bg-card-bg | border-slate-800 -> border-card-border */
return (
  <div className="flex flex-col gap-6 transition-colors duration-300">
    {/* Tab Switcher Dinâmico */}
    <div className="flex bg-card-bg p-1 rounded-xl border border-card-border self-start shadow-sm">
      <button 
        onClick={() => setIsPreview(false)}
        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${!isPreview ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-500 hover:text-app-fg'}`}
      >
        <Layout size={16} /> Editor
      </button>
      <button 
        onClick={() => setIsPreview(true)}
        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${isPreview ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-500 hover:text-app-fg'}`}
      >
        <Eye size={16} /> Preview
      </button>
    </div>

    {!isPreview ? (
      /* --- MODO EDITOR --- */
      <form action={handleAction} className="bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6">
        
        {/* Imagem de Capa */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Imagem de Capa</label>
          
          {previewUrl && (
            <div className="relative mt-4 mb-2"> 
              <button 
                type="button" 
                onClick={() => {setFile(null); setPreviewUrl(null)}} 
                className="absolute -top-3 -right-3 z-50 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-2xl transition-all border-4 border-card-bg flex items-center justify-center"
              >
                <X size={16} strokeWidth={3} />
              </button>
              <div className="w-full rounded-2xl border border-card-border bg-app-bg flex items-center justify-center p-3 min-h-[150px] overflow-hidden">
                <img src={previewUrl} alt="Capa" className="max-w-full h-auto max-h-[300px] object-contain rounded-xl shadow-sm" />
              </div>
            </div>
          )}

          <div className="relative border-2 border-dashed border-card-border rounded-xl p-8 hover:border-brand-500 transition-colors bg-app-bg/50 group">
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center gap-2 text-slate-500 text-center group-hover:text-brand-500">
              <UploadCloud size={32} />
              <span className="text-sm font-bold">Clique ou arraste para alterar a capa</span>
            </div>
          </div>
        </div>

        {/* Campos de Texto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input name="title" value={title} onChange={handleTitleChange} className="w-full p-4 rounded-xl bg-app-bg border border-card-border focus:border-brand-500 outline-none transition-all text-app-fg font-bold" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Slug (URL)</label>
            <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-4 rounded-xl bg-app-bg border border-card-border focus:border-brand-500 outline-none transition-all font-mono text-brand-600 dark:text-brand-400" required />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Conteúdo (Markdown)</label>
          <textarea 
            name="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            rows={12} 
            className="w-full p-4 rounded-xl bg-app-bg border border-card-border focus:border-brand-500 outline-none transition-all font-mono text-sm resize-y text-app-fg" 
            required 
          />
        </div>

        {/* Botão de Salvar */}
        <div className="flex flex-col gap-4">
          <button type="submit" disabled={loading} className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 active:scale-[0.98]">
            {loading ? <Loader2 className="animate-spin" size={20} /> : (initialData ? <FileEdit size={20} /> : <FilePlus size={20} />)}
            {buttonText || (initialData ? "Atualizar Notícia" : "Publicar Agora")}
          </button>

          {/* BOTÃO DE EXCLUSÃO (Só aparece na edição) */}
          {initialData && (
            <button
              type="button"
              onClick={async () => {
                if (confirm("⚠️ TEM CERTEZA? Esta notícia será apagada permanentemente do banco de dados.")) {
                  // Aqui você chama a sua Server Action: await deleteNews(initialData.id)
                  console.log("Excluindo notícia:", initialData.id);
                }
              }}
              className="py-2 text-red-500 dark:text-red-400 text-xs font-black uppercase tracking-tighter hover:underline transition-all"
            >
              Excluir publicação permanentemente
            </button>
          )}
        </div>
      </form>
    ) : (
      /* --- MODO PREVIEW --- */
      <div className="bg-card-bg border border-card-border rounded-3xl p-6 md:p-10 shadow-xl min-h-[600px] transition-colors">
        <header className="mb-8 pb-8 border-b border-card-border">
          <h1 className="text-4xl font-extrabold text-app-fg mb-6 leading-tight tracking-tighter">
            {title || "Título da Notícia"}
          </h1>
          {previewUrl && (
            <img src={previewUrl} alt="Preview Capa" className="w-full h-auto max-h-[400px] object-cover rounded-2xl border border-card-border mb-6 shadow-md" />
          )}
          <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
            <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
              <User size={16} />
            </div>
            <span>Preview do Autor</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </header>

        {/* Markdown Preview com suporte a Dark Mode automático */}
        <div className="prose prose-lg dark:prose-invert prose-brand max-w-none text-app-fg/90">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content || "*Escreva algo para ver o preview aqui...*"}
          </ReactMarkdown>
        </div>
      </div>
    )}
  </div>
)
}