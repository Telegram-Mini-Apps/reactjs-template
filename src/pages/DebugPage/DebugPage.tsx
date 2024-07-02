import {FC, useMemo, useState} from 'react';
import { useSession } from '@/hooks';
import {DisplayData, DisplayDataRow} from "@/components/DisplayData/DisplayData.tsx";
import {useInitData, useLaunchParams, User} from "@tma.js/sdk-react";
import {List, Placeholder} from "@telegram-apps/telegram-ui";
import {URL_GRAPHQL} from "@/config.ts";
import {AccessTokenParams, LOGIN_WITH_ACCESS_TOKEN} from "@/providers";
import {useMutation} from "@apollo/client";
import {transformInitData} from "@/utils";


function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photoUrl },
    { title: 'last_name', value: user.lastName },
    { title: 'first_name', value: user.firstName },
    { title: 'is_bot', value: user.isBot },
    { title: 'is_premium', value: user.isPremium },
    { title: 'language_code', value: user.languageCode },
    { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
    { title: 'added_to_attachment_menu', value: user.addedToAttachmentMenu },
  ];
}

const DebugPage: FC = () => {
  const { sessionToken, error } = useSession();
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const [request] = useMutation(LOGIN_WITH_ACCESS_TOKEN);
  const [errorAPI, setError] = useState('')

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: authDate.toLocaleString() },
      { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: canSendAfterDate?.toISOString() },
      { title: 'can_send_after (raw)', value: canSendAfter },
      { title: 'query_id', value: queryId },
      { title: 'start_param', value: startParam },
      { title: 'chat_type', value: chatType },
      { title: 'chat_instance', value: chatInstance },
    ];
  }, [initData, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.receiver ? getUserRows(initData.receiver) : undefined;
  }, [initData]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photoUrl } = initData.chat;

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photoUrl },
    ];
  }, [initData]);
  const transformedAuthDate = initData?.authDate ? Math.floor(initData.authDate.getTime() / 1000) : 0;

  const data: AccessTokenParams = {
    auth_date: transformedAuthDate,
    checkDataString: (initDataRaw && transformInitData(initDataRaw)) ?? '',
    hash: initData?.hash ?? '',
    query_id: initData?.queryId ?? '',
    user: {
      id: initData?.user?.id || 0,
      first_name: initData?.user?.firstName || '',
      last_name: initData?.user?.lastName || '',
      username: initData?.user?.username || '',
      language_code: initData?.user?.languageCode || '',
      allows_write_to_pm: initData?.user?.allowsWriteToPm || false,
    },
  };

  const handleRequest = async (webAppData: AccessTokenParams) => {

    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      return;
    }

    if (sessionToken) {
      localStorage.setItem('access_token', sessionToken);
      return;
    }

    try {
      const response = await request({
        variables: {
          webAppData,
        },
      });

      if (!response.data) {
        throw new Error('Failed load session data');
      }

      localStorage.setItem('access_token', response.data.telegramUserLogin.access_token);
    } catch (error) {
      // const errorMessage = isGraphqlError(error, 'FULL_MAINTENANCE') ?? (error as unknown as Error).message;
      setError(JSON.stringify(error, null, 2));
    }
  };


  if (!initDataRows) {
    return (
      <Placeholder
        header="Oops"
        description="Application was launched with missing init data"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    )
  }

  return (
    <>
      <button onClick={() => handleRequest(data)}>Click</button>
      <h1>Debug page</h1>
      <p>TOKEN: {sessionToken}</p>
      <p>TOKEN error: {error}</p>
      <p>TOKEN errorAPI: {errorAPI}</p>
      <p>WEB APP DATA: {JSON.stringify(data, null, 2)}</p>
      <p>URL: {URL_GRAPHQL}</p>

      <List>
        <DisplayData header={'Init Data'} rows={initDataRows}/>
        {userRows && <DisplayData header={'User'} rows={userRows}/>}
        {receiverRows && <DisplayData header={'Receiver'} rows={receiverRows}/>}
        {chatRows && <DisplayData header={'Chat'} rows={chatRows}/>}
      </List>
    </>
  );
};

export default DebugPage;
