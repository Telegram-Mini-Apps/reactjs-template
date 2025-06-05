import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Title } from '@telegram-apps/telegram-ui';

export function HomePage() {
  const launchParams = useLaunchParams();

  return (
    <Group>
      <Title level={2}>Привет, {launchParams?.user?.first_name || 'пользователь'}!</Title>
      <p>Это главный экран твоего приложения.</p>
    </Group>
  );
}
