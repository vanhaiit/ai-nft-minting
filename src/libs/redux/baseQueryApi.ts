import { HttpErrorCode } from "@/constants/http";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { RootState } from "./store";
import { APIResponse } from "@/stores/types/http";

const ExcludeAPI = ["login", "logout", "request-forgot-password"];

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set("x-IP", Cookies.get("ip") || "");
    headers.set("timezone", (dayjs().utcOffset() / 60).toString());
    headers.set("region", encodeURI(Cookies.get("region")!));
    headers.set("country", encodeURI(Cookies.get("country")!));
    headers.set("city", encodeURI(Cookies.get("city")!));
    headers.set("cache-control", "no-cache");
    // const token = (getState() as RootState).user.accessToken;
    // if (!!token && endpoint !== "refresh") {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  // const { getState, dispatch } = api;

  let result = await baseQuery(args, api, extraOptions);

  // const isAuthorizeError = result.error && result.error.status === 401;

  // const isUserBanned =
  //   result.error &&
  //   (result.error.data as APIResponse<any>)?.code === HttpErrorCode.USER_BANNED;
  // // If API is login API do not handle by session timeout popup

  // const isExcludeAPI = ExcludeAPI.some((item) =>
  //   (args as FetchArgs).url?.includes(item)
  // );

  // if ((isAuthorizeError || isUserBanned) && !isExcludeAPI) {
  //   // checking whether the mutex is locked

  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();
  //     try {
  //       dispatch(logout());

  //       if ((getState() as RootState).app.inOpenPageTime) {
  //         return result;
  //       }

  //       dispatch(
  //         setAlert({
  //           errorCode: isAuthorizeError
  //             ? HttpErrorCode.UNAUTHORIZED
  //             : HttpErrorCode.USER_BANNED,
  //           redirectUrl: PATHS.default(),
  //         })
  //       );
  //       // save new access token and refresh token
  //       // retry the initial query
  //     } finally {
  //       // release must be called once the mutex should be released again.
  //       release();
  //     }
  //   } else {
  //     // wait until the mutex is available without locking it
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }

  return result;
};

export const baseQueryApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["stream-token", "user-profile", "user-balance"],
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
