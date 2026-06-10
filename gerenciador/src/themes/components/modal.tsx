import { ReactNode } from "react"

export interface AppModalProps {
    children: ReactNode;
    title?: string;
    onClose?: () => void;
}

export default function AppModal({children, title, onClose}: AppModalProps) {
    return (
        <div>
            {/* BACKGROUND */}
            <div className="fixed top-0 left-0 bg-black opacity-40 h-full w-full flex justify-center items-center"/>
            
            {/* MODAL */}
            <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center">
                <div className={`bg-white opacity-100 p-[50px] rounded-xl max-w-[600px] flex-col`}>
                    <div className="flex items-center justify-between">
                        <p className="ff-default text-[30px] bold mb-5 font-bold">{title}</p>
                        {onClose && <i className="ion-close cursor-pointer text-[20px]" onClick={() => onClose()}/>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}