"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import { createComment } from "@/actions";
import toast from 'react-hot-toast';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  const {success, errors} = useMemo(() => formState, [formState]);

  useEffect(() => {
    if (success) {
      ref.current?.reset();
      toast.success('Comment created successfully');
      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [success, startOpen]);

  useEffect(() => {
    if (errors._form && errors._form.length > 0) {
      toast.error(errors._form?.join(', '));
    }
  }, [errors._form]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!errors.content}
          errorMessage={errors.content?.join(", ")}
        />

        <FormButton type="submit" color="success">Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button className="mb-2" size="sm" color="warning" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
