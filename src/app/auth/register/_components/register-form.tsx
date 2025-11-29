'use client';

import SiteLogo from '@/components/icon/site-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator
} from '@/components/ui/field';
import InputFloating from '@/components/ui/input-floating';
import { GithubDark } from '@/components/ui/svgs/githubDark';
import { Gitlab } from '@/components/ui/svgs/gitlab';
import { Google } from '@/components/ui/svgs/google';
import { getNameFromEmail } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const registerUserSchema = z
  .object({
    email: z
      .email({ message: 'Please enter a valid email address' })
      .min(1, { message: 'Please enter an email address' }),
    password: z
      .string()
      .min(1, { message: 'Please enter a password' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' })
      .min(6, { message: 'Password must be at least 6 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  async function onSubmit(formData: RegisterUserSchema) {
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Card className="w-fit overflow-hidden border-0 bg-transparent p-0">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-110 p-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <SiteLogo className="mb-4" />
                <h1 className="text-2xl font-bold">Welcome on Stackboard</h1>
                <p className="text-muted-foreground text-balance">
                  Sign Up to your Acme Inc account
                </p>
              </div>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <Google />
                  <span className="sr-only">Sign Up with Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <GithubDark />
                  <span className="sr-only">Sign Up with Github</span>
                </Button>
                <Button variant="outline" type="button">
                  <Gitlab />
                  <span className="sr-only">Sign Up with Gitlab</span>
                </Button>
              </Field>
              <FieldSeparator className="">OR</FieldSeparator>
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2" data-invalid={fieldState.invalid}>
                    <InputFloating
                      {...field}
                      id="form-rhf-demo-title"
                      label="Email"
                      inputClasses="aria-invalid:text-foreground!"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2" data-invalid={fieldState.invalid}>
                    <InputFloating
                      {...field}
                      id="form-rhf-demo-title"
                      label="Password"
                      inputClasses="aria-invalid:text-foreground!"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Confirm Password Field */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2" data-invalid={fieldState.invalid}>
                    <InputFloating
                      {...field}
                      id="form-rhf-demo-title"
                      label="Confirm Password"
                      aria-invalid={fieldState.invalid}
                      inputClasses="aria-invalid:text-foreground!"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit">Sign Up</Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center"> */}
      {/*   By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '} */}
      {/*   and <a href="#">Privacy Policy</a>. */}
      {/* </FieldDescription> */}
    </div>
  );
}
