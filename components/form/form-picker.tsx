'use client';

import { useEffect, useState } from 'react';

import { unsplash } from '@/lib/unsplash';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FormPickerProps {
   id: string;
   errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
   const { pending } = useFormStatus();

   const [imgaes, setImgaes] = useState<Array<Record<string, any>>>([]);
   const [isloading, setIsloading] = useState(true);
   const [selectedImageId, setSelectedImageId] = useState(null);

   useEffect(() => {
      const fetchImages = async () => {
         try {
            const result = await unsplash.photos.getRandom({
               collectionIds: ['317099'],
               count: 9,
            });

            if (result && result.response) {
               const newImages = result.response as Array<Record<string, any>>;
               setImgaes(newImages);
            } else {
               console.error('Failed to get images from unsplash');
            }
         } catch (error) {
            console.log(error);
            setImgaes([]);
         } finally {
            setIsloading(false);
         }
      };

      fetchImages();
   }, []);

   if (isloading) {
      return (
         <div className='p6=6 flex items-center justify-center'>
            <Loader2 className='h-6 w-6 to-sky-700 animate-spin' />
         </div>
      );
   }

   return (
      <div className='relative'>
         <div className='grid grid-cols-3 gap-2 mb-2'>
            {imgaes.map((image) => (
               <div
                  key={image.id}
                  className={cn(
                     'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                     pending && 'opacity-50 hover:opacity-50 cursor-auto'
                  )}
                  onClick={() => {
                     if (pending) return;
                     setSelectedImageId(image.id);
                  }}
               >
                  <Image
                     fill
                     src={image.urls.thumb}
                     alt='unsplash image'
                     className='object-cover rounded-sm'
                  />
               </div>
            ))}
         </div>
      </div>
   );
};
