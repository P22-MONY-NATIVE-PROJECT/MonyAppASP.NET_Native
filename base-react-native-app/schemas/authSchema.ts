import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email обов'язковий").email("Невірний формат email"),
    password: z.string().min(6, "Пароль має бути не менше 6 символів"),
});

export const registerSchema = z.object({
    firstName: z.string().min(1, "Ім'я обов'язкове"),
    lastName: z.string().min(1, "Прізвище обов'язкове"),
    email: z.string().min(1, "Email обов'язковий").email("Невірний формат"),
    password: z.string().min(6, "Пароль має бути не менше 6 символів"),
    confirmPassword: z.string().min(1, "Підтвердіть пароль"),
    imageFile: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
});

export const editProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    imageFile: z.any().optional(),
});
 
export type EditProfileFormData = z.infer<typeof editProfileSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
