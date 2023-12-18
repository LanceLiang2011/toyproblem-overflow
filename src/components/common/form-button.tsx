'use client';
import { useFormStatus } from 'react-dom';
import { ReactNode } from 'react';
import { Button } from '@nextui-org/react';
import { color } from 'framer-motion';

interface FormButtonProps {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  color?: `danger` | `default` | `warning` | `primary` | `secondary` | `success`;
  className?: string;
}

export default function FormButton({ children, color, type, className }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button className={className ?? ''} color={color ?? 'default'} type={type} isLoading={pending}>
      {children}
    </Button>
  );
}
