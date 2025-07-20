export type LoginCredential = {
    email: string,
    password: string,
};

export type Experience = {
  title: string;
  company: string;
  location?: string;
  startDate: string;  // use ISO string format
  endDate?: string;
  description?: string;
};

export type RegistrationData = {
    fullName: string,
    email: string,
    password: string,
    // bio?: string,
    // profilePicture?: string
    // experience?: Experience[],
};

export type User = {
    fullName: string,
    email: string,
    password: string,
    credits: number,
    // bio?: string,
    // profilePicture?: string
    // experience?: Experience[],
}