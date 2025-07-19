import type { UserInfo } from "@modules/user/types";
import mainApiInstance from "@shared/api";
import { buildFormData } from "@shared/utils/form.ts";

export const userService = {
  updateUser: async (
    id: string,
    data: Partial<UserInfo>,
  ): Promise<UserInfo> => {
    const formdata = buildFormData(data);
    const res = await mainApiInstance.put(`/user/${id}`, formdata);
    return res.data;
  },
};
