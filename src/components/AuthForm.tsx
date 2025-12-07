"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  registerSchema,
  AuthFormData,
} from "@/schemas/authSchemas";

import { useLogin, useRegister } from "@/tanstack/authApi";
import { useAuth } from "@/stores/useAuth";
import { toast } from "react-toastify";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const setUser = useAuth((s) => s.setUser);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isLogin) {
        const { user } = await loginMutation.mutateAsync({
          email: data.email!,
          password: data.password!,
        });

        setUser(user);
        toast.success("Успішний вхід");
      } else {
        const { user } = await registerMutation.mutateAsync(data);
        setUser(user);
        toast.success("Реєстрація успішна");
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Вхід" : "Реєстрація"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {!isLogin && (
              <>
                <TextField
                  label="Імʼя"
                  {...register("displayName")}
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                />
              </>
            )}

            <TextField
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Пароль"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button variant="contained" fullWidth type="submit">
              {isLogin ? "Увійти" : "Зареєструватися"}
            </Button>
          </Stack>
        </form>

        <Typography
          align="center"
          sx={{ pt: 2, cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Створити акаунт" : "У мене вже є акаунт"}
        </Typography>
      </Box>
    </Container>
  );
};
