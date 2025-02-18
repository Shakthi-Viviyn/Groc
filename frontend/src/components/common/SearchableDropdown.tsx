import { useState, ChangeEvent, useEffect, SetStateAction, Dispatch } from "react";
import { getAuth } from "./axios-header";
import axios, { AxiosResponse } from "axios";

interface SearchableDropdownProps<Q> {
    label: string
    stateKeyName: string
    optionKeyName: string
    url: string
    apiReturnsId?: boolean
    formData: Q
    setFormData: Dispatch<SetStateAction<Q>>
}

function SearchableDropdown< Q extends { [key:string] : any }>({label, stateKeyName, optionKeyName, url, apiReturnsId, formData, setFormData} : SearchableDropdownProps<Q>){

    type Option = {
        [optionKeyName: string]: string;
    };

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>([]);

    function handleTextChange(e : ChangeEvent<HTMLInputElement>){
        setFormData(prev => {
            if (apiReturnsId) {
                const {id, ...prevWithoutId} = prev;
                return {...prevWithoutId, [stateKeyName]: e.target.value} as Q;
            }
            return {...prev, [stateKeyName]: e.target.value};
        });
    }

    useEffect(() => {
        if (!showDropdown && !formData[stateKeyName]) return;
        const fetchOptions = async () => {
            let response: AxiosResponse<Option[]> = await axios.get(`${url}${formData[stateKeyName]}`, {headers: getAuth()});
            if (response.status !== 200) {
                setOptions([]);
                return;
            }
            let respOptions = (response.data.length === 0) ? [{[optionKeyName]: formData[stateKeyName]} as Option] : response.data;
            setOptions(respOptions);
        }
        fetchOptions();
    }, [formData[stateKeyName], showDropdown])

    function handleOptionClick(option : Option){
        setShowDropdown(false);
        if (apiReturnsId) {
            setFormData(prev => ({...prev, ...option}));
            return;
        }
        setFormData(prev => ({...prev, [stateKeyName]: option[optionKeyName]}));
    }

    return (
        <div className="flex gap-2">
            <label className="">{label}</label>
            <div className="relative">
                <input type="text" name="name" className="bg-slate-200 rounded-md px-2 py-1 dpdown-input-effect" onFocus={() => setShowDropdown(true)} onBlur={() => setShowDropdown(false)} value={formData[stateKeyName]} onChange={handleTextChange} autoComplete="off"/>
                { showDropdown && (options.length > 0) && <div className="absolute top-[120%] bg-slate-200 w-full rounded-lg shadow-lg z-50 max-h-[500%] overflow-y-scroll border-2 border-slate-500">
                    {options.map((option, i) => {
                        return (
                            <div className="p-2 hover:bg-slate-300 cursor-pointer" key={i} onMouseDown={() => handleOptionClick(option)}>
                                <p> {option[optionKeyName]} {option.id}</p>
                            </div>
                        )
                    })}
                </div> }
            </div>
        </div>
    )
}

export default SearchableDropdown;