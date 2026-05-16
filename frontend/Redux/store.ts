import { configureStore } from "@reduxjs/toolkit";
import { roleApi } from "./rolesApi";
import { departmentApi } from "./deptApi";
import { staffApi } from "./staffApi";
import { leadApi } from "./leadApi";
import { queryApi } from "./queryApi";
import { followupApi } from "./followUpApi";
import { proposalApi, bookingApi } from "./proposalApi";

export const store = configureStore({
  reducer: {
    [roleApi.reducerPath]: roleApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [followupApi.reducerPath]: followupApi.reducer,
    [proposalApi.reducerPath]: proposalApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(roleApi.middleware)
      .concat(departmentApi.middleware)
      .concat(staffApi.middleware)
      .concat(leadApi.middleware)
      .concat(queryApi.middleware)
      .concat(followupApi.middleware)
      .concat(proposalApi.middleware)
      .concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
