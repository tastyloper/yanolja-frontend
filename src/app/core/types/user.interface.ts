export interface User {
  nickname: string;
  email: string;
  phoneNumber: string;
}

export interface Login {
  token: string;
  nickname: string;
  reservedCount: number;
}