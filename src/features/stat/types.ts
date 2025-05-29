interface ITotalStat {
  key: string;
  Vacancies: number;
  Candidates: number;
  Companies: number;
}

interface ILevelStat {
  level: string;
  Vacancies: number;
  Candidates: number;
}

interface IEmploymentStat {
  employment: string;
  Vacancies: number;
  Candidates: number;
}

interface IDomainStat {
  key: string;
  Adult: number;
  Gambling: number;
  Dating: number;
  GameDev: number;
  Blockchain: number;
}

interface IPieChart {
  name: string;
  value: number;
  color: string;
}

interface ISalaryExpectation {
  level: string;
  Salary: number;
}

interface IEnglishStat {
  vacancies: IPieChart[];
  candidates: IPieChart[];
}

export {
  ITotalStat,
  ILevelStat,
  IEmploymentStat,
  IDomainStat,
  IEnglishStat,
  ISalaryExpectation,
};
