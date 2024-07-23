import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import {
  createPermissionType,
  putPermissionTypeById,
} from "../../store/PermissionTypes";

const PermissionTypeForm = () => {
  const current = useSelector((state) => state.permissionType.current);

  const dispatch = useDispatch();

  const [permissionType, setPermissionType] = useState({
    event: "new",
    id: -1,
    descripcion: "",
  });

  useEffect(() => {
    setPermissionType(current);
  }, []);

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }} align="center">
        Tipo de permiso
      </Typography>
      <Stack spacing={2} alignItems={"center"} paddingTop={4}>
        <TextField
          id="descripcion"
          label="Descripción"
          variant="outlined"
          value={permissionType.descripcion}
          onChange={(e) => {
            setPermissionType({
              ...permissionType,
              descripcion: e.target.value,
            });
          }}
          sx={{ width: 400 }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={permissionType.descripcion.trim() == ""}
          onClick={() => {
            switch (permissionType.event) {
              case "new":
                dispatch(
                  createPermissionType({
                    descripcion: permissionType.descripcion,
                  })
                );
                break;
              case "edit":
                dispatch(
                  putPermissionTypeById({
                    id: permissionType.id,
                    descripcion: permissionType.descripcion,
                  })
                );
                break;

              default:
                break;
            }
          }}
        >
          {permissionType.event == "new" ? "CREAR" : "MODIFICAR"}
        </Button>
      </Stack>
    </Box>
  );
};

export default PermissionTypeForm;
