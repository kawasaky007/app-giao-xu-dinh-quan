'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import { useStorage } from '@/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FileUploadInputProps {
  value: string | undefined;
  onChange: (url: string | undefined) => void;
  uploadPath: string;
}

const isFileTypeAllowed = (fileType: string): boolean => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedImageTypes.includes(fileType);
};

export default function FileUploadInput({ value, onChange, uploadPath }: FileUploadInputProps) {
  const storage = useStorage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    if (!storage) {
        toast({
            variant: "destructive",
            title: "Lỗi cấu hình",
            description: "Dịch vụ lưu trữ Firebase không khả dụng.",
        });
        return;
    }

    if (!isFileTypeAllowed(file.type)) {
      toast({
        variant: "destructive",
        title: "Loại tệp không hợp lệ",
        description: `Tệp có loại ${file.type} không được phép tải lên. Chỉ chấp nhận tệp hình ảnh.`,
      });
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const sRef = storageRef(storage, `${uploadPath}/${Date.now()}-${file.name}`);

    try {
        const snapshot = await uploadBytes(sRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        onChange(downloadURL);
        toast({
            title: "Tải lên thành công!",
            description: "Ảnh bìa đã được tải lên.",
        });
    } catch (error: any) {
        console.error("Upload failed:", error);
        const errorMessage = `Tải lên thất bại: ${error.code || error.message}`;
        setUploadError(errorMessage);
        toast({
            variant: "destructive",
            title: "Tải lên thất bại",
            description: errorMessage,
        });
    } finally {
        setIsUploading(false);
    }
  }, [storage, uploadPath, onChange, toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
  }, [handleUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    disabled: isUploading,
  });

  if (value) {
    return (
      <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border">
        <Image src={value} alt="Xem trước ảnh bìa" fill style={{ objectFit: 'cover' }} />
        <div className="absolute top-2 right-2">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8 opacity-80 hover:opacity-100"
            onClick={() => onChange(undefined)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Xóa ảnh</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary/50 transition-colors',
        isDragActive && 'border-primary bg-primary/10',
        isUploading && 'cursor-default pointer-events-none'
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex flex-col items-center gap-4 text-center p-4 w-full">
            <p className="text-sm font-medium">Đang tải lên...</p>
            <Progress value={undefined} className="w-3/4 h-2" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Nhấn để tải lên</span> hoặc kéo và thả
          </p>
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF hoặc WEBP (tối đa 50MB)</p>
          {uploadError && <p className="text-xs text-destructive mt-2">{uploadError}</p>}
        </div>
      )}
    </div>
  );
}
