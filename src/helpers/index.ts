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

export const fetchGenerateTextToImage = async (bodyData: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("accept-language", "en,en-US;q=0.9,vi;q=0.8,ko;q=0.7");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("origin", "https://ai-nft-minting.api.dev.sotatek.works");
    myHeaders.append(
      "referer",
      "https://ai-nft-minting.api.dev.sotatek.works/docs"
    );
    myHeaders.append(
      "sec-ch-ua",
      '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
    );
    myHeaders.append("sec-fetch-site", "same-origin");

    const raw = JSON.stringify(bodyData);

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `https://ai-nft-minting.api.dev.sotatek.works/ai-generate/text-to-image`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();

    const file = new File([blob], new Date().getTime().toString() + ".jpg", {
      type: blob.type,
    });

    const imageUrl = URL.createObjectURL(blob);

    return { dataImg: file, urlImage: imageUrl };
  } catch (error) {
    console.log("Error:", error);
    return { dataImg: undefined, urlImage: "" };
  }
};

export const fetchGenerateAiImage = async (bodyData: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("accept-language", "en,en-US;q=0.9,vi;q=0.8,ko;q=0.7");
    myHeaders.append("origin", "https://ai-nft-minting.api.dev.sotatek.works");
    myHeaders.append(
      "referer",
      "https://ai-nft-minting.api.dev.sotatek.works/docs"
    );
    myHeaders.append(
      "sec-ch-ua",
      '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", '"macOS"');
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-origin");
    myHeaders.append(
      "user-agent",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    );

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: bodyData,
      redirect: "follow",
    };

    const response = await fetch(
      `https://ai-nft-minting.api.dev.sotatek.works/ai-generate/image`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();

    const file = new File([blob], new Date().getTime().toString() + ".jpg", {
      type: blob.type,
    });
    const imageUrl = URL.createObjectURL(blob);

    return { dataImg: file, urlImage: imageUrl };
  } catch (error) {
    console.log("Error:", error);
    return { dataImg: undefined, urlImage: "" };
  }
};

export const fetchGetIpfsHash = async (bodyData: any) => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9,vi;q=0.8");
  myHeaders.append("origin", "https://ai-nft-minting.api.dev.sotatek.works");
  myHeaders.append(
    "referer",
    "https://ai-nft-minting.api.dev.sotatek.works/docs"
  );
  myHeaders.append(
    "sec-ch-ua",
    '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-origin");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
  };

  try {
    const response = await fetch(
      "https://ai-nft-minting.api.dev.sotatek.works/media/image",
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.log("🚀 ~ fetchGetIpfsHash ~ error:", error);
  }
};
