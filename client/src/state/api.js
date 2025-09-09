// src/state/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL, // e.g. http://localhost:5001/
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
    // If the server returns non-JSON, this avoids a parsing error.
    // (You can remove this if your server always returns JSON.)
    responseHandler: async (response) => {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) return response.json();
      return response.text();
    },
  }),
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    /* ---------- General ---------- */
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),

    /* ---------- Client-facing ---------- */
    getProducts: build.query({
      query: () => "client/products",
      // Always give the UI an array to map over
      transformResponse: (res) => {
        if (Array.isArray(res)) return res;
        if (Array.isArray(res?.products)) return res.products;
        if (Array.isArray(res?.data)) return res.data;
        return [];
      },
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search } = {}) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),

    /* ---------- Sales ---------- */
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),

    /* ---------- Management ---------- */
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
