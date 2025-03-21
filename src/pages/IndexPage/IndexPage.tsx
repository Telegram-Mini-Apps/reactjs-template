import { Section, Cell, Image, List, Button, Input } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import React, { useState } from 'react';


import { Page } from '@/components/Page.tsx';
import { openLink } from '@telegram-apps/sdk';
import { init } from '@telegram-apps/sdk';


import folderSvg from './folder.svg';
import documentSvg from './document.svg'

interface Folder {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  url: string;
}

export const IndexPage: FC = () => {
  init()
  const [folders, setFolders] = useState<Folder[]>([ // State variable for folders
  ]);
  const [articles, setArticles] = useState<{ [folderId: string]: Article[] }>({ // State variable for articles
  });
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleUrl, setNewArticleUrl] = useState('');
  const [newFolderName, setNewFolderName] = useState('');


  const handleCreateFolder = () => {
    const newFolder = { id: `folder${folders.length + 1}`, name: newFolderName };
    setFolders([...folders, newFolder]);
    setArticles({ ...articles, [newFolder.id]: [] }); // Initialize articles for the new folder
    setNewFolderName('');
  };

  // const handleRenameFolder = (id: string, newName: string) => { // Handler for renaming folders
  //   const updatedFolders = folders.map((folder) =>
  //     folder.id === id ? { ...folder, name: newName } : folder
  //   );
  //   setFolders(updatedFolders);
  // };

  // const handleDeleteFolder = (id: string) => { // Handler for deleting folders
  //   const updatedFolders = folders.filter((folder) => folder.id !== id);
  //   setFolders(updatedFolders);
  //   const newArticles = { ...articles };
  //   delete newArticles[id];
  //   setArticles(newArticles);
  // };


  const handleCreateArticle = (folderId: string) => {
    console.log("handle create article")
    console.log(folderId)
    const newArticle = { id: `article${articles[folderId]?.length + 1}`, title: newArticleTitle, url: newArticleUrl };
    setArticles({
      ...articles,
      [folderId]: [...(articles[folderId] || []), newArticle],
    });
    setNewArticleTitle('');
    setNewArticleUrl('');
  };

  // const handleRenameArticle = (folderId: string, articleId: string, newTitle: string) => { // Handler for renaming articles
  //   const updatedArticles = {
  //     ...articles,
  //     [folderId]: articles[folderId].map((article) =>
  //       article.id === articleId ? { ...article, title: newTitle } : article
  //     ),
  //   };
  //   setArticles(updatedArticles);
  // };

  // const handleDeleteArticle = (folderId: string, articleId: string) => { // Handler for deleting articles
  //   const updatedArticles = {
  //     ...articles,
  //     [folderId]: articles[folderId].filter((article) => article.id !== articleId),
  //   };
  //   setArticles(updatedArticles);
  // };

  const openWebLink = (url: string) => {
    console.log("open link")
    console.log(url)
    openLink(url)
  }

  return (
    <Page back={false}>
      <List>
        <Section header="Folders">
          {folders.map((folder) => (
            <Cell key={folder.id} onClick={() => setSelectedFolder(folder.id)} before={ <Image src={folderSvg} size={28} style={{ backgroundColor: '#007AFF' }} />}>
             
              {folder.name}
            </Cell>
          ))}
          <Input name='foldername' placeholder='New folder name' value={newFolderName} onChange={(e: React.FormEvent<HTMLInputElement>) => setNewFolderName(e.currentTarget.value)} after={<Button  size='m' onClick={handleCreateFolder}>{'Create'}</Button>} />
        </Section>
        {selectedFolder && (
          <Section header="Articles">
            {articles[selectedFolder]?.map((article) => (
              <Cell key={article.id} onClick={() => openWebLink(article.url)} before={ <Image src={documentSvg} size={28} style={{ backgroundColor: '#007AFF' }} />}>
                {article.title}
              </Cell>
            ))}
            <Input name='articlename' placeholder='New article name' value={newArticleTitle} onChange={(e: React.FormEvent<HTMLInputElement>) => setNewArticleTitle(e.currentTarget.value)} />
            <Input name='articleurl' placeholder='New article url' value={newArticleUrl} onChange={(e: React.FormEvent<HTMLInputElement>) => setNewArticleUrl(e.currentTarget.value)} after={<Button size='m' onClick={() => handleCreateArticle(selectedFolder)}>{'Create'}</Button>} />
          </Section>
        )}
      </List>
    </Page>
  );
};
