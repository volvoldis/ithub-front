type RegisterDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

type VerifyEmailDataType = {
  code: string;
};

type ForgotPasswordDataType = {
  email: string;
};

type ResetPasswordDataType = {
  code: string;
  password: string;
};

type EditSeekerData = {
  id: string;
  searchStatus: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  skype: string;
  telegram: string;
  image?: File;
};

type EditEmployerData = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  linkedin: string;
  userPosition: string;
  image?: File;
};

type EditCompanyData = {
  id: string;
  companyName: string;
  companyWebSite: string;
  companyDouPage: string;
  companyLogo: string;
  companyEmployeesCount: number;
  companyDescription: string;
  companyOffices: string;
  image?: File;
};

export type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
  ResetPasswordDataType,
  EditSeekerData,
  EditEmployerData,
  EditCompanyData,
};
