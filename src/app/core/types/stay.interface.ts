export interface Stay {
  directions: string;
  mainImage: string;
  category: string;
  stay: string;
  stayId: number;
  totalComments: number;
  averageGrade: number;
  ownerComments: number;
  hoursPrice: string;
  hoursAvailable: number;
  saleHoursPrice: string;
  daysCheckIn: number;
  daysPrice: string;
  saleDaysPrice: string;
}

export interface StayList {
  selectRegion: string;
  category: string;
  personnel: string;
  requestCheckIn: string;
  requestCheckOut: string;
  popularKeyword?: string;
  review?: string;
  wish?: string;
  priceLow?: string;
  priceHigh?: string;
  searchKeyword?: string;
  currentAddress?: string;
}
