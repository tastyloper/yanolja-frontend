export interface Room {
  name: string;
  standardPersonnel: number;
  maximumPersonnel: number;
  hoursAvailable: number;
  daysCheckIn: number;
  hoursPrice: string;
  saleHoursPrice: string;
  daysPrice: string;
  saleDaysPrice: string;
  basicInfo: string[];
  urlImage: string[];
  roomId: number;
  stayId: number;
  stay: string;
}
