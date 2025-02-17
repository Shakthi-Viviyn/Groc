import { useState, ChangeEvent, useEffect, SetStateAction, Dispatch } from "react";
import { getAuth } from "./axios-header";
import axios, { AxiosResponse } from "axios";

/**
 * The difference between SearchableDropdown2 from SearchableDropdown is the latter
 * does not allow to enter custom values. It only allows to select from an already existing
 * list of options.
 * And some styling changes.
 */

interface SearchableDropdownProps<Q> {
    stateKeyName: string
    optionKeyName: string
    url: string
    apiReturnsId?: boolean
    inputClass: string
    placeholder?: string
    formData: Q
    setFormData: Dispatch<SetStateAction<Q>>
}

export default function SearchableDropdown2< Q extends { [key:string] : any }>({stateKeyName, optionKeyName, url, apiReturnsId, formData, setFormData, inputClass, placeholder} : SearchableDropdownProps<Q>){

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
            // let respOptions = (response.data.length === 0) ? [{[optionKeyName]: formData[stateKeyName]} as Option] : response.data;
            setOptions(response.data);
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

    function handleLoseFocus(){
        if (apiReturnsId && !formData.id){
            setFormData(prev => {
                return {...prev, [stateKeyName]: ""} as Q;
            });
        }
        setShowDropdown(false);
    }

    return (
        <div className="flex gap-2">
            <div className="relative">
                <input type="text" name="name" className={inputClass} onFocus={() => setShowDropdown(true)} onBlur={handleLoseFocus} value={formData[stateKeyName]} onChange={handleTextChange} autoComplete="off" placeholder={placeholder}/>
                { showDropdown && (options.length > 0) && <div className="absolute top-[120%] bg-slate-200 w-full rounded-lg shadow-lg z-50 max-h-[500%] overflow-y-scroll border-2 border-slate-500">
                    {options.map((option, i) => {
                        return (
                            <div className="p-2 hover:bg-slate-300 cursor-pointer border-2 border-red-500" key={i} onMouseDown={() => handleOptionClick(option)}>
                                <p> {option[optionKeyName]} {option.id}</p>
                            </div>
                        )
                    })}
                </div> }
            </div>
        </div>
    )
}