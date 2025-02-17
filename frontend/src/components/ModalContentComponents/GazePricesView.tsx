import { useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductPrice, Product, Store } from "../../types/types";
import { getAuth } from "../common/axios-header";
import SearchableDropdown2 from "../common/SearchableDropdown2";

export default function GazePricesView(){

    const [storeFormActive, setStoreFormActive] = useState(true);
    const [productItemFormActive, setProductItemFormActive] = useState(false);

    const [storeForm, setStoreForm] = useState<Store>({
        name: "",
        location: ""
    })

    const [productItemForm, setProductItemForm] = useState<Partial<Product>>({
        brand: "",
        name: "",
        quantity: 0,
        units: ""
    })

    const [productList, setProductList] = useState<ProductPrice[]>([]);

    let brandSearchUrl = "http://localhost:8080/brand?name=";
    let productSearchUrl = useMemo(() => (
        `http://localhost:8080/product?brand=${productItemForm.brand}&name=`
    ), [productItemForm.brand]);

    let storeNameSearchUrl = "http://localhost:8080/storeName?name=";
    let storeLocSearchUrl = useMemo(() => (
        `http://localhost:8080/store?name=${storeForm.name}&location=`
    ), [storeForm.name]);

    let totalAmount = useMemo(() => {
        let total = 0;
        productList.forEach(product => {
            total += product.price * product.quantity;
        });
        return total.toFixed(2);
    }, [productList]);

    function handleStoreSelect(){
        if (!storeForm.id) {
            toast.error("Please select a valid store")
            return;
        }
        setStoreFormActive(false)
    }

    function handleItemInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setProductItemForm(prev => ({...prev, [name]: value}));
    }

    function handleDeleteListItem(i : number){
        setProductList(productList.filter((_, index) => index !== i));
    }

    async function handleAddListItem(){

        if (productItemForm.brand === "" || productItemForm.name === "" || productItemForm.quantity === 0) return;

        let response = await axios.get<Partial<ProductPrice>>(`http://localhost:8080/store/${storeForm.id}/product/${productItemForm.id}/price`, {headers: getAuth()});
        if (response.status !== 200) return;

        const newItem = {
            name: productItemForm.name!,
            brand: productItemForm.brand!,
            price: response.data.price!,
            date: response.data.date!,
            quantity: productItemForm.quantity!,
            units: productItemForm.units!,
            storeId: storeForm.id!,
            productId: productItemForm.id!
        }
        setProductList(prev => [...prev, newItem]);
        setProductItemForm({brand: "", name: "", quantity: 0, units: ""});
        setProductItemFormActive(false);
    }

    return (
        <div className="size-full grid grid-rows-[2.5fr_1fr] grid-cols-[3fr_1fr] gap-6 font-mono">

            <div className="bg-slate-200 col-start-1 col-end-2 row-start-1 row-end-3 rounded-lg shadow-lg p-5 overflow-scroll">
                { !storeFormActive ? 
                    <div className="size-full flex flex-col items-center gap-5 ">
                        { productList.map((product, index) => (
                            <div className="flex flex-row h-20 gap-5 w-full" key={index}>
                                <div className="flex flex-row gap-3 h-full w-full items-center bg-slate-300 px-5 py-3 rounded-t-lg shadow-lg">
                                    <div className="flex flex-col">
                                        <p className="text-sm">{product.brand}</p>
                                        <p className="text-lg max-w-60 overflow-ellipsis overflow-hidden text-nowrap">{product.name}</p>
                                    </div>
                                    <div className="flex flex-col ml-auto">
                                        <div className="max-w-80 text-nowrap flex flex-row gap-3">
                                            <p className="text-lg overflow-x-scroll">{product.quantity} {product.units} X ${product.price}</p>
                                            <p>=</p>
                                            <p className="text-lg">${(product.quantity * product.price).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-right">{product.date}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center h-full">
                                    <div className=" h-fit p-3 bg-slate-300 rounded-lg hover:shadow-lg cursor-pointer hover-effect" onClick={() => handleDeleteListItem(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="black">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                        { productItemFormActive ?
                            <div className="flex flex-row h-16 gap-5 w-full">
                                <div className="flex gap-3 h-full w-full items-center bg-slate-300 px-5 py-3 rounded-lg shadow-lg">
                                    <SearchableDropdown2<Partial<Product>>  inputClass="product-input" stateKeyName="brand" optionKeyName="name" url={brandSearchUrl} placeholder="Brand" formData={productItemForm} setFormData={setProductItemForm}/>
                                    <SearchableDropdown2<Partial<Product>>  inputClass="product-input" stateKeyName="name" optionKeyName="name" url={productSearchUrl} placeholder="Name" formData={productItemForm} setFormData={setProductItemForm} apiReturnsId/>
                                    <input className="inline-block ml-auto w-[100px] h-full bg-slate-200 rounded-md px-2 py-1 hover-effect" name="quantity" value={productItemForm.quantity} onChange={handleItemInputChange}/>
                                    <p>{productItemForm.units}</p>
                                </div>

                                <div className="flex flex-col justify-center items-center h-full">
                                    <div className=" h-fit p-3 bg-slate-300 rounded-lg hover:shadow-lg cursor-pointer hover-effect" onClick={handleAddListItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M20 6L9 17l-5-5"/>
                                        </svg>
                                    </div>
                                </div>
                            </div> 
                            :
                            <div className="flex items-center justify-center h-10 w-full hover-effect bg-slate-300 px-5 py-3 rounded-lg shadow-lg" onClick={() => setProductItemFormActive(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div> 
                        }
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center h-full">
                        <p className="text-xl text-slate-500">Select a store to view products</p>
                    </div>
                }
            </div>

            <div className="bg-slate-300 flex flex-col items-center col-start-2 col-end-3 rounded-lg shadow-lg p-3 overflow-y-auto">
                <div className="flex flex-col justify-evenly h-full">
                    <div>
                        <h3>Store Name</h3>
                        {storeFormActive ? 
                            <SearchableDropdown2<Store>  inputClass="store-input" stateKeyName="name" optionKeyName="name" url={storeNameSearchUrl} formData={storeForm} setFormData={setStoreForm}/>
                            : 
                            <p className="text-2xl">{storeForm.name}</p>
                        }
                    </div>
                    <div className="h-[2px] rounded-lg bg-slate-500 w-full"/>
                    <div>
                        <h3>Location</h3>
                        {storeFormActive ?
                            <SearchableDropdown2<Store>  inputClass="store-input" stateKeyName="location" optionKeyName="location" url={storeLocSearchUrl} formData={storeForm} setFormData={setStoreForm} apiReturnsId/>
                            : 
                            <p className="text-2xl">{storeForm.location}</p>
                        }
                    </div>
                </div>
                { storeFormActive && <button className="bg-slate-200 h-10 w-[90%] mb-3 flex flex-col justify-center items-center col-start-2 col-end-3 row-start-3 row-end-4 rounded-lg shadow-lg hover-effect" onClick={handleStoreSelect}>
                    <span>Select store</span>
                </button> }
            </div>

            <div className="bg-slate-300 flex flex-col justify-center items-center col-start-2 col-end-3 rounded-lg shadow-lg p-5">
                <h3 className="text-lg">Bill amount</h3>
                <p className="text-3xl">{totalAmount}</p>
            </div>
        </div>
    )
}