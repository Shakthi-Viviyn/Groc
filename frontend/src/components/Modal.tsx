import { useContext } from "react";
import { ModalContext, ModalContextType } from "../pages/Layout";


export default function Modal({children} : {children: React.ReactNode}) {

    const {setShowModal, setModalContent} = useContext(ModalContext) as ModalContextType;

    function handleCloseClick(): void{
        setModalContent(null);
        setShowModal(false);
    }

    return (
        <div id="background" className="fixed size-full top-0 left-0 z-50 bg-slate-800 bg-opacity-60 flex flex-col justify-center items-center">
            <div id="modal" className="relative flex flex-col justify-center items-center h-[80%] w-[80%] bg-slate-100 rounded-xl shadow-lg p-6 pt-12">
                <button className="absolute top-3 right-5 rounded-full" onClick={handleCloseClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>   
                {children}
            </div>
        </div>
    )
}