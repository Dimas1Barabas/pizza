import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shared/constants/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getServerSession(authOptions);

    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    if (!data) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    /* Берём телефон из последнего заказа этого пользователя (связь по email) */
    const lastOrder = await prisma.order.findFirst({
      where: {
        email: data.email,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        phone: true,
      },
    });

    return NextResponse.json({ ...data, phone: lastOrder?.phone ?? '' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}
