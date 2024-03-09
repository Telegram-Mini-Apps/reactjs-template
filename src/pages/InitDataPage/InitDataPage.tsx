import type { Chat, User } from '@tma.js/sdk';
import { useInitData, useInitDataRaw } from '@tma.js/sdk-react';
import type { FC } from 'react';
import { useMemo } from 'react';

import { DataTable } from '../../components/DataTable';
import type { RowProps } from '../../components/DataTable/Row';
import { Page } from '../../components/Page';

function getUserRows(user: User): RowProps[] {
  return [
    { title: 'ID', value: user.id.toString() },
    { title: 'Last name', value: user.lastName },
    { title: 'First name', value: user.firstName },
    { title: 'Is bot', value: user.isBot ? 'yes' : 'no' },
    { title: 'Is premium', value: user.isPremium ? 'yes' : 'no' },
    { title: 'Language code', value: user.languageCode },
  ];
}

function getChatRows(chat: Chat): RowProps[] {
  return [
    { title: 'ID', value: chat.id.toString() },
    { title: 'Title', value: chat.title },
    { title: 'Type', value: chat.type },
    { title: 'Username', value: chat.username },
    { title: 'Photo URL', value: chat.photoUrl },
  ];
}

export const InitDataPage: FC = () => {
  const initData = useInitData();
  const initDataRaw = useInitDataRaw();

  const rows = useMemo<RowProps[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      receiver,
      chatType,
      chat,
      chatInstance,
      user,
      authDate,
      startParam,
      canSendAfterDate,
    } = initData;
    return [
      { title: 'Raw', value: initDataRaw },
      { title: 'Auth date', value: authDate.toLocaleString() },
      { title: 'Hash', value: hash },
      { title: 'Can send after', value: canSendAfterDate ? canSendAfterDate.toISOString() : null },
      { title: 'Query id', value: queryId },
      { title: 'Start param', value: startParam },
      { title: 'Chat type', value: chatType },
      { title: 'Chat instance', value: chatInstance },
      { title: 'Receiver', value: receiver ? getUserRows(receiver) : null },
      { title: 'Chat', value: chat ? getChatRows(chat) : null },
      { title: 'User', value: user ? getUserRows(user) : null },
    ];
  }, [initDataRaw, initData]);

  return (
    <Page title="Init Data">
      {rows
        ? <DataTable rows={rows} />
        : <i>Application was launched with missing init data</i>}
    </Page>
  );
};
