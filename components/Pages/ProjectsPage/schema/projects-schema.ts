import zod from "zod";
const category = zod.enum(
  [
    "Web Development",
    "Mobile App",
    "Data Science",
    "Machine Learning",
    "AI",
    "Game Dev",
    "Blockchain",
    "Cybersecurity",
    "IoT",
    "Automation",
    "UI UX",
    "Open Source",
    "Cloud",
    "Desktop App",
    "API Dev",
    "Tools",
    "Others",
  ],
  {
    message: "Required",
  },
);

export const schema = zod.object({
  TotalProjects: zod
    .array(
      zod.object({
        title: zod
          .string()
          .min(3, { message: "Title must be at least 3 characters long" })
          .transform(val => val.trim()),
        description: zod
          .string()
          .min(10, {
            message: "Description must be at least 10 characters long",
          })
          .max(200, {
            message: "Description must be at most 200 characters long",
          })
          .transform(val => val.trim()),
        techStack: zod
          .array(
            zod.object({
              tag: zod
                .string()
                .min(1, { message: "Tag cannot be empty" })
                .max(15, { message: "Tag too long" })
                .transform(val => val.trim()),
            }),
          )
          .min(1, { message: "At least one tech stack tag is required" })
          .max(6, { message: "Maximum of 6 tech stack tags allowed" }),
        link: zod
          .url({ message: "Invalid URL format" })
          .min(1, { message: "Required" })
          .transform(val => val.trim()),
        category: category,
        subcategory: zod.string().min(1, { message: "Required" }),
        thumbnail: zod
          .url({ message: "Invalid URL format" })
          .optional()
          .or(zod.literal("")),
      }),
    )
    .min(1, { message: "Minimum One Project object required" }),
});
