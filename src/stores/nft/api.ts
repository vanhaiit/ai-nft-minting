import { baseQueryApi } from "@/libs/redux/baseQueryApi";
import queryString from "query-string";

export const profileApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    getDetailNft: build.query<any, any>({
      query: (params: any) => {
        return {
          url: `nfts/${params.id}`,
          method: "GET",
        };
      },
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
    }),

    createMint: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: `nfts/${params.id}`,
          method: "POST",
          body: {
            name: params.name,
            description: params.description,
            image: params.image,
            transactionHash: params.transactionHash,
            walletAddress: params.walletAddress,
          },
        };
      },
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
    }),

    getAllNft: build.query<any, any>({
      query: (params: any) => {
        const paramsString = queryString.stringify({ ...params });
        return {
          url: `nfts?${paramsString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateMintMutation,
  useLazyGetDetailNftQuery,
  useLazyGetAllNftQuery,
} = profileApi;
