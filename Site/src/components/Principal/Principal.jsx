import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { menu } from "../../utils/constants";
import PermissionsList from "../Permissions/PermissionsList";
import PermissionTypesList from "../Permissions/PermissionTypesList";

const Principal = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    title: "TIPOS DE PERMISO",
    itemKey: menu.PERMISSION_TYPES_LIST,
  });

  const Options = [
    {
      itemKey: menu.PERMISSION_TYPES_LIST,
      icon: <ListAltIcon />,
      title: "TIPOS DE PERMISO",
      name: "Tipos de permiso",
    },
    {
      itemKey: menu.PERMISSIONS_LIST,
      icon: <ListAltIcon />,
      title: "PERMISOS",
      name: "Permisos",
    },
  ];

  const DrawerMenu = () => {
    return (
      <Box>
        <List>
          {Options.map((option) => {
            return (
              <ListItem key={option.itemKey}>
                <ListItemButton
                  selected={selectedOption.itemKey == option.itemKey}
                  onClick={() => {
                    setOpen(!open);
                    setSelectedOption({
                      title: option.title,
                      itemKey: option.itemKey,
                    });
                  }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">{option.name}</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#F6E9B2",
      }}
    >
      <AppBar
        position="relative"
        sx={{
          left: 380,
          marginTop: 3,
          paddingTop: 2,
          backgroundColor: "#F0DD92",
          width: "75%",
          height: 100,
        }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            color={"#0A6847"}
            sx={{ flexGrow: 1, marginTop: 1 }}
          >
            {selectedOption.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          justifyContent: "center",
          marginTop: 2,
          position: "absolute",
          left: 380,
          display: "block",
          width: "75%",
        }}
      >
        {selectedOption.itemKey == menu.PERMISSIONS_LIST ? (
          <PermissionsList />
        ) : null}
        {selectedOption.itemKey == menu.PERMISSION_TYPES_LIST ? (
          <PermissionTypesList />
        ) : null}
      </Box>
      <Drawer variant={"permanent"} anchor="left">
        <Box
          sx={{
            width: 360,
            height: "100%",
            backgroundColor: "#F0DD92",
          }}
        >
          <DrawerMenu />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Principal;
