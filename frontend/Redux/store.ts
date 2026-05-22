import { configureStore } from "@reduxjs/toolkit";
import { roleApi } from "./rolesApi";
import { departmentApi } from "./deptApi";
import { staffApi } from "./staffApi";
import { leadApi } from "./leadApi";
import { queryApi } from "./queryApi";
import { followupApi } from "./followUpApi";
import { proposalApi, bookingApi } from "./proposalApi";
import { supplierApi } from "./supplierApi";
import { hotelApi } from "./hotelApi";
import { sightseeingApi } from "./sightSeeingApi";
import { sightseeingRateApi } from "./ratesApi";
import { transportApi } from "./transportApi";
import { driverApi } from "./driverApi";
import { guideApi } from "./guideApi";
import { visaApi } from "./visaApi";
import { itineraryApi } from "./itenaryApi";
import { areaApi } from "./areaApi";
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
    [supplierApi.reducerPath]: supplierApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [sightseeingApi.reducerPath]: sightseeingApi.reducer,
    [sightseeingRateApi.reducerPath]: sightseeingRateApi.reducer,
    [transportApi.reducerPath]: transportApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [guideApi.reducerPath]: guideApi.reducer,
    [visaApi.reducerPath]: visaApi.reducer,
    [itineraryApi.reducerPath]: itineraryApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer,
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
      .concat(bookingApi.middleware)
      .concat(supplierApi.middleware)
      .concat(hotelApi.middleware)
      .concat(sightseeingApi.middleware)
      .concat(sightseeingRateApi.middleware)
      .concat(transportApi.middleware)
      .concat(driverApi.middleware)
      .concat(guideApi.middleware)
      .concat(visaApi.middleware)
      .concat(itineraryApi.middleware)
      .concat(areaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
