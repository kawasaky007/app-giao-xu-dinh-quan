'use client';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

// Since we are creating a UI-only demo, the upload functionality will be mocked.
const RichTextEditor = forwardRef<typeof ReactQuill, RichTextEditorProps>(({ value, onChange }, ref) => {
  return (
      <div className="bg-background">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
          }}
        />
      </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
