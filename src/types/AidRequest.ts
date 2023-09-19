export interface AidRequest {
    id: number;
    first_name?: string;
    address?: string;
    category: string;
    description: string;
    date_added: string;
    date_resolved?: string;
    familyMembers: number;
    phoneNum1: number;
    phoneNum2?: number;
    tweet_id?: string;
    status: any;
  }
  