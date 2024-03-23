// Project: 50a7e53e0086b973575ca358e92615e30f5d32624892b1d54a66a51d1c82d8df
import { baseQueryApi } from "@/libs/redux/baseQueryApi";

export const profileApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    getConfig: build.query<any, void>({
      query: (params: any) => {
        return {
          url: `/global/configs/${params.id}`,
          method: "GET",
        };
      },
    }),
    createTransaction: build.mutation<any, any>({
      query: (params) => {
        return {
          url: "/transaction/create-transaction",
          body: params,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetConfigQuery, useCreateTransactionMutation } = profileApi;
