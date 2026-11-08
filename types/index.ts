// Profile Information

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  email: string;
  avatar: string;
  visionYear: number;
}


// Acccount Information 

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  lastActiveAt: string;
}

// Past Achievements
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

// Goals
export type GoalStatus = "not-started" | "in-progress" | "completed";

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  status: GoalStatus;
}

// Skills
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  targetLevel: number;
}

// Projects
export type ProjectStatus = "planning" | "in-progress" | "completed";

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
}

// Personal Values
export interface LifeValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Daily Tasks
export type TaskStatus = "pending" | "completed";

export interface DailyTask {
  id: string;
  title: string;
  category: string;
  date: string;
  status: TaskStatus;
}


// Complete Personal Data
export interface PersonalData {
  profile: Profile;
  achievements: Achievement[];
  goals: Goal[];
  skills: Skill[];
  projects: Project[];
  values: LifeValue[];
  tasks: DailyTask[];
}


