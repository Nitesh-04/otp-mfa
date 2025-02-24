import prisma from "@/utils/db";

export async function findUser(email: string) {
    return await prisma.user.findUnique({
        where: {
        email,
        },
    });
}