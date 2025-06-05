import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Button, Title } from '@telegram-apps/telegram-ui'; // убрал Group
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const launchParams = useLaunchParams();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (launchParams?.user?.id) {
      navigate('/home');
    } else {
      alert('Ошибка: данные Telegram не получены');
    }
  };

  return (
    <div>
      <Title level={1}>Добро пожаловать!</Title>
      <p>Для начала нажмите кнопку ниже</p>
      <Button onClick={handleLogin} size="l" mode="primary">
        Войти через Telegram
      </Button>
    </div>
  );
}
