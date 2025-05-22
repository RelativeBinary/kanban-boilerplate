import type { Skill, User } from './types';
import { skillData, userData } from './fakedata';

export async function getSkills(ids: number[]): Promise<Skill[]> {
    return skillData.filter((skill) => ids.includes(skill.id));
}

export async function getUsers({
    name,
    hourlyRate,
    country,
}: {
    name?: string;
    hourlyRate?: { min?: number; max?: number};
    country?: string;
}): Promise<User[]> {
    return userData
        .filter((user) => {
            if (name && !user.username.includes(name)) {
                return false;
            }
            if (country && !user.country.name.includes(country)) {
                return false;
            }
            if (
                hourlyRate &&
                (user.hourlyRate < (hourlyRate.min ?? 0) ||
                    user.hourlyRate > (hourlyRate.max ?? Number.MAX_SAFE_INTEGER))
            ) {
                return false;
            }
            return true;
        })
        .slice(5);
}

// Repeats here
