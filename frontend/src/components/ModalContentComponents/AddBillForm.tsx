import { useState, useContext } from "react";
import { ModalContext, ModalContextType } from "../../pages/Layout";
import axios from "axios";
import { toast } from "react-toastify";

interface BillFormType {
    storeName: string;
    location: string;
    date: string;
    totalAmount?: number;
    products: ProductFormType[];
}

interface ProductFormType {
    brand: string;
    name: string;
    price: number;
    quantity: number;
    units: string;
}

function AddBillForm(){

    let headers = {
        "Authorization": "Bearer " + localStorage.getItem("token")
    }

    const { setShowModal } = useContext(ModalContext) as ModalContextType;

    const [billForm, setBillForm] = useState<BillFormType>({
        storeName: "",
        location: "",
        date: "",
        products: []
    })

    const [productForm, setProductForm] = useState<ProductFormType>({
        brand: "",
        name: "",
        price: 0,
        quantity: 0,
        units: ""
    })

    const [editState, setEditState] = useState({
        state: false,
        index: 0
    });

    function handleBillDetailsInput(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setBillForm({...billForm, [name]: value})
    }

    function handleProductInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = e.target;
        setProductForm({...productForm, [name]: value})
    }

    function handleKeyPress(e: React.KeyboardEvent){
        if (e.key === "Enter") handleAddProduct()
    }

    function handleAddProduct(){
        if (productForm.brand === "" || productForm.name === "" || productForm.price === 0 || productForm.quantity === 0 || productForm.units === "") return
        if (editState.state){
            billForm.products[editState.index] = productForm
            setEditState({state: false, index: 0})
            setBillForm({...billForm})
            setProductForm({
                brand: "",
                name: "",
                price: 0,
                quantity: 0,
                units: ""
            })
            return
        }
        setBillForm({...billForm, products: [...billForm.products, productForm]})
        setProductForm({
            brand: "",
            name: "",
            price: 0,
            quantity: 0,
            units: ""
        })
    }

    function handleEditProduct(product: ProductFormType, index: number){
        setProductForm(product)
        setEditState({state: true, index})
    }

    async function handleAddBill(){
        if (billForm.storeName === "" || billForm.location === "" || billForm.date === "" || billForm.products.length === 0) return;
        let totalAmount = 0;
        billForm.products.forEach(product => {
            totalAmount += product.price * product.quantity
        });
        const payload = {...billForm, totalAmount};

        let response = await axios.post("http://localhost:8080/bills", payload, {headers: headers});
        if (response.status === 201){
            toast.success("Bill added successfully")
            setShowModal(false)
        }else{
            toast.error("Failed to add bill")
        }
        
    }

    return (
        <div className="size-full grid grid-rows-[2.2fr_5fr_0.6fr] grid-cols-[1.5fr_2fr] gap-2.5 font-mono">

            <div className="bg-slate-300 flex flex-col gap-3 justify-center items-center rounded-lg shadow-lg p-5">
                <div className="flex gap-2 items-center">
                    <label className="">Store Name:</label>
                    <input type="text" name="storeName" value={billForm.storeName} onChange={handleBillDetailsInput} className="bg-slate-200 rounded-md px-2 py-1 hover-effect"/>
                </div>
                <div className="flex gap-2 items-center">
                    <label className="">City:</label>
                    <input type="text" name="location" value={billForm.location} onChange={handleBillDetailsInput} className="bg-slate-200 rounded-md px-2 py-1 hover-effect"/>
                </div>
                <div className="flex gap-2 items-center">
                    <label className="">Date:</label>
                    <input type="date" name="date" value={billForm.date} onChange={handleBillDetailsInput} className="bg-slate-200 rounded-md px-2 py-1 hover-effect"/>
                </div>
            </div>

            <div className="bg-slate-300 flex flex-col gap-3 row-start-2 row-end-4 rounded-lg shadow-lg p-3 overflow-y-auto">
                <h3 className="text-lg">Products</h3>
                <div className="flex flex-col gap-3 h-full">
                    {billForm.products.length > 0 ? billForm.products.map((product, index) => (
                        <div key={index} className="flex justify-between bg-slate-200 p-3 rounded-lg cursor-pointer shadow-lg hover-effect" onClick={() => handleEditProduct(product, index)}>
                            <div className="flex gap-2">
                                <h4>{product.brand}</h4>-<h4>{product.name}</h4>
                            </div>
                            <h4>{product.quantity} {product.units}</h4>
                        </div>
                    )): 
                        <div className="flex justify-center items-center h-[80%]"><p className="text-gray-500">No products added</p></div>
                    }
                </div>
            </div>

            <div className="bg-slate-300 flex flex-col gap-8 justify-center items-center col-start-2 col-end-3 row-start-1 row-end-3 rounded-lg shadow-lg p-5" onKeyDown={handleKeyPress}>
                <div className="flex gap-2">
                    <label className="">Brand:</label>
                    <input type="text" name="brand" className="bg-slate-200 rounded-md px-2 py-1 hover-effect" value={productForm.brand} onChange={handleProductInput}/>
                </div>
                <div className="flex gap-2">
                    <label className="">Name:</label>
                    <input type="text" name="name" className="bg-slate-200 rounded-md px-2 py-1 hover-effect" value={productForm.name} onChange={handleProductInput}/>
                </div>
                <div className="flex gap-2">
                    <label className="">Price:</label>
                    <input type="number" name="price" className="bg-slate-200 rounded-md px-2 py-1 hover-effect" value={productForm.price} onChange={handleProductInput}/>
                </div>
                <div className="flex gap-2">
                    <label className="">Quantity:</label>
                    <input type="number" name="quantity" className="bg-slate-200 rounded-md px-2 py-1 hover-effect" value={productForm.quantity} onChange={handleProductInput}/>
                    <select name="units" className="bg-slate-200 rounded-md px-2 py-1 w-20 hover-effect" value={productForm.units} onChange={handleProductInput}>
                        <option value=""></option>
                        <option value="kg">Kg</option>
                        <option value="g">g</option>
                        <option value="ml">mL</option>
                        <option value="l">L</option>
                        <option value="unit">unit</option>
                    </select>
                </div>
                <button onClick={handleAddProduct} className="bg-slate-200 px-6 py-2 rounded-lg hover:border-2 hover:border-slate-500 hover-effect">{editState.state ? "Save" : "Add" }</button>
            </div>
            <button className="bg-slate-300 size-full flex flex-col justify-center items-center col-start-2 col-end-3 row-start-3 row-end-4 rounded-lg shadow-lg hover-effect" onClick={handleAddBill}>
                <span>Save Bill</span>
            </button>
        </div>
    )
}

export default AddBillForm;