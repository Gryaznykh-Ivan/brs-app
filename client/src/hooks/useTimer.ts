import { useRef, useState } from "react"

interface IUseTimer {
    count: number;
    startTimer: () => void;
    clearTimer: () => void;
    resetTimer: (s: number) => void;
}

export const useTimer = (action: () => void, s: number): IUseTimer => {
    const timer = useRef<NodeJS.Timer>();
    const [count, setCount] = useState<number>(s);

    const startTimer = () => {
        timer.current = setInterval(() => {
            setCount(c => {
                c -= 1;

                if (c <= 0) {
                    clearTimer();
                    action();
                }

                return c
            })
        }, 1000);
    }

    const clearTimer = () => {
        clearInterval(timer.current);
    }

    const resetTimer = (s: number) => {
        clearTimer();
        setCount(s);
        startTimer();
    }

    return { count, startTimer, clearTimer, resetTimer }
}