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

        <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-white/80 backdrop-blur-md px-8 border-b border-slate-100">
            <nav className="flex items-center justify-start w-full gap-12">
                <div className="w-32">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {['Sobre', 'Portfolio', 'Cursos', 'Noticias'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-[13px] font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Área de Autenticação Dinâmica */}
                <div className="ml-auto flex items-center gap-4">

                    {isLoading ? (
                        <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-full" />
                    ) : session ? (
                        /* ESTADO: LOGADO */
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="hidden sm:flex items-center gap-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <LayoutDashboard size={16} />
                                Painel
                            </Link>

                            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

                            <div className="flex items-center gap-3">


                                {session.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full border border-slate-200"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center">
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
                        <>
                            <Link
                                href="/login"
                                className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                Entrar
                            </Link>
                            <Link
                                href="/register">
                                <button className="hidden sm:block text-[13px] font-bold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm active:scale-95">
                                    Criar conta
                                </button>
                            </Link>
                        </>
                    )}

                    {/* Botão Mobile */}
                    <button
                        className="md:hidden p-2 text-slate-500"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Menu Mobile */}
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white flex flex-col p-6 gap-4 md:hidden z-50 border-b border-slate-100 shadow-xl animate-in slide-in-from-top-2">
                        {['Sobre', 'Portfolio', 'Cursos', 'Noticias'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-slate-500"
                            >
                                {item}
                            </Link>
                        ))}
                        <hr className="border-slate-100" />
                        {session ? (
                            <button
                                onClick={() => signOut()}
                                className="w-full py-3 text-sm font-bold text-red-500 bg-red-50 rounded-xl"
                            >
                                Sair da conta
                            </button>
                        ) : (
                            <div>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-3 text-sm font-bold bg-slate-900 text-white rounded-xl text-center"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-3 text-sm font-bold bg-slate-900 text-white rounded-xl text-center"
                                >
                                    Criar conta
                                </Link>
                            </div>


                        )}
                    </div>
                )}
            </nav>
        </header>

    )
}