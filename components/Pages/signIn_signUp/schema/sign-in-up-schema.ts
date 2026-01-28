import { z ,ZodType } from "zod";

type FormType = "signin" | "signup";
const baseEmail = z.email({ message: "Invalid Email Format" }).min(5).transform(val => val.trim().toLowerCase());
const baseUsername = z
    .string()
    .min(5)
    .max(15)
    .refine(val => !val.includes(" "), {
        message: "Username Should Not Include Space",
    }).transform(val => val.trim().toLowerCase());;
const basePassword = z
    .string()
    .min(8)
    .max(15)
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character",
    })
    .refine(val => !val.includes(" "), {
        message: "Password Should Not Include Space",
    }).transform(val => val.trim());

export const signupSchema = z.object({
    email: baseEmail,
    username: baseUsername,
    password: basePassword,
});
export const signinSchema = z.object({
    email: baseEmail.optional(),
    username: baseUsername.optional(),
    password: basePassword,

}).superRefine((data, ctx) => {
    const hasEmail: boolean = !!data.email;
    const hasUsername: boolean = !!data.username;

    if (!hasUsername && !hasEmail) {
        ctx.addIssue({
            path: ["email"],
            message: "Either email or username is required",
            code: z.ZodIssueCode.custom,
        });
    } else if (hasUsername && hasEmail) {
        ctx.addIssue({
            path: ["username"],
            message: "You can't enter both username and email",
            code: z.ZodIssueCode.custom,
        });
    }

    if ((hasEmail && !hasUsername) || (hasUsername && !hasEmail)) {
        ctx.issues = ctx.issues.filter(issue => {
            let pathValue = issue.path?.[0];
            if (hasEmail && pathValue === "username") {
                return false;
            } else if (hasUsername && pathValue === "email") {
                return false;
            }
        });
    }
});
 
 

export const authFormSchema = <T extends FormType>(type: T)   => {
    
    return (type === 'signup'? signupSchema: signinSchema)  
};

export const authFormSchemaSignin = (type:"signin")=>{
    return signinSchema;
}
export const authFormSchemaSignup = (type:"signup")=>{
    return signupSchema;
}