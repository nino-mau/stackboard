import { ComponentPropsWithoutRef, HTMLInputTypeAttribute, useId } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type InputFloatingProps = {
  label: string;
  backgroundClass?: string;
  inputClasses?: string;
} & ComponentPropsWithoutRef<typeof Input>;

export default function InputFloating({
  label,
  backgroundClass = 'bg-[#151515]',
  inputClasses,
  ...inputProps
}: InputFloatingProps) {
  return (
    <div className="group relative w-full">
      <label
        htmlFor={inputProps.id}
        aria-invalid={inputProps['aria-invalid']}
        className="origin-start text-muted-foreground aria-invalid:text-destructive! group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground pointer-events-none absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-[13px] group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-[13px] has-[+input:not(:placeholder-shown)]:font-medium"
      >
        <span
          className={cn(
            backgroundClass,
            'group-focus-within:bg-background mx-1 inline-flex leading-none'
          )}
        >
          {label}
        </span>
      </label>
      <Input placeholder=" " className={cn(inputClasses)} {...inputProps} />
    </div>
  );
}
