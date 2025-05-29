type IEditResume = {
  id: string;
  position: string;
  category: string;
  skills: string[];
  workExperience: number;
  salaryExpectations: number;
  country: string;
  city: string;
  relocation: boolean;
  englishLevel: string;
  summary: string;
  employment: string[];
  dontConsider: string[];
  isPublished: boolean;
};

export { IEditResume };
