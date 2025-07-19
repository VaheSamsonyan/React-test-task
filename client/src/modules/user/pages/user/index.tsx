import { useForm } from "react-hook-form";
import "./style.css";
import { useAuth } from "@modules/auth/hooks/use-auth.ts";
import { useEffect, useState } from "react";
import { userService } from "@modules/user/services";
import { resetAuth } from "@modules/auth/model/auth-slice.ts";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema } from "@modules/user/pages/user/schema.ts";

type UserProfileForm = {
  firstName: string;
  lastName: string;
  password: string;
  birthDate: string;
  image?: FileList;
};

export default function UserPage() {
  const { user } = useAuth();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileForm>({
    resolver: zodResolver(userProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      password: "",
      birthDate: user?.birthDate?.split("T")[0] ?? "",
    });
    setPreviewImage(user?.imageUrl ?? null);
  }, [user, reset]);

  const onSubmit = async (data: UserProfileForm) => {
    if (user?.id) {
      const res = await userService.updateUser(String(user.id), data);
      if (res) {
        dispatch(resetAuth());
      }
    }
  };

  return (
    <div className="user-profile">
      <h2>Personal Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <label>
          First name
          <input type="text" {...register("firstName", { required: true })} />
          {errors.firstName && (
            <span className="error">Firstname is required</span>
          )}
        </label>

        <label>
          Last Name
          <input type="text" {...register("lastName", { required: true })} />
          {errors.lastName && (
            <span className="error">LastName is required</span>
          )}
        </label>

        <label>
          Password
          <input
            autoComplete="new-password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="error">Password is required</span>
          )}
        </label>

        <label>
          Birth Date
          <input type="date" {...register("birthDate", { required: true })} />
          {errors.birthDate && (
            <span className="error">BirthDate is required</span>
          )}
        </label>

        <label>
          Profile Image
          <input type="file" accept="image/*" {...register("image")} />
        </label>

        {previewImage && (
          <div style={{ marginTop: 10 }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: 200,
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
