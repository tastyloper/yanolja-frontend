export interface ReservationDetail {
  checkIn: string;
  checkOut: string;
  booker: string;
  phoneNumber: string;
  reservationId: string;
  created: string;
  finalPrice: string;
  stay: string;
  room: string;
}

export interface Reservation {
  stay: string;
  room: string;
  checkIn: string;
  checkOut: string;
  reservationId: number;
  stayId: number;
  roomId: number;
  mainImage: string;
  commentLeaved: boolean;
}

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

export interface ReservationDelete {
  reservationRemoved: boolean;
}
