import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().nonempty("Firstname is required"),
  lastName: z.string().nonempty("LastName is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  birthDate: z.string().nonempty("BirthDate is required"),
  image: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof FileList, {
      message: "Invalid file",
    }),
});
