"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import {
  useSuperadminLoginMutation,
  useStaffLoginMutation,
} from "../../../../../../Redux/authApi";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"superadmin" | "staff">("staff");
  const { push } = useRouter();

  const [superadminLogin] = useSuperadminLoginMutation();
  const [staffLogin] = useStaffLoginMutation();

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = handleSubmit(async (values: LoginFormFields) => {
    setLoading(true);
    try {
      if (role === "superadmin") {
        const res = await superadminLogin({
          email: values.email,
          password: values.password,
        }).unwrap();

        Cookies.set("token", res.token, { expires: 1 });
        toast.success("Welcome Superadmin!");
        push("/dashboard");
      } else {
        const res = await staffLogin({
          email: values.email,
          password: values.password,
        }).unwrap();

        Cookies.set("token", res.token, { expires: 1 });
        Cookies.set("permissions", JSON.stringify(res.permissions), {
          expires: 1,
        });
        toast.success("Login successful!");
        push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  });

  return { loading, login, control, role, setRole };
};

export default useSignIn;
