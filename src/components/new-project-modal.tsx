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
  });

  /**
   * Default values of the form
   */
  const defaultValues: z.input<typeof newProjectSchema> = {
    logo: undefined,
    name: '',
    description: '',
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
