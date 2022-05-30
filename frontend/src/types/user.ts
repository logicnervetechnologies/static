import type { Notification } from './notification'

export interface User {
  id: string;
  avatar: string;
  email: string;
  name: string;
  notifications: any;
  fName: string;
  lName: string;
  [key: string]: any;
}