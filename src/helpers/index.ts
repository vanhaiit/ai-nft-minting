export function formatAddress(address: string) {
  return address.slice(0, 8) + "...";
}

export function retryCallPromise(
  Function: any,
  condition: (e: any) => boolean,
  maxRetries: number,
  delay: number
) {
  let retries = 0;
  return new Promise((resolve, reject) => {
    async function onCall() {
      const data = await Function();
      if (condition(data)) {
        resolve(data);
      } else {
        if (retries < maxRetries) {
          retries++;
          setTimeout(onCall, delay);
        } else {
          reject(data);
        }
      }
    }
    onCall();
  });
}
