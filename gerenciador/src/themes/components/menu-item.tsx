"use client"
import Link from "next/link"
import { Ionicons } from "../../types/ionicos"
import { usePathname } from "next/navigation";


export interface AppMenuItemProps {
    title: string,
    icon: Ionicons
    url: string
}

export default function AppMenuItem ({title, icon, url}: AppMenuItemProps) {

    const path = usePathname();
    const ativado = path.startsWith(url);

    return (
        <Link href={url}>
            <h1 className={`mb-2 flex items-center justify-center rounded-full px-3 py-3 text-[15px] font-medium transition md:justify-start md:px-4 ${ativado ?  'bg-(--primary-color) text-white shadow-[0_16px_30px_rgba(15,118,110,0.22)]' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900' }`}>
                <i className={`ion-${icon} text-[18px] md:mr-3`} />
                <div className="hidden md:flex">{title}</div> 
            </h1>
        </Link>
    )
}
