"use client";

import { orderFormSchema, orderFormType } from "@/schema/check-out-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { handleCheckout } from "../actions";
import { tryCatch } from "@/utils/try-catch";

interface iAppProps {
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddress: string | undefined;
    imageUrl: string;
    fullName: string | null;
  };
  slug: string;
}

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground";

const inputClass =
  "h-11 rounded-none border-0 border-b border-muted/40 bg-transparent px-0 shadow-none transition-[border-color] duration-200 focus-visible:border-primary focus-visible:ring-0 aria-invalid:border-destructive px-1";

function CheckOutForm(props: iAppProps) {
  const { firstName, lastName } = props.user;
  const joinedName = [firstName, lastName].filter(Boolean).join(" ");

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: props.user.fullName || joinedName,
      email: props.user.emailAddress ?? "",
      address: "",
      phone: "",
      state: "",
      terms: false,
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSubmit(value: orderFormType) {
    const { data, error } = await tryCatch(
      handleCheckout({ value, slug: props.slug }),
    );
    console.log(data, error);
  }

  return (
    <Card className="w-full border-muted/40 bg-background/80 shadow-none backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-medium tracking-tight">
          Delivery details
        </CardTitle>
        <CardDescription className="text-xs tracking-wide text-muted-foreground">
          Tell us where your artwork should go
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="checkout-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2"
        >
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel htmlFor="fullName" className={labelClass}>
                  Full name
                </FieldLabel>
                <Input
                  {...field}
                  id="fullName"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Your full name"
                  className={inputClass}
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
                <FieldLabel htmlFor="email" className={labelClass}>
                  Email address
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  // readOnly (not disabled) so it stays selectable and
                  // screen readers still announce it.
                  readOnly
                  className={`${inputClass} text-muted-foreground`}
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
                <FieldLabel htmlFor="phone" className={labelClass}>
                  Phone number
                </FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={fieldState.invalid}
                  placeholder="Phone number"
                  className={inputClass}
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
              <Field
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel htmlFor="address" className={labelClass}>
                  Delivery address
                </FieldLabel>
                <Input
                  {...field}
                  id="address"
                  autoComplete="street-address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Street, area, landmark"
                  className={inputClass}
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
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel htmlFor="state" className={labelClass}>
                  State / City
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="state"
                    aria-invalid={fieldState.invalid}
                    className={`${inputClass} w-full justify-between`}
                  >
                    <SelectValue placeholder="Select your delivery city" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72 rounded-none border-muted/40">
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectSeparator />
                    {states.map((state) => (
                      <SelectItem key={state.ISO} value={state.state_name}>
                        {state.state_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
                className="items-start sm:col-span-2"
              >
                <Checkbox
                  id="terms"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="mt-0.5 rounded-none border-muted/40"
                />
                <FieldContent>
                  <FieldLabel
                    htmlFor="terms"
                    className="text-xs font-normal leading-relaxed text-muted-foreground"
                  >
                    I agree to the terms of sale and delivery policy
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="border-t border-muted/30 pt-6">
        <Button
          type="submit"
          form="checkout-form"
          variant="outline"
          disabled={isSubmitting}
          className="h-12 w-full rounded-none border-muted/40 text-xs tracking-[0.3em] transition-[transform,border-color,background-color] duration-150 hover:border-primary hover:bg-transparent active:scale-[0.97] motion-reduce:active:scale-100"
        >
          {isSubmitting ? "PLEASE WAIT" : "CONTINUE"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CheckOutForm;
