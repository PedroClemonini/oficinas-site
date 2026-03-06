"use client"
import { Logo } from "@/components"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from 'next/link';
export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-white/80 backdrop-blur-md px-8 border-b border-slate-100">
            <nav className="flex items-center justify-start w-full gap-12">
                <div className="w-32">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                {/* Desktop Menu - Tipografia Refinada */}
                <div className="hidden md:flex gap-8 items-center">
                    {['Sobre', 'Portfolio', 'Cursos', 'Noticias'].map((item) => (
                        // Trocamos <p> por <Link> e criamos o href dinâmico
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-[13px] font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
                {/* Área de Autenticação à Direita */}
                <div className="ml-auto flex items-center gap-6">
                    <button className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                        Entrar
                    </button>

                    <button className="hidden sm:block text-[13px] font-bold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm active:scale-95">
                        Criar conta
                    </button>

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
                        // Trocamos <p> por <Link> e criamos o href dinâmico
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-[13px] font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                        <button className="w-full py-3 text-sm font-bold bg-slate-900 text-white rounded-xl">
                            Criar conta
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}