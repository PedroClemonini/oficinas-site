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
                    <div key={p.id} className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className={`${isConnected ? 'text-white' : 'text-slate-600'}`}>
                                {p.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{p.name}</p>
                                <p className="text-xs text-slate-500">
                                    {isConnected ? "Vinculado" : "Não vinculado"}
                                </p>
                            </div>
                        </div>

                        {isConnected ? (
                            <button
                                onClick={() => handleUnlink(p.id)}
                                disabled={loading === p.id}
                                className="p-2 text-slate-500 hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                                <Trash2 size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={() => signIn(p.id, { callbackUrl: '/dashboard' })}
                                className="flex items-center gap-2 text-xs font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-all border border-indigo-500/20"
                            >
                                <LinkIcon size={14} />
                                Vincular {p.name}
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}