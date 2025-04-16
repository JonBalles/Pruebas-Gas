import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';

export default function MenuContent() {
  const [sheetNames, setSheetNames] = React.useState([]);

  React.useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfy.../exec') // reemplazá con tu URL
      .then((res) => res.json())
      .then(setSheetNames)
      .catch((err) => console.error('Error al obtener hojas:', err));
  }, []);

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>
        {sheetNames.map((name, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}