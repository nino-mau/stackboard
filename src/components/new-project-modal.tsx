'use client';

import { CheckmarkCircle01, RemoveCircle } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { validateGithubRepoUrl } from '@/server/actions/git';
import { Icon } from '@iconify/react';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import ProjectTagCombobox from './ui/combobox/project-tag-combobox';
import { Dialog, DialogClose, DialogContent, DialogHeader } from './ui/dialog';
import { Input } from './ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea
} from './ui/input-group';
import { Spinner } from './ui/spinner';

type NewProjectModalProps = {
  test: string;
};

export default function NewProjectModal(props: NewProjectModalProps) {
  // Open/Close state of the modal
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-xl max-w-xl! p-4.5 pt-3"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Icon icon="hugeicons:package-add" className="size-4.75" />
            <h1 className="text-base font-medium">New Project</h1>
          </div>
          <DialogClose
            render={
              <Button variant="ghost" size="icon-sm">
                <Icon icon="hugeicons:cancel-01" />
              </Button>
            }
          />
        </DialogHeader>
        <div>
          <NewProjectForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NewProjectForm() {
  const [isRepoUrlValid, setIsRepoUrlValid] = useState<boolean | undefined>(
    undefined
  );
  const [isRepoUrlValidationLoading, setIsRepoUrlValidationLoading] =
    useState(false);

  /**
   * Zod schema for the New Project form
   */
  const newProjectSchema = z.object({
    logo: z.string().optional(),
    name: z
      .string()
      .min(5, 'Name must be at least 5 characters.')
      .max(32, 'Name must be at most 32 characters.'),
    description: z
      .string()
      .max(200, 'Description must be at most 200 characters.')
      .optional(),
    tags: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          color: z.string()
        })
      )
      .optional(),
    repoUrl: z
      .string()
      .optional()
      .superRefine(async (url, ctx) => {
        if (!url || url === defaultValues.repoUrl) {
          setIsRepoUrlValid(false);
          return;
        }

        // Validate URL format
        const urlResult = z.url({ hostname: /^github\.com$/ }).safeParse(url);
        if (!urlResult.success) {
          setIsRepoUrlValid(false);
          ctx.addIssue({
            code: 'custom',
            message: 'Invalid URL format'
          });
          return;
        }

        /**
         * Check if a repository exist for the url, controls a loading state on
         * the repo url input
         */
        try {
          setIsRepoUrlValidationLoading(true);
          if (!(await validateGithubRepoUrl(url))) {
            setIsRepoUrlValid(false);
            ctx.addIssue({
              code: 'custom',
              message: 'Repository not found'
            });
          } else {
            setIsRepoUrlValid(true);
          }
        } finally {
          setIsRepoUrlValidationLoading(false);
        }
      })
  });

  /**
   * Default values of the form
   */
  const defaultValues: z.input<typeof newProjectSchema> = {
    logo: undefined,
    name: '',
    description: '',
    repoUrl: '',
    tags: []
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChangeAsync: newProjectSchema,
      onSubmitAsync: newProjectSchema
    },
    onSubmit: async ({ value }) => {
      toast.success('Form submitted successfully');
    }
  });

  return (
    <form
      id="new-project-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-row justify-end gap-4">
          {/* Project Logo */}
          <form.Field name="logo">
            {(field) => {
              return (
                <Field className="mb-auto w-fit">
                  <Button
                    id={field.name}
                    size="icon-lg"
                    variant="outline"
                    className="size-9!"
                  >
                    <Icon icon="hugeicons:square" />
                  </Button>
                </Field>
              );
            }}
          </form.Field>
          {/* Project Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Project Name"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
        {/* Project Description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Add a short description"
                    rows={3}
                    aria-invalid={isInvalid}
                  />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        {/* Project Tags */}
        <form.Field name="tags">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Tags
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <ProjectTagCombobox />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        {/* Project Repo Url */}
        <form.Field name="repoUrl">
          {(field) => {
            const isInvalid =
              !field.state.meta.isDefaultValue && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Github Repository
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="https://github.com/"
                    autoComplete="off"
                  />
                  <InputGroupAddon className="text-muted-foreground pr-1">
                    <Icon icon="hugeicons:github" />
                  </InputGroupAddon>
                  {/* Validation status icon */}
                  {field.state.value !== defaultValues.repoUrl && (
                    <InputGroupAddon align="inline-end">
                      {isRepoUrlValidationLoading ? (
                        <Spinner />
                      ) : isRepoUrlValid ? (
                        <CheckmarkCircle01 size={16} className="text-success" />
                      ) : !isRepoUrlValid &&
                        typeof isRepoUrlValid === 'boolean' ? (
                        <RemoveCircle size={16} className="text-destructive" />
                      ) : (
                        <></>
                      )}
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                {!isInvalid && isRepoUrlValid && (
                  <FieldDescription className="text-success">
                    The repository was found.
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <Field orientation="horizontal" className="mt-8 justify-end">
        <Button type="submit" form="bug-report-form" size="lg">
          {/* <HugeiconsIcon icon={AddCircleIcon} strokeWidth={2} /> */}
          <Icon icon="hugeicons:add-square" className="[&_path]:stroke-[2px]" />
          Create
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => form.reset()}
        >
          Cancel
        </Button>
      </Field>
    </form>
  );
}
