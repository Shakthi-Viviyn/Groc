import { useState, ReactNode, createContext, Dispatch, SetStateAction } from "react";
import Modal from '../components/Modal'
import { Outlet } from "react-router-dom";

export interface ModalContextType {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setModalContent: Dispatch<SetStateAction<React.ReactNode>>;
  }
  
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Layout(){

    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<ReactNode>(null)

    return (
        <div className="h-[100vh]">
        <ModalContext.Provider value={{setShowModal, setModalContent}}>
          <Outlet />
          {showModal && <Modal children={modalContent}/>}
        </ModalContext.Provider>
      </div>
    )
}

export default Layout;