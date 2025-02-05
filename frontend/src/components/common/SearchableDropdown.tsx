import { useState, ChangeEvent, useEffect, SetStateAction, Dispatch } from "react";
import { HEADERS } from "./axios-header";
import axios, { AxiosResponse } from "axios";

interface SearchableDropdownProps<Q> {
    label: string
    nameFieldKey: string
    url: string
    apiReturnsId?: boolean
    formData: Q
    setFormData: Dispatch<SetStateAction<Q>>
}

function SearchableDropdown< T extends { [key:string] : any }, Q extends { [key:string] : any }>({label, nameFieldKey, url, apiReturnsId, formData, setFormData} : SearchableDropdownProps<Q>){

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [options, setOptions] = useState<T[]>([]);

    function handleTextChange(e : ChangeEvent<HTMLInputElement>){
        setFormData(prev => {
            if (apiReturnsId) {
                const {id, ...prevWithoutId} = prev;
                return {...prevWithoutId, [nameFieldKey]: e.target.value} as Q;
            }
            return {...prev, [nameFieldKey]: e.target.value};
        });
    }

    useEffect(() => {
        if (!showDropdown && !formData[nameFieldKey]) return;
        const fetchOptions = async () => {
            let response: AxiosResponse<T[]> = await axios.get(`${url}${formData[nameFieldKey]}`, {headers: HEADERS});
            let respOptions = (response.data.length === 0) ? [{[nameFieldKey]: formData[nameFieldKey]} as T] : response.data;
            setOptions(respOptions);
        }
        fetchOptions();
    }, [formData[nameFieldKey], showDropdown])

    function handleOptionClick(option : T){
        setShowDropdown(false);
        setFormData(prev => ({...prev, ...option}));
    }

    return (
        <div className="flex gap-2">
            <label className="">{label}</label>
            <div className="relative">
                <input type="text" name="name" className="bg-slate-200 rounded-md px-2 py-1 dpdown-input-effect" onFocus={() => setShowDropdown(true)} onBlur={() => setShowDropdown(false)} value={formData[nameFieldKey]} onChange={handleTextChange} autoComplete="off"/>
                { showDropdown && (options.length > 0) && <div className="absolute top-[120%] bg-slate-200 w-full rounded-lg shadow-lg z-50 max-h-[500%] overflow-y-scroll border-2 border-slate-500">
                    {options.map((option, i) => {
                        return (
                            <div className="p-2 hover:bg-slate-300 cursor-pointer border-2 border-red-500" key={i} onMouseDown={() => handleOptionClick(option)}>
                                <p> {option[nameFieldKey]} {option.id}</p>
                            </div>
                        )
                    })}
                </div> }
            </div>
        </div>
    )
}

export default SearchableDropdown;