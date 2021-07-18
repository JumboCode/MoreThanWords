import { getAccessToken } from './auth.js';
import Constants from 'expo-constants';


export async function updateSalesforce(updated_value, isStar, backendBoolID, backendID, pod) {
  success = false;
  // Make request to update checkbox
  await fetch(`${Constants.manifest.extra.apiUrl}/updateCheckbox`, {
      method: 'POST',
      headers: {
          'Authorization': "Bearer " + await getAccessToken(),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          task_title: isStar ? backendBoolID : backendID,
          new_value: updated_value,
          pod: pod
      })
  })
  .then(response => {
      if (response.status != 200) {
          success = false;
      } else {
          success = true;
      }
  })
  .catch(error => {
      console.error(error);
      success = false;
  });
  return success;
}