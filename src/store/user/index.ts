import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../constants";
import { IPager, IUser, IUserRepsonse } from "../../users/types";

const getQuery = (data: IPager) => {
  const sort = data.sort.length > 0 ? "&_sort=" + data.sort.join(",") : "";
  const filter = data.filter.length > 0 ? "&" + data.filter.join("&") : "";
  return `_page=${data.page}&_per_page=${data.size}${sort}${filter}`;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, number>({
      query: (id) => `users/${id}`,
    }),
    getUsers: builder.query<IUserRepsonse, IPager>({
      query: (data) => `users?${getQuery(data)}`,
    }),
    addUser: builder.mutation<IUser, Partial<IUser>>({
      query(body) {
        return {
          url: `users`,
          method: "POST",
          body,
        };
      },
    }),
    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query({ id, ...body }) {
        return {
          url: `users/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    removeUser: builder.mutation<IUser, number>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = userApi;
