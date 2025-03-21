import React from 'react';

interface FolderItemProps {
  folderId: string;
  folderName: string;
  onRenameFolder: (id: string, newName: string) => void;
  onDeleteFolder: (id: string) => void;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folderId, folderName, onRenameFolder, onDeleteFolder }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #eee' }}>
      <span>{folderName}</span>
      <div>
        <button style={{ marginRight: '8px' }} onClick={() => onRenameFolder(folderId, prompt('New name', folderName) || folderName)}>Rename</button>
        <button onClick={() => onDeleteFolder(folderId)}>Delete</button>
      </div>
    </div>
  );
};
