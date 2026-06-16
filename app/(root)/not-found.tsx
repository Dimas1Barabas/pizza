import { InfoBlock } from '@/shared/components';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="404"
        text="К сожалению, такой страницы не существует."
        imageUrl="/assets/images/404.png"
      />
    </div>
  );
}