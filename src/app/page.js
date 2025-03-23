"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Page() {
    const { openSignIn, openSignUp } = useClerk();

    return (
        <main className="min-h-screen mx-auto flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold mb-1">Supabase CRUD</h1>
            <SignedOut>
                <div className="flex gap-4">
                    <Button onClick={openSignIn}>Sign in</Button>
                    <Button variant="outline" onClick={openSignUp}>
                        Sign up
                    </Button>
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex gap-4 items-center">
                    <UserButton />
                    <Link
                        href="/dashboard"
                        className="group flex items-center justify-center gap-3 font-medium text-zinc-600 "
                    >
                        Dashboard
                        <ArrowRight
                            size={15}
                            strokeWidth={3.5}
                            className="transition group-hover:translate-x-1.5"
                        />
                    </Link>
                </div>
            </SignedIn>
        </main>
    );
}
