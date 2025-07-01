// export type firstStepSchemaType = z.infer<typeof firstStepSchema>;
import { Session } from "@supabase/supabase-js";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "At Least 6 Character" })
    .max(15, { message: "High 15 Character" }),
});

export const registerSchema = z.object({
  // firstname: z
  //   .string()
  //   .min(3, { message: "Min Number" })
  //   .max(12, { message: "max Number" }),
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "At Least 6 Character" })
    .max(15, { message: "High 15 Character" }),
});

export type registerSchemaType = z.infer<typeof registerSchema>;

export type loginSchemaType = z.infer<typeof loginSchema>;

export type Authdata = {
  session: Session | null;
  mounting: boolean;
  user: any;
};
