export interface User {
  nickname: string;
  email: string;
  phoneNumber: string;
  reservedCount: number;
}

export interface Login {
  token: string;
  nickname: string;
  reservedCount: number;
}