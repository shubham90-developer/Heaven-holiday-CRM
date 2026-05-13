import { configureStore } from "@reduxjs/toolkit";
import { roleApi } from "./rolesApi";
import { departmentApi } from "./deptApi";
import { staffApi } from "./staffApi";
export const store = configureStore({
  reducer: {
    [roleApi.reducerPath]: roleApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(roleApi.middleware)
      .concat(departmentApi.middleware)
      .concat(staffApi.middleware),
});
