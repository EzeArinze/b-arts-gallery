"use client";

import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";

function AuthUser() {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      {!user && !isSignedIn ? (
        <Link href={"/sign-in"}>
          <Button
            className="mt-2 font-anton rounded-full border-primary border cursor-pointer hover:bg-primary hover:text-white"
            variant={"ghost"}
          >
            <User2 className="size-3" />
          </Button>
        </Link>
      ) : (
        <div className="mt-2">
          <UserButton
            appearance={{
              elements: {
                userButtonBox: {
                  flexDirection: "row-reverse",
                  gap: "0px",
                  color: `var(--primary)`,
                  padding: "1px",
                },
              },
            }}
            showName
          />
        </div>
      )}
    </div>
  );
}

export default AuthUser;
