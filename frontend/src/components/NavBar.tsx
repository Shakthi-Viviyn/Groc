import { useContext } from "react";
import { ModalContext, ModalContextType } from "../App";
import AddBillForm from "./AddBillForm";

function NavBar() {

  const { setShowModal, setModalContent } = useContext(ModalContext) as ModalContextType;

  function handleAddBillClick(): void {
    setShowModal(true);
    setModalContent(<AddBillForm />);
  }

  return (
    <div className="navbar flex justify-between items-center px-6 w-full bg-slate-200 rounded-lg shadow-lg">
      <h1 className="font-mono text-2xl">Groc</h1>
      <div className="flex gap-5 h-full">
        <button className="bg-slate-300 py-1 px-4 font-mono" onClick={handleAddBillClick}><span className="text-lg">Add Bill</span></button>
        <button className="bg-slate-300 py-1 px-4 font-mono"><span className="text-lg">Log out</span></button>
      </div>
    </div>
  );
}

export default NavBar;