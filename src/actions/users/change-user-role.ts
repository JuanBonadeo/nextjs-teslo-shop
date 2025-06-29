'use server'

import { auth } from "@/actions/auth/auth.config"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const changeUserRole = async (userId: string, role: string) => {
    const newRole = role === 'admin' ? 'admin' : 'user'
    const session = await auth()

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe ser admin'
        }
    }

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                role: newRole
            }
        })

        revalidatePath('/admin/users')
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo actualizar el rol'
        }
    }
}
