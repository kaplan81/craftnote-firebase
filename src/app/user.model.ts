export interface User {
  uid: string;
  displayName?: any;
  photoURL?: any;
  email: string;
  phoneNumber?: any;
  providerId: string;
  [others: string]: any;
}
