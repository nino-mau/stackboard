import { useForm } from '@tanstack/react-form';
import { Link, useNavigate } from '@tanstack/react-router';
import { useId, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';
import SiteLogo from '@/components/icon/SiteLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import InputFloating from '@/components/ui/input-floating';
import { Spinner } from '@/components/ui/spinner';
import { GithubDark } from '@/components/ui/svgs/githubDark';
import { Gitlab } from '@/components/ui/svgs/gitlab';
import { Google } from '@/components/ui/svgs/google';
import { authClient } from '@/lib/auth-client';
import { loginWithOAuth } from '@/utils/auth.client';
import { getNameFromEmail } from '@/utils/misc';

/**
 * TODO: Migrate to tanstack forms
 */
export default function RegisterForm() {
  const navigate = useNavigate();
  const formId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const registerSchema = z
    .object({
      email: z
        .email({ message: 'Please enter a valid email address' })
        .min(1, { message: 'Please enter an email address' }),
      password: z
        .string()
        .min(1, { message: 'Please enter a password' })
        .min(8, { message: 'Password must be at least 8 characters' }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Please confirm your password' })
        .min(8, { message: 'Password must be at least 8 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: registerSchema,
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        name: getNameFromEmail(value.email),
        email: value.email,
        password: value.password,
      });

      if (error) {
        setIsLoading(false);
        if (error.code) {
          if (error.code.includes('EMAIL') && error.code.includes('PASSWORD')) {
            // Handle email and password errors
            formApi.setErrorMap({
              onSubmit: {
                fields: {
                  password: error,
                  email: error,
                },
              },
            });
          } else if (error.code.includes('EMAIL')) {
            // Handle email errors
            formApi.setErrorMap({
              onSubmit: {
                fields: {
                  email: error,
                },
              },
            });
          } else if (error.code.includes('PASSWORD')) {
            // Handle password errors
            formApi.setErrorMap({
              onSubmit: {
                fields: {
                  password: error,
                },
              },
            });
          } else {
            // Handle other error
            formApi.setErrorMap({
              onSubmit: {
                fields: {
                  email: error,
                  password: { message: '' },
                  confirmPassword: { message: '' },
                },
              },
            });
            toast.error(error.message);
          }
        } else {
          // Handle unkown error
          formApi.setErrorMap({
            onSubmit: {
              fields: {
                email: error.statusText,
                password: { message: '' },
                confirmPassword: { message: '' },
              },
            },
          });
          toast.error(error.statusText);
        }
        return;
      }

      // Redirect to home page
      navigate({ to: '/', search: { registered: 'true' } });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Card className="w-fit overflow-hidden bg-transparent p-0 ring-0">
        <CardContent>
          <form
            id={formId}
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="w-110 p-6"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <SiteLogo className="mb-4" />
                <h1 className="font-bold text-2xl">Welcome on Stackboard</h1>
                <p className="text-balance text-muted-foreground">
                  Sign Up to your Stackboard account
                </p>
              </div>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <Google />
                  <span className="sr-only">Sign Up with Google</span>
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
                  <span className="sr-only">Sign Up with Github</span>
                </Button>
                <Button variant="outline" type="button">
                  <Gitlab />
                  <span className="sr-only">Sign Up with Gitlab</span>
                </Button>
              </Field>
              <FieldSeparator>OR</FieldSeparator>
              {/* Email Field */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <InputFloating
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        label="Email"
                        inputClasses="aria-invalid:text-foreground!"
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              {/* Password Field */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <InputFloating
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        label="Password"
                        inputClasses="aria-invalid:text-foreground!"
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              {/* Confirm Password Field */}
              <form.Field name="confirmPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <InputFloating
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        label="Confirm Password"
                        inputClasses="aria-invalid:text-foreground!"
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <Field>
                <Button disabled={isLoading} type="submit" form={formId}>
                  {isLoading && <Spinner />}
                  Sign Up
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/auth/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
