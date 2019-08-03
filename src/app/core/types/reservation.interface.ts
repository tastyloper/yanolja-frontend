export interface ReservationCreate {
  booker: string;
  phoneNumber: string;
  wayToGo: string;
  requestCheckIn: string;
  requestCheckOut: string;
  requestHours?: string;
  requestDays?: string;
  finalPrice: string;
}

export interface ReservationInfo {
  id: number;
  urlImage: string[];
  room: string;
  booker: string;
  phoneNumber: string;
  finalPrice: string;
  error?: string;
}

export interface GetReservation {
  requestCheckIn: string;
  requestCheckOut: string;
  requestHours?: string;
  requestDays?: string;
}

export interface ReservationComplete {
  reserved: boolean;
}

export interface Hour {
  value: number;
  active: boolean;
  disabled: boolean;
}
