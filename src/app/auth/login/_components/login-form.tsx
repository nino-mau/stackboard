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
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { GithubDark } from '@/components/ui/svgs/githubDark';
import { Gitlab } from '@/components/ui/svgs/gitlab';
import { Google } from '@/components/ui/svgs/google';
import { authClient } from '@/lib/auth-client';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { loginWithOAuth } from '@/utils/auth.client';

const loginUserSchema = z.object({
  email: z
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Please enter an email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' })
});

type LoginUserSchema = z.infer<typeof loginUserSchema>;

export function LoginForm() {
  const form = useForm<LoginUserSchema>({
    resolver: standardSchemaResolver(loginUserSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  async function onSubmit(formData: LoginUserSchema) {
    setIsLoading(true);
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      setIsLoading(false);
      if (error.code) {
        form.setError('email', error);
        form.setError('password', { message: '' });
      } else {
        // Handle unkown error
        form.setError('email', {
          message: error.statusText
        });
        form.setError('password', { message: '' });
        toast.error(error.statusText);
      }
      return;
    }

    // Redirect to home page
    redirect('/');
  }
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Card className="w-fit overflow-hidden bg-transparent p-0 ring-0">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-110 p-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <SiteLogo className="mb-4" />
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Stackboard account
                </p>
              </div>
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2" data-invalid={fieldState.invalid}>
                    <InputFloating
                      {...field}
                      id="login-form-email"
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
                      id="login-form-password"
                      label="Password"
                      type="password"
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
              <Field>
                <Button disabled={isLoading} type="submit">
                  {isLoading && <Spinner />}
                  Login
                </Button>
              </Field>
              <FieldSeparator>Or continue with</FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <Google />
                  <span className="sr-only">Sign In with Google</span>
                </Button>
                <Button
                  onClick={async () => {
                    setIsGithubLoading(true);
                    await loginWithOAuth('github');
                  }}
                  disabled={isGithubLoading}
                  variant="outline"
                  type="button"
                >
                  {isGithubLoading ? <Spinner /> : <GithubDark />}
                  <span className="sr-only">Sign In with Github</span>
                </Button>
                <Button variant="outline" type="button">
                  <Gitlab />
                  <span className="sr-only">Sign In with Gitlab</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register">Sign up</Link>
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
