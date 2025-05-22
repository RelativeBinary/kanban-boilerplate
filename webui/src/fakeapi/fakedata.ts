import type { Skill, User } from './types';

export const userData: User[] = [
  {
    id: 1,
    username: 'pixelperfect',
    displayName: 'Pixel Perfect',
    tagline: '#1 Graphic Design Export on Freelancer',
    description:
      "With over 7000 Reviews, you can't go wrong with Pixel Perfect Design.",
    hourlyRate: 50,
    rating: 4.5,
    country: {
      name: 'United States',
      code: 'us',
    },
    skills: [1, 2, 3],
  },
  {
    id: 2,
    username: 'androiddev',
    displayName: 'Elite Mobile Dev',
    tagline: 'Android development specialist',
    description: 'Big or small, Elite Mobile Dev can build your app.',
    hourlyRate: 60,
    rating: 4.2,
    country: {
      name: 'Canada',
      code: 'ca',
    },
    skills: [1, 4],
  },
  {
    id: 3,
    username: 'reactpro',
    displayName: 'Next Level Web',
    tagline: 'React Teacher and Engineer',
    description:
      'With 12 years of professional React experience, your team or company is safe with me.',
    hourlyRate: 45,
    rating: 4.8,
    country: {
      name: 'United States',
      code: 'us',
    },
    skills: [2, 5, 6],
  },
  {
    id: 4,
    username: 'theangularexpert',
    displayName: 'Minko G.',
    tagline: 'Angular Contributor and Expert Dev',
    description:
      "One of the original AngularJS team members at Google, I'm now here to help you use Angular.",
    hourlyRate: 55,
    rating: 4.3,
    country: {
      name: 'Australia',
      code: 'au',
    },
    skills: [2, 5, 7],
  },
  {
    id: 5,
    username: 'graphicsrus',
    displayName: 'Graphic Geniuses',
    tagline: 'Logos | Graphics | Hand-Drawn Art | NO AI',
    description:
      'The best and brightest in the creative biz are here to provide you with beautiful art.',
    hourlyRate: 52,
    rating: 4.4,
    country: {
      name: 'India',
      code: 'in',
    },
    skills: [1, 2, 3],
  },
  {
    id: 6,
    username: 'webdevdetective',
    displayName: 'Laurent G.',
    tagline: 'Deployments, DevOps, Debugging',
    description:
      'If you have a problem with your servers, I can fix it (or your money back).',
    hourlyRate: 48,
    rating: 4.6,
    country: {
      name: 'France',
      code: 'fr',
    },
    skills: [2, 5, 6, 7],
  },
];

export const skillData: Skill[] = [
  {
    id: 1,
    name: 'Graphic Design',
  },
  {
    id: 2,
    name: 'Website Design',
  },
  {
    id: 3,
    name: 'Photoshop',
  },
  {
    id: 4,
    name: 'Android',
  },
  {
    id: 5,
    name: 'TypeScript',
  },
  {
    id: 6,
    name: 'React',
  },
  {
    id: 7,
    name: 'Angular',
  },
];