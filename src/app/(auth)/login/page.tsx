'use client'

import { signIn } from "next-auth/react"
import { Github, Mail, Lock, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Evita recarregar a página para podermos tratar erros
    })

    if (result?.error) {
      setError("Email ou senha inválidos")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
          <p className="text-slate-400">Acesse sua conta para continuar</p>
        </div>

        {/* Formulário de Credenciais Internas */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                name="password"
                type="password"
                placeholder="Senha"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Entrar com Email"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500 font-medium">Ou continue com</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl border border-slate-700 transition-all duration-200"
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            Não tem uma conta? <a href="/register" className="text-white hover:underline">Registre-se</a>
          </p>
        </div>
      </div>
    </div>
  )
}