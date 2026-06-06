export interface Project {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  keyLearnings: string;
  technologies: string[];
  visualType: 'travel' | 'medical' | 'efficiency';
}

export interface SkillNode {
  name: string;
  category: 'language' | 'tool' | 'soft';
  level?: number; // percentage or description on hover
  info: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface EducationMilestone {
  year: string;
  institution: string;
  degree: string;
  cgpa: string;
  details: string[];
}
