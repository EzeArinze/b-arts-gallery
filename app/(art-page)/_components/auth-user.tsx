"use client";

import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";

function AuthUser() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="">
      {!user && !isSignedIn ? (
        <Link href={"/sign-in"}>
          <Button
            className="size-7 font-anton rounded-full border-primary border cursor-pointer hover:bg-primary/10"
            variant={"ghost"}
          >
            <User2 className="size-3 text-primary" />
          </Button>
        </Link>
      ) : (
        <UserButton
          appearance={{
            elements: {
              userButtonBox: {
                color: `var(--primary)`,
                marginTop: "5px",
              },
            },
          }}
          // showName
        />
      )}
    </div>
  );
}

export default AuthUser;
