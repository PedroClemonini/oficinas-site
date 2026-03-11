"use client"
import { unlinkAccount } from "@/app/actions/auth-actions"
import { signIn } from "next-auth/react" 
import { Github, Mail, Globe, Trash2, Link as LinkIcon } from "lucide-react"
import { useState } from "react"

interface Account {
    provider: string
}

export function ConnectedAccounts({ accounts, hasPassword }: { accounts: Account[], hasPassword: boolean }) {
    const [loading, setLoading] = useState<string | null>(null)

    const handleUnlink = async (provider: string) => {
        if (!confirm(`Tem certeza que deseja desvincular o ${provider}?`)) return

        setLoading(provider)
        const res = await unlinkAccount(provider)
        if (res.error) alert(res.error)
        setLoading(null)
    }

    const providers = [
        { id: 'github', name: 'GitHub', icon: <Github size={18} /> },
        { id: 'google', name: 'Google', icon: <Globe size={18} /> },
    ]

return (
  <div className="space-y-4">
    {providers.map((p) => {
      const isConnected = accounts.some(acc => acc.provider === p.id)

      return (
        /* 1. bg-slate-950 -> bg-app-bg | border-slate-800 -> border-card-border */
        <div key={p.id} className="flex items-center justify-between p-4 bg-app-bg rounded-2xl border border-card-border transition-colors duration-300">
          <div className="flex items-center gap-3">
            {/* 2. text-white -> text-app-fg */}
            <div className={`${isConnected ? 'text-app-fg' : 'text-slate-400 dark:text-slate-600'}`}>
              {p.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-app-fg">{p.name}</p>
              <p className="text-xs text-slate-500 font-medium">
                {isConnected ? "Vinculado" : "Não vinculado"}
              </p>
            </div>
          </div>

          {isConnected ? (
            <button
              onClick={() => handleUnlink(p.id)}
              disabled={loading === p.id}
              className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all disabled:opacity-50"
              title="Desvincular conta"
            >
              <Trash2 size={18} />
            </button>
          ) : (
            <button
              onClick={() => signIn(p.id, { callbackUrl: '/dashboard' })}
              className="flex items-center gap-2 text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-xl hover:bg-brand-500/20 transition-all border border-brand-500/20"
            >
              <LinkIcon size={14} />
              Vincular
            </button>
          )}
        </div>
      )
    })}
  </div>
)
}