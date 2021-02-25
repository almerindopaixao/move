import { createContext, useState, ReactNode } from 'react';
import challenges from '../json/challegens.json';

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
};

type ChallengesProviderProps = {
    children: ReactNode;
};

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(1);
    const [currentExperience, setCurrentExperience] = useState<number>(0);
    const [challengesCompleted, setChallengesCompleted] = useState<number>(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
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
            }} 
        >
            { children }
        </ChallengesContext.Provider>
    )
}