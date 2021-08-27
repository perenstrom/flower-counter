import { Deal } from "types/types";

export const updateDeal = async (
  dealId: string,
  deal: Partial<Deal>
): Promise<Deal> => {
  const url = '/api/deals';
  const options: RequestInit = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      dealId,
      deal
    })
  };

  return apiResult<Deal>(url, options);
};

const apiResult = <K>(url: RequestInfo, options: RequestInit): Promise<K> =>
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        } else {
          console.error(response.status);
          reject(response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });