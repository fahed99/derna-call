export interface AidRequest {
  id: number;
  firstName?: string;
  address?: string;
  category: 'housing' | 'housing(rent)' | 'medicine' | 'food' | 'clothing' | 'appliances' | 'other';
  description: string;
  dateAdded: string;
  dateResolved?: string;
  familyMembers: number;
  phoneNum1: string;
  phoneNum2?: string;
  tweetId?: string;
  status: 'open' | 'closed' | 'pending' | 'resolved';
  callsCount: number;
}
