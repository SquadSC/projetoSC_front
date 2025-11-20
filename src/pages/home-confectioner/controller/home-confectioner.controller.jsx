import { HomeConfectionerView } from '../view/home-confectioner.view';
import { useUser } from '../../../hooks/use-user/useUser';
import { useFormatWeeklyOrder } from '../utils/format-weekly-order';
import { useNewOrders } from '../hooks/use-get-new-orders';
import { useGetOrderCountDay } from '../hooks/use-get-order-count-day';

export function HomeConfectionerController() {
  const { user } = useUser();

  const {
    weeklyData,
    loading: weeklyLoading,
    error: weeklyError,
  } = useFormatWeeklyOrder();

  const {
    newOrders,
    isLoading: newOrdersLoading,
    error: newOrdersError,
  } = useNewOrders();

  const weeklyOrder = {
    weeklyData,
    weeklyLoading,
    weeklyError,
  };

  const newOrder = {
    newOrders,
    newOrdersLoading,
    newOrdersError,
  };

  return (
    <HomeConfectionerView
      user={user}
      weeklyData={weeklyOrder}
      newOrders={newOrder}
    />
  );
}
