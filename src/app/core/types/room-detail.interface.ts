export interface RoomDetail {
    stay: string;
    name: string;
    hoursUntil: number;
    hoursAvailable: number;
    hoursPrice: string;
    saleHoursPrice: string;
    daysCheckIn: number;
    daysCheckOut: number;
    daysPrice: string;
    saleDaysPrice: string;
    basicInfo: string[];
    reservationNotice: string[];
    cancelRegulation: string[];
    urlImage: string[];
    stayId: number;
    roomId: number;
    rentalAvailable: boolean;
    stayAvailable: boolean;
}
