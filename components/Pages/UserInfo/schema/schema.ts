import * as z from "zod";

const Gender = z.enum(["male", "female", "other"], { message: "Required" });
const Country = z.enum(["India", "United States", "Canada", "Mexico"], {
  message: "Required",
});

export const schema = () => {
  return z.object({
    // Personal info
    about: z
      .string()
      .min(50, { message: "Write more" })
      .max(200, { message: "maximum limit reached" }).transform(val => val.trim()),
    profilePic: z
      .url({ message: "Invalid URL format" })
      .optional()
      .or(z.literal("")),
    firstName: z.string().min(3, { message: "Required" }).transform(val => val.trim()),
    lastName: z.string().min(3, { message: "Required" }).transform(val => val.trim()),
    country: Country,
    gender: Gender,
    city: z.string().optional().transform(val => val?.trim()),

    // Professional info
    profession: z.string().min(3, { message: "Required" }).transform(val => val.trim()),
    skills: z
      .array(z.string().transform(val => val.trim()))
      .min(1, { message: "Minimum One skill required" }),

    certificates: z.array(
      z.object({
        title: z.string().min(1, { message: "Required Title" }).transform(val => val.trim()),
        link: z.url({ message: "Invalid URL format" }).transform(val => val.trim()),
      }),
    ),
    // Academic info
    tenthMarks: z.preprocess(
      v => (v === "" ? null : Number(v)),
      z
        .number()
        .min(0, { message: "Marks cannot be less than 0" })
        .max(100, { message: "Marks cannot be greater than 100" })
        .nullable()
        .optional(),
    ),

    twelfthMarks: z.preprocess(
      v => (v === "" ? null : Number(v)),
      z
        .number()
        .min(0, { message: "Marks cannot be less than 0" })
        .max(100, { message: "Marks cannot be greater than 100" })
        .nullable()
        .optional(),
    ),

    schoolName: z.string().min(1, { message: "School name is Required" }).transform(val => val.trim()),
    collegeName: z.string().optional().transform(val => val?.trim()),
    graduationCourse: z.string().optional().transform(val => val?.trim()),
    graduationMarks: z.preprocess(
      v => (v === "" ? null : Number(v)),
      z
        .number()
        .min(0, { message: "Marks cannot be less than 0" })
        .max(100, { message: "Marks cannot be greater than 100" })
        .nullable()
        .optional(),
    ),
    postgrad: z.string().optional().transform(val => val?.trim()),
    postgradMarks: z.preprocess(
      v => (v === "" ? null : Number(v)),
      z
        .number()
        .min(0, { message: "Marks cannot be less than 0" })
        .max(100, { message: "Marks cannot be greater than 100" })
        .nullable()
        .optional(),
    ),
    postgradSpecialization: z.string().optional().transform(val => val?.trim()),
    phd: z.string().optional().transform(val => val?.trim()),
    phdSpecialization: z.string().optional().transform(val => val?.trim()),

    // Contact info
    phoneNo: z
      .string()
      .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),

    linkedIn: z
      .url({ message: "Invalid URL format" })
      .optional()
      .or(z.literal("")),
    github: z
      .url({ message: "Invalid URL format" })
      .optional()
      .or(z.literal("")),
  });
};
