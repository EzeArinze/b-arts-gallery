"use client";

import { orderFormSchema, orderFormType } from "@/schema/check-out-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { User } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "@/utils/constant";
import { Checkbox } from "@/components/ui/checkbox";

interface iAppProps {
  user: User;
}

function CheckOutForm(props: iAppProps) {
  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      fullName: props.user.fullName || "",
      email: props.user.emailAddresses[0].emailAddress,
      address: "",
      phone: "",
      state: "",
      terms: undefined,
    },
  });

  function handleSubmit(value: orderFormType) {
    console.log(value, props.user);
  }

  return (
    <div>
      <Card className="w-full sm:max-w-md border-muted/40 bg-background/80 backdrop-blur-sm shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-medium tracking-tight">
            Checkout
          </CardTitle>
          <CardDescription className="text-xs tracking-wide text-muted-foreground">
            Complete your details to proceed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="checkout-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">FullName</FieldLabel>
                  <Input
                    {...field}
                    id="fullName"
                    aria-invalid={fieldState.invalid}
                    placeholder="FullName"
                    className="rounded-none border-muted/40 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="email"
                    type="email"
                    className="rounded-none border-muted/40 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="phone"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="phone"
                    type="tel"
                    className="rounded-none border-muted/40 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="address"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="address"
                    aria-invalid={fieldState.invalid}
                    placeholder="address"
                    className="rounded-none border-muted/40 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel
                      htmlFor="state"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      State/City
                    </FieldLabel>
                    <FieldDescription className="text-[10px] tracking-wide">
                      Select your city for devlivery
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="state"
                      aria-invalid={fieldState.invalid}
                      className="rounded-none border-muted/40 bg-transparent px-0 focus:ring-0"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent
                      position="item-aligned"
                      className="rounded-none border-muted/40"
                    >
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {states.map((state) => (
                        <SelectItem key={state.ISO} value={state.state_name}>
                          {state.state_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="terms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="terms"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-none border-muted/40"
                  />
                  <FieldLabel
                    htmlFor="terms"
                    className="text-xs text-muted-foreground font-normal"
                  >
                    Terms
                  </FieldLabel>
                  <FieldDescription className="text-[10px] tracking-wide">
                    Accept terms to continue
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>

        <CardFooter className="border-t border-muted/30 pt-6">
          <Field orientation="responsive">
            <Button
              type="submit"
              form="checkout-form"
              variant="outline"
              className="w-full rounded-none border-muted/40 tracking-widest text-xs hover:border-primary hover:bg-transparent"
            >
              CONTINUE
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CheckOutForm;
