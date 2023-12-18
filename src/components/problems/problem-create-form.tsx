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
  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">{CONTENT}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={createProblem}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">{CONTENT}</h3>
            <Input name="name" label="Name" labelPlacement="outside" placeholder="Name" />
            <Textarea name="description" label="Description" labelPlacement="outside" placeholder="Describe the problem" />
            <Button type="submit" color="success">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
