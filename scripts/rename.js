import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$runCommandRaw({
    update: "AllProjects", // collection name in MongoDB
    updates: [
      {
        // Only rename if userInfoId exists AND userId doesn't already exist
        q: { userInfoId: { $exists: true }, userId: { $exists: false } },
        u: { $rename: { "userInfoId": "userId" } },
        multi: true
      }
    ]
  });

  console.log("Rename result:", result);
}

main()
  .catch((e) => {
    console.error("Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
