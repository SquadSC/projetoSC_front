import { HomeConfectionerView } from '../view/home-confectioner.view';
import { useUser } from '../../../hooks/use-user/useUser';
import { useFormatWeeklyOrder } from '../utils/format-weekly-order';

export function HomeConfectionerController() {
  const { user } = useUser();

  const {
    weeklyData,
    loading: weeklyLoading,
    error: weeklyError,
  } = useFormatWeeklyOrder();

  return (
    <HomeConfectionerView
      user={user}
      weeklyData={weeklyData}
      loading={weeklyLoading}
      error={weeklyError}
    />
  );
}
