'use client';

import { KeyboardEventHandler, forwardRef } from 'react';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { FormErrors } from './form-errors';
import { useFormStatus } from 'react-dom';

interface FormTextareaProps {
   id: string;
   label?: string;
   placeholder?: string;
   required?: boolean;
   disabled?: boolean;
   errors?: Record<string, string[] | undefined>;
   clssName?: string;
   onBlur?: () => void;
   onClick?: () => void;
   onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
   defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
   (
      {
         id,
         label,
         placeholder,
         required,
         disabled,
         errors,
         clssName,
         onBlur,
         onClick,
         onKeyDown,
         defaultValue,
      },
      ref
   ) => {
      const { pending } = useFormStatus();

      return (
         <div className='space-y-2 w-full'>
            <div className='space-y-1 w-full1'>
               {label ? (
                  <label
                     htmlFor={id}
                     className='text-xs font-semibold text-neutral-700'
                  >
                     {label}
                  </label>
               ) : null}
               <Textarea
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                  ref={ref}
                  placeholder={placeholder}
                  name={id}
                  id={id}
                  disabled={pending || disabled}
                  className={cn(
                     'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
                     clssName
                  )}
                  aria-describedby={`${id}-error`}
                  defaultValue={defaultValue}
               />
            </div>
            <FormErrors id={id} errors={errors} />
         </div>
      );
   }
);

FormTextarea.displayName = 'FormTextarea';
