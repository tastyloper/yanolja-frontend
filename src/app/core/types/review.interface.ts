export interface Review {
  text: string;
  created: string;
  stay: string;
  stayId: number;
  nickname: string;
  reservedRoom: string;
  grade: number[];
  'ownerComment-1'?: string;
  'ownerCommentCreated-1'?: string;
  'ownerComment-2'?: string;
  'ownerCommentCreated-2'?: string;
  'ownerComment-3'?: string;
  'ownerCommentCreated-3'?: string;
  'ownerComment-4'?: string;
  'ownerCommentCreated-4'?: string;
}
