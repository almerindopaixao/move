import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    handleClickButtonCoutdown: () => void; 
    resetCountdown: () => void;
}

interface CountdownContextProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownContextProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState<number>(0.1 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);

    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;

    function handleClickButtonCoutdown() {
        if (!isActive) {
            startCountdown();
        } else {
            resetCountdown();
        }
    }
    function startCountdown(): void {
        setIsActive(true);
    }

    function resetCountdown(): void {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
           countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);
    
    return (
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                handleClickButtonCoutdown, 
                resetCountdown,
            }}
        >
            { children }
        </CountdownContext.Provider>
    );
}