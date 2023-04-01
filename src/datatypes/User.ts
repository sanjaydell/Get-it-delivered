import { IAddress } from "./Address";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: IAddress;
  mobile: string;
  Id: string;
}
