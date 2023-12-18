'use client';
import { useFormState } from 'react-dom';
import { useMemo, useEffect } from 'react';
import { CreateProblemFormState } from '@/actions/create-problem';
import toast from 'react-hot-toast';
import {
  Input,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import { createProblem } from '@/actions';

const CONTENT = 'New Problem';

export default function ProblemCreateForm() {
  const [formState, action] = useFormState<CreateProblemFormState, FormData>(
    createProblem,
    { errors: {} }
  );
  const {_form} = useMemo(() => formState.errors, [formState.errors]);
  useEffect(() => {
    if (_form && _form.length > 0) {
      toast.error(_form?.join(', '));
    }
  }, [_form]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">{CONTENT}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">{CONTENT}</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe the problem"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            <Button type="submit" color="success">
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
