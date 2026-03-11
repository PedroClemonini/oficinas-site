"use client"
import { Logo } from "@/components"
import { useState } from "react"
import { User, Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react" // Importamos o necessário

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, status } = useSession() // Hook para pegar a sessão

    const isLoading = status === "loading"

    return (
    /* 1. bg-white -> bg-app-bg/80 com Backdrop Blur (Efeito Vidro) */
    <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-app-bg/80 backdrop-blur-md px-4 md:px-8 border-b border-card-border transition-all duration-300">
        <nav className="flex items-center justify-start w-full gap-8 lg:gap-12">
            <div className="w-28 md:w-28 shrink-0">
                <Link href="/">
                    <Logo className="text-app-fg" />
                </Link>
            </div>

            {/* Desktop Menu - text-slate-500 -> text-app-fg/70 */}
            <div className="hidden md:flex gap-6 lg:gap-8 items-center">
                {['Sobre', 'Portfolio', 'Cursos', 'Noticias'].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="text-[13px]  tracking-tight text-app-fg/70 hover:text-brand-500 dark:hover:text-brand-400 transition-colors "
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* Área de Autenticação e Botões */}
            <div className="ml-auto flex items-center gap-3 md:gap-4">

                {isLoading ? (
                    <div className="h-8 w-20 bg-card-border animate-pulse rounded-full" />
                ) : session ? (
                    /* ESTADO: LOGADO */
                    <div className="flex items-center gap-3 md:gap-4">
                        <Link
                            href="/dashboard"
                            className="hidden sm:flex items-center gap-2 text-[13px] font-bold text-app-fg/80 hover:text-brand-500 transition-colors"
                        >
                            <LayoutDashboard size={16} />
                            Painel
                        </Link>

                        <div className="h-6 w-[1px] bg-card-border hidden sm:block" />

                        <div className="flex items-center gap-2 md:gap-3">
                            {session.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full border border-card-border shadow-sm"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full border border-card-border bg-card-bg flex items-center justify-center">
                                    <User className="text-slate-400" size={16} />
                                </div>
                            )}
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                title="Sair"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* ESTADO: DESLOGADO */
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-[13px] font-bold text-app-fg/70 hover:text-brand-500 transition-colors"
                        >
                            Entrar
                        </Link>
                        <Link href="/register">
                            <button className="hidden sm:block text-[12px] font-black uppercase tracking-tighter bg-app-fg text-app-bg px-5 py-2 rounded-full hover:scale-105 transition-all shadow-md active:scale-95">
                                Criar conta
                            </button>
                        </Link>
                    </div>
                )}

                {/* Botão Mobile */}
                <button
                    className="md:hidden p-2 text-app-fg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Menu Mobile - bg-white -> bg-card-bg */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-card-bg flex flex-col p-6 gap-4 md:hidden z-50 border-b border-card-border shadow-2xl animate-in slide-in-from-top-2">
                    {['Sobre', 'Portfolio', 'Cursos', 'Noticias'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-bold text-app-fg/80 border-b border-card-border/50 py-2"
                        >
                            {item}
                        </Link>
                    ))}
                    
                    <div className="mt-4 flex flex-col gap-3">
                        {session ? (
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full py-3 text-sm font-bold bg-brand-500/10 text-brand-500 rounded-xl text-center">
                                Ir para o Painel
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full py-3 text-sm font-bold bg-app-fg text-app-bg rounded-xl text-center">
                                    Entrar
                                </Link>
                                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full py-3 text-sm font-bold border border-card-border text-app-fg rounded-xl text-center">
                                    Criar conta
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    </header>
)
}