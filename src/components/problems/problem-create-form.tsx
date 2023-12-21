'use client';
import { useFormState } from 'react-dom';
import { useMemo, useEffect } from 'react';
import type { CreateProblemFormState } from '@/actions/create-problem';
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
import FormButton from '@/components/common/form-button';

const CONTENT = 'New Problem';

export default function ProblemCreateForm() {
  const [formState, action] = useFormState<CreateProblemFormState, FormData>(
    createProblem,
    { errors: {} }
  );
  const {_form, name, description, expectedInput, expectedOutput} = useMemo(() => formState.errors, [formState.errors]);
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
              placeholder="lowercase-with-dashes"
              isInvalid={!!name}
              errorMessage={name?.join(', ')}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe the problem"
              isInvalid={!!description}
              errorMessage={description?.join(', ')}
            />
            <div className="flex gap-2">
              <Input
                name="expectedInput"
                label="Expected Input"
                labelPlacement="outside"
                placeholder="e.g. 1 | 2 | 3"
                isInvalid={!!expectedInput}
                errorMessage={expectedInput?.join(', ')}
              />
              <Input
                name="expectedOutput"
                label="Expected Output"
                labelPlacement="outside"
                placeholder="e.g. 6"
                isInvalid={!!expectedOutput}
                errorMessage={expectedOutput?.join(', ')}
              />
            </div>
            <FormButton color="success" type="submit">
              Submit
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
