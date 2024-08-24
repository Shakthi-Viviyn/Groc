import { useContext } from "react";
import { ModalContext, ModalContextType } from "../../pages/Layout";
import AddBillForm from "../ModalContentComponents/AddBillForm";
import { useNavigate } from "react-router-dom";

function NavBar() {

  const { setShowModal, setModalContent } = useContext(ModalContext) as ModalContextType;

  const navigate = useNavigate();

  function handleAddBillClick(): void {
    setShowModal(true);
    setModalContent(<AddBillForm />);
  }

  function handleLogout(){
    navigate("/login");
  }

  return (
    <div className="navbar flex justify-between items-center px-6 w-full bg-slate-200 rounded-lg shadow-lg font-mono">
      <h1 className="text-2xl">Groc</h1>
      <div className="flex gap-5 h-full">
        <button className="bg-slate-300 py-1 px-4 hover-effect text-lg" onClick={handleAddBillClick}>Add Bill</button>
        <button className="bg-slate-300 py-1 px-4 hover-effect text-lg" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default NavBar;