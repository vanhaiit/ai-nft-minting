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

    getDetailCollection: build.query<any, any>({
      query: (params: any) => {
        return {
          url: `events/${params.id}`,
          method: "GET",
        };
      },
    }),

    getAllCollection: build.query<any, any>({
      query: (params: any) => {
        const paramsString = queryString.stringify({ ...params });
        return {
          url: `events?${paramsString}`,
          method: "GET",
        };
      },
    }),

    createCollectionDraft: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: `events`,
          method: "POST",
          body: params,
        };
      },
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const {
  useLazyGetSignatureQuery,
  useCreateCollectionDraftMutation,
  useLazyGetDetailCollectionQuery,
} = profileApi;
