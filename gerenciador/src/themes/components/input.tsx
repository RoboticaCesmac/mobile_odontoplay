"use client";
import { useState } from "react";
import { Ionicons } from "../../types/ionicos";

export interface AppInputProps {
    name?: string
    type?: string;
    onChange?: (e: any) => void
    placeholder?: string;
    value?: string;
    label?: string;
    icon?: Ionicons
    openPassword?: boolean;
    error?: any
    style?: any;
    className?: string
}

export default function AppInput ({type="text", name, onChange, placeholder, value, label, icon, openPassword = false, error = "", style = {}, className = ''}: AppInputProps ) {
    // -------------------------------------------------------------------------
    const [ showPassword, setShowPassword ] = useState(false);
    const [ touched, setTouched ] = useState(false);
    // -------------------------------------------------------------------------
    return (
        <div className={`w-full ${className}`.trim()} style={style}>
            <p className="ff-default ml-3 mb-1">{label}</p>
            <div className="my-2 flex min-h-[48px] items-center rounded-xl border-[2] border-[#dedede] bg-[#f5f5f5] px-2">
                {icon && <i className={`ion-${icon} mx-2 text-[grey]`} />}
                <input type={openPassword ? showPassword ? "text" : "password" : type} name={name} placeholder={placeholder} value={value} className="flex-1 bg-transparent" onChange={onChange} onBlur={() => setTouched(true)}/>
                {openPassword &&<i className={`${showPassword ? "ion-eye" : "ion-eye-disabled"} mx-2 text-[grey]`} onClick={() => setShowPassword(!showPassword)} />}
            </div>
            <div className="min-h-[18px]">
                {touched && error && <p className="text-[tomato] ff-default text-[12px] text-right">{error}</p>}
            </div>
        </div>
    )
}
