import "server-only";
import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

export const requireUser = cache(async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    // Sends them to sign-in and back to the current URL, query string included
    redirectToSignIn();
    throw new Error("Unreachable: redirectToSignIn should have redirected");
  }

  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
    throw new Error("Unreachable: redirectToSignIn should have redirected");
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    fullName: user.fullName,
  };
});
