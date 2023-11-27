'use client';

import { KeyboardEventHandler, forwardRef } from 'react';

interface FormTextareaProps {
   id: string;
   label: string;
   placeholder?: string;
   required?: boolean;
   disabled?: boolean;
   errors?: Record<string, string[] | undefined>;
   clssName?: string;
   onBlur?: () => void;
   onClick: () => void;
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
      return <div>Fuck You</div>;
   }
);

FormTextarea.displayName = 'FormTextarea';
