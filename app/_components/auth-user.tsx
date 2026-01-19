"use client";

import { useUser, UserButton, SignUpButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";

function AuthUser() {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      {!user && !isSignedIn ? (
        <div>
          <SignUpButton>
            <User2 className="rounded-full size-4" />
          </SignUpButton>
        </div>
      ) : (
        <div>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default AuthUser;
