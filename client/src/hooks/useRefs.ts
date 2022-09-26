import { useRef } from "react";


export const useRefs = () => {
    const refs = useRef<Record<string, HTMLElement & HTMLInputElement | null>>({})

    const setRefFromKey = (key: number) => (element: HTMLElement & HTMLInputElement | null) => {
        refs.current[key] = element;
    }

    return { refs: refs.current, setRefFromKey };
}