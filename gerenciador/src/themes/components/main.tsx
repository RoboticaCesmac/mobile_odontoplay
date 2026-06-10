import React from "react";

export interface AppMainContainerProps {
    title: string;
    eyebrow?: string;
    description?: string;
    children?: React.ReactNode;
}

export default function AppMainContainer({title, eyebrow, description, children}: AppMainContainerProps) {

    return (
        <main className="flex flex-1 flex-col px-4 py-4 md:px-6 lg:px-8">
            <div className="rounded-[30px] border border-(--surface-border) bg-(--surface-color) px-6 py-4 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur">
                <div className="border-b border-slate-200/70 pb-6">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                            {eyebrow ?? "Painel administrativo"}
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">{title}</h1>
                        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">{description}</p>}
                    </div>
                </div>

                <section className="mt-6 flex-1">
                    {children}
                </section>
            </div>
        </main>
    )

}
