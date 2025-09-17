'use client';

import { useState } from 'react';
// para usar cloudinary tenemos que usar un componente de tipo cliente
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import { getImagePath } from '@/src/utils';
import Image from 'next/image';

const ImageUpload = ({ image }: { image: string | undefined }) => {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          widget.close();
          // @ts-expect-error - Cloudinary result type no está bien tipado
          setImageUrl(result.info.secure_url);
        }
      }}
      uploadPreset={'prueba'}
      options={{
        maxFiles: 1
        // multiple: true
        // maxFileSize:
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>

            <div
              className="relative flex cursor-pointer flex-col items-center
                justify-center gap-4 border-neutral-300 bg-slate-100 p-10
                text-neutral-600 transition hover:opacity-70"
              /*
                por este tipo de comportamientos, es necesario un componente 
                cliente
              */
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>

              {imageUrl && (
                <div className="isnet-0 absolute h-full w-full">
                  <Image
                    fill
                    style={{ objectFit: 'contain' }}
                    src={imageUrl}
                    alt="Imagen de Producto"
                  />
                </div>
              )}
            </div>
          </div>

          {image && !imageUrl && (
            <div className="space-y-2">
              <label>Imagen Actual</label>
              <div className="relative h-64 w-64">
                <Image
                  fill
                  src={getImagePath(image)}
                  alt="Imagen Producto"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          <input
            type="hidden"
            name="image"
            // si tiene una imagen cargada, se a cambiar la imagen
            defaultValue={imageUrl ? imageUrl : image}
          />
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
