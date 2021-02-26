import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import json from '../json/challegens.json';

import { LevelUpModal } from '../components';

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
    closeLevelUpModal: () => void;
};

type ChallengesProviderProps = {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
};

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ 
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState<number>(rest.currentExperience || 0);
    const [challengesCompleted, setChallengesCompleted] = useState<number>(rest.challengesCompleted || 0);

    const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState<boolean>(false);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const challenges: Challenge[] = json as Challenge[];

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level), { expires: 1 });
        Cookies.set('currentExperience', String(currentExperience), { expires: 1 });
        Cookies.set('challengesCompleted', String(challengesCompleted), { expires: 1 });
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false);
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
                closeLevelUpModal
            }} 
        >
            { children }
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}