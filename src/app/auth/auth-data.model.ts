export interface AuthData {
  uID: number;
  last_name: string;
  first_name: string;
  coach: boolean;
  weight: number;
  height: number;
  account: string;
  email: string;
  google_id: string;
  facebook_id: string;
  password: string;
  date_birth: Date;
  level: number;
  country: object;
  gym: Array<string | number>;
}
