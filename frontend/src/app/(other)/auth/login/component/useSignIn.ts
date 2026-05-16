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
import { getFirstAllowedRoute } from "@/helpers/Manu";

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
        push("/dashboard"); // Superadmin always goes to dashboard
      } else {
        const res = await staffLogin({
          email: values.email,
          password: values.password,
        }).unwrap();

        // Set both cookies before computing the redirect
        Cookies.set("token", res.token, { expires: 1 });
        Cookies.set("permissions", JSON.stringify(res.permissions), {
          expires: 1,
        });

        // FIX 4: Was: push("/dashboard") — hardcoded, ignores staff permissions.
        // Staff may not have dashboard access. Always redirect to their first
        // allowed route instead.
        const firstAllowedRoute = getFirstAllowedRoute(res.permissions || []);

        if (!firstAllowedRoute) {
          // Staff has no allowed routes at all — inform and don't navigate
          toast.error(
            "Your account has no active permissions. Contact your admin.",
          );
          // Clear cookies since there's nowhere valid to go
          Cookies.remove("token");
          Cookies.remove("permissions");
          return;
        }

        toast.success("Login successful!");
        push(firstAllowedRoute);
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
