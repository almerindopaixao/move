import { createContext, useState, ReactNode, useEffect } from 'react';
import json from '../json/challegens.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    levelUp: () => void; 
    currentExperience: number; 
    activeChallenge: Challenge;
    challengesCompleted: number;
    experienceToNextLevel: number;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
};

type ChallengesProviderProps = {
    children: ReactNode;
};

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(1);
    const [currentExperience, setCurrentExperience] = useState<number>(0);
    const [challengesCompleted, setChallengesCompleted] = useState<number>(0);

    const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const challenges: Challenge[] = json as Challenge[];

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('./sounds/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`,
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                levelUp, 
                currentExperience, 
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
            }} 
        >
            { children }
        </ChallengesContext.Provider>
    )
}