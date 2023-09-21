export interface AidRequest {
	id: number;
	firstName?: string;
	address?: string;
	category: string;
	description: string;
	dateAdded: string;
	dateResolved?: string;
	familyMembers: number;
	phoneNum1: number;
	phoneNum2?: number;
	tweetId?: string;
	status: 'open' | 'closed' | 'in-progress' | 'resolved';
}
