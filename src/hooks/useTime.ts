import { useState, SetStateAction, Dispatch, useEffect } from 'react';

type useTimePros = (minutesArg: number) => {
    startCountdown: () => void;
    minuteLeft: string; 
    minuteRight: string;
    secondLeft: string;
    secondRight: string;
};

export const useTime: useTimePros = (minutesArg) => {
    const [time, setTime] = useState<number>(minutesArg * 60);
    const [active, setActive] = useState<boolean>(false);

    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;

    const [minuteLeft, minuteRight]: string[] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight]: string[] = String(seconds).padStart(2, '0').split('');

    function startCountdown(): void {
        setActive(true);
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [active, time]);

    return { 
        startCountdown, 
        active, 
        time, 
        setTime, 
        minuteLeft, 
        minuteRight, 
        secondLeft, 
        secondRight,
    };
}
