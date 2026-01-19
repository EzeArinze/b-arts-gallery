"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <SignUp.Root>
        <div className="w-full max-w-md">
          {/* Poster-style header */}
          <div className="mb-12 text-center">
            <div className="text-xs tracking-[0.4em] text-primary/70 font-extrabold blur-[0.4px]">
              BUMEZ ART GALLERY
            </div>
            <h1 className="mt-4 font-anton text-[18vw] md:text-[10rem] leading-[0.9] text-primary">
              JOIN
            </h1>
          </div>

          {/* Frame */}
          <div className="border border-primary/40 px-6 py-8">
            <SignUp.Step name="start">
              {/* Google */}
              <Clerk.Connection
                name="google"
                className="
                w-full border border-primary/50
                py-3 mb-8
                font-anton text-xs tracking-[0.35em]
                text-primary
                hover:bg-primary hover:text-black
                transition
              "
              >
                SIGN UP WITH GOOGLE
              </Clerk.Connection>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-primary/40" />
                <span className="text-[10px] tracking-[0.3em] text-primary/60">
                  OR
                </span>
                <div className="h-px flex-1 bg-primary/40" />
              </div>

              {/* Email */}
              <Clerk.Field name="emailAddress" className="space-y-2">
                <Clerk.Label className="block text-xs tracking-[0.3em] text-primary/80 uppercase">
                  Email address
                </Clerk.Label>

                <Clerk.Input
                  className="
                  w-full bg-transparent
                  border-b border-primary/50
                  py-2 text-primary
                  focus:outline-none focus:border-primary
                "
                />

                <Clerk.FieldError className="text-xs text-primary/60" />
              </Clerk.Field>

              <SignUp.Action
                submit
                className="
                mt-8 w-full
                bg-primary text-black
                py-3
                font-anton text-xs tracking-[0.35em]
                hover:bg-primary/90
                transition
              "
              >
                CONTINUE
              </SignUp.Action>

              <div className="space-x-2 mt-2 text-center flex items-center justify-center">
                <p className="font-semibold text-muted-foreground text-sm">
                  have an account
                </p>
                <Link href={"/sign-in"} className="underline text-primary">
                  sign-in
                </Link>
              </div>
            </SignUp.Step>

            {/* Email magic link / code */}
            <SignUp.Step name="verifications">
              <SignUp.Strategy name="email_code">
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="block text-xs tracking-[0.3em] text-primary/80 uppercase">
                    Verification code
                  </Clerk.Label>

                  <Clerk.Input
                    className="
                    w-full bg-transparent
                    border-b border-primary/50
                    py-2 text-primary tracking-[0.3em]
                    focus:outline-none focus:border-primary
                  "
                  />

                  <Clerk.FieldError className="text-xs text-primary/60" />
                </Clerk.Field>

                <SignUp.Action
                  submit
                  className="
                  mt-8 w-full
                  bg-primary text-black
                  py-3
                  font-anton text-xs tracking-[0.35em]
                  hover:bg-primary/90
                  transition
                "
                >
                  VERIFY & ENTER
                </SignUp.Action>
              </SignUp.Strategy>
            </SignUp.Step>
          </div>
        </div>
      </SignUp.Root>
    </main>
  );
}
