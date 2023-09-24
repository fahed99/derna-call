export interface AidRequest {
  id: number;
  firstName?: string;
  address?: string;
  category: string;
  description: string;
  dateAdded: string;
  dateResolved?: string;
  familyMembers: number;
  phoneNum1: string;
  phoneNum2?: string;
  tweetId?: string;
  status: 'open' | 'closed' | 'in-progress' | 'resolved';
  callsCount: number;
}
