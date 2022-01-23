export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Team' | 'Customer';
}
