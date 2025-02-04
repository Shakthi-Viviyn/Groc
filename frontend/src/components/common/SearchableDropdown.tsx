import { useState, ChangeEvent, useEffect } from "react";
import { HEADERS } from "./axios-header";
import axios, { AxiosResponse } from "axios";

interface SearchableDropdownProps {
    label: string
    nameFieldKey: string
    url: string
    apiProvidesIds: boolean
}

function SearchableDropdown<T extends { [key:string] : any }>({label, nameFieldKey, url, apiProvidesIds} : SearchableDropdownProps){

    const [searchText, setSearchText] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [options, setOptions] = useState<T[]>([]);

    

    function handleTextChange(e : ChangeEvent<HTMLInputElement>){
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const fetchOptions = async () => {
            let response: AxiosResponse<T[]> = await axios.get(`${url}${searchText}`, {headers: HEADERS});
            let respOptions = (!apiProvidesIds) ? response.data.map((option, index) =>({id: index + 1, ...option})) : response.data;
            setOptions(respOptions);
        }
        fetchOptions();
    }, [searchText])

    function handleOptionClick(option: T){
        setSearchText(option[nameFieldKey]);
        setShowDropdown(false);
    }

    return (
        <div className="flex gap-2">
            <label className="">{label}</label>
            <div className="relative">
                <input type="text" name="name" className="bg-slate-200 rounded-md px-2 py-1 dpdown-input-effect" onFocus={() => setShowDropdown(true)} onBlur={() => setShowDropdown(false)} value={searchText} onChange={handleTextChange} autoComplete="off"/>
                { showDropdown && (options.length > 0) && <div className="absolute top-[120%] bg-slate-200 w-full rounded-lg shadow-lg z-50 max-h-[500%] overflow-y-scroll border-2 border-slate-500">
                    {options.map((option) => {
                        return (
                            <div className="p-2 hover:bg-slate-300 cursor-pointer border-2 border-red-500" key={option.id} onMouseDown={() => handleOptionClick(option)}>
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