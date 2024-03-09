export interface IUser {
  id: number;

  name: string;

  email: string;

  city?: string;

  province?: string;

  country?: string;

  zipCode?: string;

  roles?: string[];
}
