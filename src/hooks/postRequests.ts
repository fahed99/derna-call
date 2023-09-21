import { AidRequest } from '@customTypes/AidRequest';

const postRequests = async (aidRequest: AidRequest): Promise<AidRequest[]> => {
  const requestBody = {
    firstName: aidRequest.firstName,
    address: aidRequest.address,
    category: aidRequest.category,
    description: aidRequest.description,
    familyMembers: aidRequest.familyMembers,
    phoneNum1: aidRequest.phoneNum1,
    phoneNum2: aidRequest.phoneNum2,
    tweetId: aidRequest.tweetId,
    status: 'open'
  };

  try {
    const response = await fetch(
      `https://dernacall.ly/api/aidrequest?secret=${process.env.AID_REQUEST_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Log the response to the console to inspect it
    console.log('API Response:', response);

    // Parse the response as JSON
    return await response.json();
  } catch (error) {
    // Handle any errors, such as network issues or invalid JSON response
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for higher-level handling
  }
};

export { postRequests };
