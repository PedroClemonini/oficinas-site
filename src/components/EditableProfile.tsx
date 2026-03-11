"use client"
import { useState } from "react"
import { User, Camera, Check, ExternalLink, Loader2, Pencil, Linkedin, Instagram } from "lucide-react"
import { updateProfile } from "@/app/actions/user-actions"
import { OrcidIcon, LattesIcon } from "@/components/Icons"
import Link from "next/link"
interface EditableProfileProps {
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    image: string;
    description: string;
    linkedinUrl: string;
    instagramUrl: string;
    orcidUrl: string;
    lattesUrl: string;
  }
}

export function EditableProfile({ user }: EditableProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave(formData: FormData) {
    setLoading(true)
    const result = await updateProfile(formData)
    setLoading(false)
    if (result.success) setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form action={handleSave} className="space-y-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Nome de Exibição</label>
            <input
              name="name"
              defaultValue={user.name}
              className="w-full p-3.5 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all font-bold shadow-sm"
              required
            />
          </div>

          {/* URL da Foto */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">URL da Foto de Perfil</label>
            <div className="relative">
              <Camera className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input
                name="image"
                defaultValue={user.image}
                className="w-full p-3.5 pl-12 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Username
            </label>
            {user.username && (
              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase">
                Não pode ser alterado
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-500 text-sm">@</span>
            <input
              name="username"
              defaultValue={user.username || ""}
              /* Se já existir um username, o campo fica travado */
              readOnly={!!user.username}
              className={`w-full p-3.5 pl-8 rounded-2xl border transition-all font-bold outline-none ${user.username
                ? "bg-slate-100 dark:bg-slate-800/50 border-card-border text-slate-500 cursor-not-allowed"
                : "bg-app-bg border-card-border text-brand focus:border-brand"
                }`}
              placeholder="ex: pedroclemonini"
            />
          </div>
        </div>

        {/* Descrição / Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sobre Mim (Bio)</label>
          <textarea
            name="description"
            defaultValue={user.description}
            rows={3}
            className="w-full p-4 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all resize-none font-medium leading-relaxed"
            placeholder="Conte sobre sua trajetória no laboratório..."
          />
        </div>

        {/* Links Sociais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">LinkedIn (URL)</label>
            <input
              name="linkedinUrl"
              defaultValue={user.linkedinUrl}
              placeholder="https://linkedin.com/in/perfil"
              pattern="https?://(www\.)?linkedin\.com/in/.*"
              className="w-full p-3.5 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all text-sm"
                     
                          onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("O link deve começar com https://linkedin.com/in/");
              }}

              // 2. Limpa a mensagem enquanto o usuário digita (importante!)
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
                // Aproveita para limpar espaços vazios automaticamente
                target.value = target.value.trim();
              }}
            
            
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Instagram (URL)</label>
            <input
              name="instagramUrl"
              defaultValue={user.instagramUrl}
              placeholder="https://instagram.com/usuario"
              pattern="https?://(www\.)?instagram\.com/.*"
              className="w-full p-3.5 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all text-sm"
            
                          onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("O link deve começar com https://instagram.com");
              }}

              // 2. Limpa a mensagem enquanto o usuário digita (importante!)
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
                // Aproveita para limpar espaços vazios automaticamente
                target.value = target.value.trim();
              }}
            />
          
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Orcid (URL)</label>
            <input
              name="orcidUrl"
              defaultValue={user.orcidUrl}
              placeholder="https://orcid.org/usuario"
              pattern="https?://orcid\.org/.*"
              className="w-full p-3.5 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all text-sm"
            
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("O link deve começar com https://orcid.org/");
              }}

              // 2. Limpa a mensagem enquanto o usuário digita (importante!)
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
                // Aproveita para limpar espaços vazios automaticamente
                target.value = target.value.trim();
              }}
            />
            
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Lattes (URL)</label>
            <input
              name="lattesUrl"
              defaultValue={user.lattesUrl}
              pattern="https?://lattes\.cnpq\.br/.*"
              placeholder="https://lattes.cnpq.br/usuario"
              className="w-full p-3.5 rounded-2xl bg-app-bg border border-card-border text-app-fg focus:border-brand outline-none transition-all text-sm"

              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("O link deve começar com https://lattes.cnpq.br/");
              }}

              // 2. Limpa a mensagem enquanto o usuário digita (importante!)
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity("");
                // Aproveita para limpar espaços vazios automaticamente
                target.value = target.value.trim();
              }}
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 md:flex-none bg-brand hover:bg-brand-dark text-white font-black py-3 px-10 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/20 active:scale-95"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
            Salvar Perfil
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="p-3 text-slate-500 hover:text-red-500 transition-colors font-bold uppercase text-[11px] tracking-widest"
          >
            Cancelar
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="group relative flex flex-col md:flex-row items-center md:items-start gap-8 transition-all duration-500">
      <div className="relative shrink-0">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-[2.5rem] border-4 border-card-bg shadow-2xl ring-2 ring-brand/10 group-hover:ring-brand/40 transition-all duration-500"
          />
        ) : (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-app-bg flex items-center justify-center border-2 border-card-border shadow-inner">
            <User className="text-slate-300 dark:text-slate-700" size={60} />
          </div>
        )}

      </div>

      <div className="flex-1 text-center md:text-left pt-2">
        <div className="flex items-center justify-center md:justify-start gap-4">

          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-app-fg">{user.name}</h2>
          <Link
            href={`/profile/${user.username || user.id}`} // Tenta o username, se não tiver, usa o ID
            target="_blank"
            className="p-2 text-slate-400 hover:text-brand transition-colors"
            title="Ver perfil público"
          >
            <ExternalLink size={18} />
          </Link>
          <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-brand transition-colors hidden md:block">
            <Pencil size={18} />
          </button>
        </div>

        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
          {user.description || "Adicione uma descrição para que as pessoas conheçam seu trabalho no laboratório."}
        </p>



        <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
          <div className="h-4 w-[1px] bg-card-border" />
          <div className="flex gap-3">
            {user.linkedinUrl && <Linkedin size={18} className="text-slate-400 hover:text-[#0077b5] transition-colors cursor-pointer" />}
            {user.instagramUrl && <Instagram size={18} className="text-slate-400 hover:text-[#e4405f] transition-colors cursor-pointer" />}
            {user.orcidUrl && <OrcidIcon size={18} className="text-slate-400 hover:text-[#e4405f] transition-colors cursor-pointer" />}
            {user.lattesUrl && <LattesIcon size={18} className="text-slate-400 hover:text-[#e4405f] transition-colors cursor-pointer" />}

          </div>
        </div>
      </div>
    </div>
  )
}