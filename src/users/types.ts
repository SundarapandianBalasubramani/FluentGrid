export interface IUser {
  id: number;

  name: string;

  email: string;

  city?: string;

  province?: string;

  country?: string;

  zipCode?: string;

  roles?: string[];

  date?: string | Date;
}

export interface IUserRepsonse {
  first: number;
  prev?: number;
  next?: number;
  last?: number;
  pages: number;
  items: number;

  data: IUser[];
}

export interface IPager {
  page: number;
  size: number;

  sort: string[];

  filter: string[];
}
