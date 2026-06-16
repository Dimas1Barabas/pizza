"use client"

import { InfoBlock } from '@/shared/components';

export default function ErrorBlock() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Произошла ошибка"
        text="Скоро все исправим..."
        imageUrl="/assets/images/empty-box.png"
      />
    </div>
  );
}
