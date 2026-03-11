"use client"
import { registerUser } from "@/app/actions/register"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react" // Importamos o signIn para o OAuth
import { Github } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const res = await registerUser(formData)
    if (res.success) router.push("/login")
    else alert(res.error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Criar Conta</h1>
        <p className="text-slate-400 text-sm text-center mb-8">Escolha como deseja se registrar</p>

        {/* Formulário de Registro Interno */}
        <form action={handleSubmit} className="flex flex-col gap-4">
          <input 
            name="name" 
            placeholder="Nome Completo" 
            className="w-full p-3 rounded-xl bg-slate-950 text-white border border-slate-800 focus:border-brand-500 outline-none transition-all placeholder:text-slate-600" 
            required 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded-xl bg-slate-950 text-white border border-slate-800 focus:border-brand-500 outline-none transition-all placeholder:text-slate-600" 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Crie uma Senha" 
            className="w-full p-3 rounded-xl bg-slate-950 text-white border border-slate-800 focus:border-brand-500 outline-none transition-all placeholder:text-slate-600" 
            required 
          />
          <button 
            type="submit" 
            className="w-full py-3 mt-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-brand-500/20"
          >
            Cadastrar com Email
          </button>
        </form>

        {/* Divisor Visual */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500 font-medium">Ou use redes sociais</span>
          </div>
        </div>

        {/* Registro via GitHub */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-200"
        >
          <Github className="w-5 h-5" />
          Registrar com GitHub
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          Já tem uma conta?{" "}
          <a href="/login" className="text-white hover:underline">
            Fazer login
          </a>
        </p>
      </div>
    </div>
  )
}