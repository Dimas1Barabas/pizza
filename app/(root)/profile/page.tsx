import { prisma } from '@/prisma/prisma-client';
import { Container, ProfileForm, Title } from '@/shared/components';
import { ProfileOrders } from '@/shared/components/shared/profile-orders';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

  if (!user) {
    return redirect('/not-auth');
  }

  const orders = await prisma.order.findMany({
    where: { email: user.email },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container className="my-10">
      <Title text={`Личные данные | #${user.id}`} size="md" className="font-bold" />

      <div className="flex gap-10 mt-10">
        <ProfileForm data={user} />
        <ProfileOrders orders={orders} />
      </div>
    </Container>
  );
}
