'use client';

import { useFormState } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
  Code
} from '@nextui-org/react';
import { createPost } from '@/actions';
import type { CreatePostFormState } from '@/actions/create-post';
import FormButton from '../common/form-button';
import DarkModeSwitch from '@/components/common/dark-mode-switch';
import toast from 'react-hot-toast';

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useFormState<CreatePostFormState, FormData>(
    createPost.bind(null, slug),
    { errors: {} }
  );
  const { _form, content, title } = useMemo(
    () => formState.errors,
    [formState.errors]
  );
  useEffect(() => {
    if (_form && _form.length > 0) {
      toast.error(_form?.join(', '));
    }
  }, [_form, content]);
  const [code, setCode] = useState('// Write your code here');
  const [darkMode, setDarkMode] = useState(false);
  const handleEditorChange = (value?: string) => setCode(value || '');

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button color="primary">Post a solution</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-96">
            <h3 className="text-lg">Post a solution</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!title}
              errorMessage={title?.join(', ')}
            />
            <div className="flex justify-between">
              <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
              <Chip color="warning">JavaScript</Chip>
            </div>
            <Editor
              value={code}
              onChange={handleEditorChange}
              height="40vh"
              defaultLanguage="javascript"
              theme={darkMode ? 'vs-dark' : 'light'}
              options={{ minimap: { enabled: false } }}
            />
            <Textarea name="content" value={code} className="hidden" />
            {content && content.length > 0 && (
              <Code className="overflow-hidden" size="sm" color="danger">
                {content?.join(', ')}
              </Code>
            )}
            <FormButton color="success" type="submit">
              Submit
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
