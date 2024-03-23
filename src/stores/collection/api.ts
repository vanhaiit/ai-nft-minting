import { baseQueryApi } from "@/libs/redux/baseQueryApi";
import queryString from "query-string";

export const profileApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    getSignature: build.query<any, any>({
      query: (params: any) => {
        const paramsString = queryString.stringify({ ...params });
        return {
          url: `events/signature/deploy?${paramsString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyGetSignatureQuery } = profileApi;
