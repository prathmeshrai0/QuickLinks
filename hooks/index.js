import { RetriveFromLocalStorage, SaveToLocalStorage } from "@/utlis";
import { useEffect } from "react";

export function useSaveAndRetrive(key, value, setvalue) {

    const {id} = value ; 
    // console.log(key,value);
    console.log(value);
    
    
    // useEffect(() => {
    //     SaveToLocalStorage(key, value);
    // }, [value])

    // useEffect(() => {
    //     const RETRIVED_DATA = RetriveFromLocalStorage(key);
    //     if (value instanceof Array) {
    //         setvalue([...(RETRIVED_DATA ?? [])])
    //     }
    //     else if (value instanceof Object) {
    //         setvalue({ ...(RETRIVED_DATA ?? {}) })
    //     }
    // }, []);

}