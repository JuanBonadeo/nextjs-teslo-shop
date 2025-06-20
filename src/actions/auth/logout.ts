'use server'

import { signOut } from "@/actions/auth/auth.config"

export const logout = async () => {
  await signOut()
}
