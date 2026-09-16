import z from "zod";
import express from "express";

export const authSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])$/,
        "password must be at least 8 characters , has at least 1 Cap letter , at least 1 Small letter, and has at least 1 special character",
      ),

    confirm_password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])$/,
        "password must be at least 8 characters , has at least 1 Cap letter , at least 1 Small letter, and has at least 1 special character",
      )
      .refine(),
    userName: z.string().min(2),
  })  
  .refine((data) => data.password === data.confirm_password, {
    error: "the password doesn't match the confirm password type it again",
    path: ["confirm_password"], //Error Path
  });
