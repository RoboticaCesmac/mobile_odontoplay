"use client";
import { ReactNode, useState } from "react";

export interface AppInputProps {
    name?: string
    children: ReactNode;
    onChange?: (e: any) => void
    value?: string;
    label?: string;
    error?: string
    style?: any;
    className?: string
}

export default function AppSelect ({children, name, onChange, value, label, error = "", style = {}, className = ''}: AppInputProps ) {
    const [ touched, setTouched ] = useState(false);

    return (
        <div className={`w-full ${className}`.trim()} style={style}>
            <p className="ff-default ml-3 mb-1">{label}</p>
            <div className="my-2 flex min-h-[48px] items-center rounded-xl border-[2] border-[#dedede] bg-[#f5f5f5] px-3">
                <select className="w-full bg-transparent text-[15px] text-[#1f2937]" onChange={onChange} onBlur={() => setTouched(true)} name={name} value={value}>
                    {children}
                </select>
            </div>
            <div className="min-h-[18px]">
                {touched && error && <p className="text-[tomato] ff-default text-[12px] text-right">{error}</p>}
            </div>
        </div>
    )
}
