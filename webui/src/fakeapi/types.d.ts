export interface User {
    id: number;
    username: string;
    displayName: string;
    tagline: string;
    description: string;
    hourlyRate: number;
    rating: number;
    country: {
        name: string;
        code: string;
    };
    skills: number[];
}

export interface Skill {
    id: number;
    name: string;
}

async function getUsers(filters: {
    name?: string;
    hourlyRate?: {min?: number; max?: number };
    country?: string;
}): Promise<User[]>;

async function getSkills(ids: number[]): Promise<Skill[]>;

// Repeats here
