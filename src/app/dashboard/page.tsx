import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { User, ShieldCheck, Calendar, KeyRound, Link as LinkIcon } from "lucide-react"
import { EditableProfile,PasswordForm, ConnectedAccounts } from "@/components"


export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { accounts: { select: { provider: true } } }
  })

  const hasPassword = !!user?.password
  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Card de Informações do Usuário */}
<section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          
          {/* COMPONENTE CLIENTE RENDERIZADO AQUI */}
          <EditableProfile user={{
            name: user?.name || "",
            email: user?.email || "",
            image: user?.image || ""
          }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <User className="text-slate-500" size={20} />
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                <p className="text-sm">{session.user?.email}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <LinkIcon className="text-indigo-500" />
          <h3 className="text-xl font-semibold text-white">Contas Vinculadas</h3>
        </div>
        
        <ConnectedAccounts 
          accounts={user?.accounts || []} 
          hasPassword={!!user?.password} 
        />
      </section>

        {/* Card de Segurança / Mudar Senha */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <KeyRound className="text-indigo-500" />
            <h3 className="text-xl font-semibold text-white">Segurança da Conta</h3>
          </div>

          {/* Passamos o estado para o componente cliente */}
          <PasswordForm hasPassword={hasPassword} />
        </section>

      </div>
    </div>
  )
}