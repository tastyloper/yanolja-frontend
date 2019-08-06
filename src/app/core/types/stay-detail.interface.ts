export interface StayDetail {
    name: string;
    category: string;
    location: string;
    directions: string;
    route: string[];
    mainImage: string;
    urlImage: string[];
    introduce: string[];
    serviceKinds: string[];
    serviceIntroduce: string[];
    serviceNotice: string[];
    pickupNotice: string[];
    like: boolean;
    stayId: number;
    totalComments: number;
    averageGrade: number;
    totalGrade: number[];
    ownerComments: number;
}
