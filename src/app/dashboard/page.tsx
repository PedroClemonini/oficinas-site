import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { 
  User, 
  KeyRound, 
  Link as LinkIcon, 
  PlusCircle, 
  FileText, 
  Eye, 
  EyeOff,
  PencilLine,
  ChevronLeft, 
  ChevronRight 
} from "lucide-react"
import { EditableProfile, PasswordForm, ConnectedAccounts } from "@/components"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { toggleVisibility } from "@/app/actions/news-actions"
import { ThemeToggle } from "@/components/ThemeToggle"
// Tipagem para aceitar os parâmetros da URL
interface DashboardProps {
  searchParams: Promise<{ page?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  // Lógica de Paginação
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const pageSize = 5
  const skip = (currentPage - 1) * pageSize

  // Buscamos o usuário, suas contas, as notícias paginadas e o total
  const [user, totalNews] = await Promise.all([
    prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { 
        accounts: { select: { provider: true } },
        news: {
          orderBy: { createdAt: 'desc' },
          take: pageSize,
          skip: skip,
        }
      }
    }),
    prisma.news.count({ where: { author: { email: session.user.email! } } })
  ])

  const hasPassword = !!user?.password
  const minhasNoticias = user?.news || []
  const totalPages = Math.ceil(totalNews / pageSize)

return (
    <div className="min-h-screen bg-app-bg text-app-fg p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header com Toggle */}
        <div className="flex justify-between items-center px-2">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Painel de Controle</h2>
         
        </div>

        {/* Seção de Perfil - O EditableProfile agora deve receber a description */}
        <section className="bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 shadow-xl transition-colors">
          <EditableProfile user={{
            id: user?.id || "",
            name: user?.name || "",
            username: user?.username || "",
            email: user?.email || "",
            image: user?.image || "",
            description: user?.description || "", // Passe a descrição aqui
            linkedinUrl: user?.linkedinUrl || "",
            instagramUrl: user?.instagramUrl || "",
            orcidUrl: user?.orcidUrl || "",
            lattesUrl: user?.lattesUrl || ""
          }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 border-t border-card-border pt-8">
            <div className="flex items-center gap-3 p-4 bg-app-bg rounded-2xl border border-card-border">
              <User className="text-brand" size={20} />
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Email da Conta</p>
                <p className="text-sm font-bold">{session.user?.email}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Notícias */}
        <section className="bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 rounded-lg text-brand">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-black tracking-tight">Minhas Notícias</h3>
            </div>
            <Link
              href="/dashboard/nova-noticia"
              className="bg-brand hover:bg-brand-dark text-white font-black py-2.5 px-5 rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-tighter shadow-lg shadow-brand/20"
            >
              <PlusCircle size={18} />
              Nova Notícia
            </Link>
          </div>

          <div className="space-y-4 min-h-[300px]">
            {minhasNoticias.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-card-border rounded-3xl">
                <p className="text-slate-500 font-medium">Nenhuma notícia publicada ainda.</p>
              </div>
            ) : (
              minhasNoticias.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-5 bg-app-bg rounded-2xl border border-card-border hover:border-brand/40 transition-all group shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold tracking-tight ${!item.published ? 'text-slate-500 italic' : 'text-app-fg'}`}>
                        {item.title}
                      </span>
                      {item.published ? (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 px-2.5 py-1 rounded-full border border-emerald-500/20 font-black uppercase tracking-widest">Público</span>
                      ) : (
                        <span className="text-[9px] bg-slate-500/10 text-slate-500 px-2.5 py-1 rounded-full border border-slate-500/20 font-black uppercase tracking-widest">Oculto</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Ações de visibilidade e edição */}
                    <Link 
                      href={`/dashboard/editar-noticia/${item.id}`}
                      className="p-2.5 text-slate-400 rounded-xl hover:bg-card-bg hover:text-brand border border-transparent hover:border-card-border transition-all"
                    >
                      <PencilLine size={18} />
                    </Link>
                    <Link 
                      href={`/noticias/${item.slug}`} 
                      className="p-2.5 text-slate-400 rounded-xl hover:bg-card-bg hover:text-app-fg border border-transparent hover:border-card-border transition-all"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-card-border">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                Página {currentPage} de {totalPages}
              </span>
              <div className="flex gap-3">
                <Link
                  href={`/dashboard?page=${currentPage - 1}`}
                  className={`p-2.5 rounded-xl border border-card-border transition-all ${currentPage <= 1 ? 'opacity-20 pointer-events-none' : 'hover:bg-brand hover:text-white'}`}
                >
                  <ChevronLeft size={20} />
                </Link>
                <Link
                  href={`/dashboard?page=${currentPage + 1}`}
                  className={`p-2.5 rounded-xl border border-card-border transition-all ${currentPage >= totalPages ? 'opacity-20 pointer-events-none' : 'hover:bg-brand hover:text-white'}`}
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Segurança e Contas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 shadow-xl transition-colors">
              <div className="flex items-center gap-3 mb-8">
                <LinkIcon className="text-brand" size={20} />
                <h3 className="text-xl font-black tracking-tight">Conexões</h3>
              </div>
              <ConnectedAccounts accounts={user?.accounts || []} hasPassword={hasPassword} />
            </section>

            <section className="bg-card-bg border border-card-border rounded-3xl p-6 md:p-8 shadow-xl transition-colors">
              <div className="flex items-center gap-3 mb-8">
                <KeyRound className="text-brand" size={20} />
                <h3 className="text-xl font-black tracking-tight">Segurança</h3>
              </div>
              <PasswordForm hasPassword={hasPassword} />
            </section>
        </div>

      </div>
    </div>
  )
}