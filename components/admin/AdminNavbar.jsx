'use client'
import Link from "next/link"
import { useUser,UserButton } from "@clerk/nextjs"

const AdminNavbar = () => {

    const {user}=useUser()

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                <span className="text-blue-600">Nexus</span>Mart<span className="text-blue-600 text-5xl leading-0">.</span>
                <p className="absolute text-xs font-semibold -top-1 -right-13 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-blue-500">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3">
                <p>Hi, {user?.firstName}</p>
                <UserButton></UserButton>
            </div>
        </div>
    )
}

export default AdminNavbar