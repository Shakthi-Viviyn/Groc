import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import { ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react'
import Modal from './components/Modal'

export interface ModalContextType {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<React.ReactNode>>;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

function App() {

  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)

  return (
      <div className="h-[100vh]">
        <ModalContext.Provider value={{setShowModal, setModalContent}}>
          <div  className="flex flex-col py-2 px-3 gap-2 size-full">
            <NavBar/>
            <Home />
          </div>
          {showModal && <Modal children={modalContent}/>}
        </ModalContext.Provider>
      </div>
  )
}


export default App
