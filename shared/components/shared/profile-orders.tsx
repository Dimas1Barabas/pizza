import { Order, OrderStatus } from '@prisma/client';
import React from 'react';

interface Props {
  orders: Order[];
}

type StoredItem = {
  quantity?: number;
  productItem?: {
    price?: number;
    product?: {
      name?: string;
    };
  };
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.SUCCEEDED]: 'Выполнен',
  [OrderStatus.PENDING]: 'Ожидает оплаты',
  [OrderStatus.CANCELLED]: 'Отменён',
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  [OrderStatus.SUCCEEDED]: 'bg-green-100 text-green-700',
  [OrderStatus.PENDING]: 'bg-amber-100 text-amber-700',
  [OrderStatus.CANCELLED]: 'bg-gray-200 text-gray-600',
};

function parseItems(items: Order['items']): StoredItem[] {
  try {
    const parsed = typeof items === 'string' ? JSON.parse(items) : items;
    return Array.isArray(parsed) ? (parsed as StoredItem[]) : [];
  } catch {
    return [];
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const ProfileOrders: React.FC<Props> = ({ orders }) => {
  return (
    <div className="flex-1">
      <h2 className="font-bold text-xl mb-5">История заказов</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">У вас пока нет заказов</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const items = parseItems(order.items);

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold">Заказ #{order.id}</span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>

                <div className="text-gray-500 text-sm mb-3">{formatDate(order.createdAt)}</div>

                {items.length > 0 && (
                  <ul className="text-sm text-gray-600 mb-3 space-y-1">
                    {items.slice(0, 4).map((item, i) => (
                      <li key={i}>
                        {item.productItem?.product?.name ?? 'Товар'}
                        {item.quantity ? ` × ${item.quantity}` : ''}
                      </li>
                    ))}
                    {items.length > 4 && (
                      <li className="text-gray-400">и ещё {items.length - 4}</li>
                    )}
                  </ul>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-500">Сумма</span>
                  <span className="font-bold text-lg">
                    {order.totalAmount} ₽
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};