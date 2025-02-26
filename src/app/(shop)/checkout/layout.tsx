import { auth } from "@/auth.config";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/lohin?redirectTo=/checkout/adress");
    }

    return (
        <>
            {children}
        </>
    );
}