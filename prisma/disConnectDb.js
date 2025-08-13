export default async function disConnect(prisma) {
    try {

        await prisma.$disconnect()
    }catch(e) {

        console.error(e)
        await prisma.$disconnect()
        process.exit()
    }

}