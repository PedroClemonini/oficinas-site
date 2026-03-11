"use client"
import { changePassword } from "@/app/actions/change-password"
import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle, ShieldAlert, Lock } from "lucide-react"

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
  /* Substituímos as cores fixas por variáveis do tema */
  <form action={handleAction} className="space-y-4 max-w-sm transition-colors duration-300">
    {!hasPassword && (
      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-4 flex gap-3 items-start">
        <ShieldAlert className="text-amber-600 dark:text-amber-500 shrink-0" size={20} />
        <p className="text-xs text-amber-700 dark:text-amber-200/70 font-medium leading-relaxed">
          Você entrou via GitHub. Defina uma senha abaixo para também poder acessar via e-mail e senha.
        </p>
      </div>
    )}

    {/* Campo de Senha Atual (Só se já houver senha) */}
    {hasPassword && (
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Senha Atual</label>
        <input 
          name="currentPassword" 
          type="password" 
          placeholder="••••••••" 
          className="w-full p-3.5 rounded-xl bg-app-bg border border-card-border text-app-fg focus:border-brand-500 outline-none transition-all shadow-sm"
          required
        />
      </div>
    )}

    {/* Campo de Nova Senha */}
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
        {hasPassword ? "Nova Senha" : "Criar Senha"}
      </label>
      <input 
        name="newPassword" 
        type="password" 
        placeholder="••••••••" 
        className="w-full p-3.5 rounded-xl bg-app-bg border border-card-border text-app-fg focus:border-brand-500 outline-none transition-all shadow-sm"
        required
      />
    </div>
    
    {/* Mensagens de Status Dinâmicas */}
    {status && (
      <div className={`flex items-center gap-2 text-sm p-4 rounded-xl border font-bold animate-in fade-in zoom-in-95 ${
        status.type === 'success' 
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20' 
        : 'bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20'
      }`}>
        {status.type === 'success' ? <CheckCircle2 size={18}/> : <AlertCircle size={18}/>}
        {status.msg}
      </div>
    )}

    <button 
      disabled={loading}
      className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-black py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 active:scale-95"
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
      {hasPassword ? "Atualizar Senha" : "Confirmar Senha"}
    </button>
  </form>
)
}