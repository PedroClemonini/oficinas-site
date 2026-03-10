"use client"
import { changePassword } from "@/app/actions/change-password"
import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react"

interface PasswordFormProps {
  hasPassword?: boolean
}

export function PasswordForm({ hasPassword }: PasswordFormProps) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleAction(formData: FormData) {
    setLoading(true)
    setStatus(null)
    const res = await changePassword(formData)
    
    if (res.error) setStatus({ type: 'error', msg: res.error })
    else setStatus({ type: 'success', msg: res.success! })
    
    setLoading(false)
  }

  return (
    <form action={handleAction} className="space-y-4 max-w-sm">
      {!hasPassword && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl mb-4 flex gap-3 items-start">
          <ShieldAlert className="text-amber-500 shrink-0" size={18} />
          <p className="text-xs text-amber-200/70">
            Você entrou via GitHub. Defina uma senha abaixo para também poder aceder via e-mail.
          </p>
        </div>
      )}

      {/* Só mostra este campo se o utilizador já tiver uma senha definida no banco */}
      {hasPassword && (
        <input 
          name="currentPassword" 
          type="password" 
          placeholder="Senha Atual" 
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none transition-all"
          required
        />
      )}

      <input 
        name="newPassword" 
        type="password" 
        placeholder={hasPassword ? "Nova Senha" : "Criar Senha"} 
        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none transition-all"
        required
      />
      
      {status && (
        <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {status.type === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
          {status.msg}
        </div>
      )}

      <button 
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-xl transition-all flex items-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {hasPassword ? "Atualizar Senha" : "Definir Senha de Acesso"}
      </button>
    </form>
  )
}