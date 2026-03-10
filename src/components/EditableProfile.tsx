"use client"
import { useState } from "react"
import { User, Pencil, Check, X, Camera, Loader2 } from "lucide-react"
import { updateProfile } from "@/app/actions/update-profile"

interface EditableProfileProps {
  user: {
    name: string | null
    email: string | null
    image: string | null
  }
}

export function EditableProfile({ user }: EditableProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave(formData: FormData) {
    setLoading(true)
    const res = await updateProfile(formData)
    if (!res.error) {
      setIsEditing(false)
    } else {
      alert(res.error)
    }
    setLoading(false)
  }

  if (isEditing) {
    return (
      <form action={handleSave} className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
        {/* Edição de Foto (URL) */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 uppercase">URL da Foto</label>
          <div className="relative">
            <Camera className="absolute left-3 top-3 text-slate-500" size={16} />
            <input 
              name="image" 
              defaultValue={user.image || ""} 
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full md:w-64 bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Edição de Nome */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs font-bold text-slate-500 uppercase">Nome de Exibição</label>
          <div className="flex gap-2">
            <input 
              name="name" 
              defaultValue={user.name || ""} 
              required
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 px-4 text-sm text-white focus:border-indigo-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 p-2 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="bg-red-500/10 text-red-500 hover:bg-red-500/20 p-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="flex items-center gap-6 mb-6 group relative">
      <div className="relative">
        {user.image ? (
          <img
            src={user.image}
            alt="Avatar"
            className="w-20 h-20 object-cover rounded-2xl border-2 border-indigo-500/50"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center border-2 border-slate-700">
            <User className="text-slate-500" size={32} />
          </div>
        )}
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute -bottom-2 -right-2 bg-slate-800 text-slate-300 p-1.5 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 hover:text-white shadow-lg"
          title="Editar Perfil"
        >
          <Pencil size={14} />
        </button>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-slate-500 hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Pencil size={16} />
          </button>
        </div>
        <span className="text-indigo-400 text-sm font-medium px-2 py-0.5 bg-indigo-500/10 rounded-full inline-block mt-1">
          Membro Ativo
        </span>
      </div>
    </div>
  )
}