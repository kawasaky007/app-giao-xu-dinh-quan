'use client';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import React, { useMemo, useRef, useState, useCallback, forwardRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useStorage } from '@/firebase';
import type ReactQuillType from 'react-quill';
import { useToast } from '@/hooks/use-toast';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(({ value, onChange, placeholder }, ref) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <Skeleton className="h-[250px] w-full rounded-md" />,
  }), []);

  const quillRef = useRef<ReactQuillType>(null);
  const storage = useStorage();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileUploadHandler = useCallback(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    if (!storage) {
        toast({
            variant: "destructive",
            title: "Lỗi cấu hình",
            description: "Dịch vụ lưu trữ Firebase không khả dụng.",
        });
        return;
    }

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*, video/*, audio/*, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setUploading(true);
      setUploadProgress(0);

      const sRef = storageRef(storage, `content-uploads/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(sRef, file);
      const range = editor.getSelection(true);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          toast({
              variant: "destructive",
              title: "Tải tệp lên thất bại",
              description: `Đã có lỗi xảy ra: ${error.message}`,
          });
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const fileType = file.type.split('/')[0];
            
            if (fileType === 'image') {
              editor.insertEmbed(range.index, 'image', downloadURL);
            } else if (fileType === 'video') {
              editor.insertEmbed(range.index, 'video', downloadURL);
            } else {
              // For audio and documents, embed as a link
              editor.insertText(range.index, file.name, 'link', downloadURL);
            }
            
            editor.setSelection(range.index + 1, 0);
            setUploading(false);
          });
        }
      );
    };
  }, [storage, toast]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        'image': fileUploadHandler,
        'video': fileUploadHandler,
      }
    }
  }), [fileUploadHandler]);

  return (
    <div className="rich-text-editor bg-card rounded-md border border-input" ref={ref}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
      />
      {uploading && (
        <div className="p-2 border-t border-input">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-xs text-muted-foreground text-center mt-1">Đang tải lên... {Math.round(uploadProgress)}%</p>
        </div>
      )}
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
