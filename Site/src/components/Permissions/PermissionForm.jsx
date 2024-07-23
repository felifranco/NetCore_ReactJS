import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { createPermission, putPermissionById } from "../../store/Permissions";

const PermissionForm = () => {
  const current = useSelector((state) => state.permission.current);

  const dispatch = useDispatch();

  const [permission, setPermission] = useState({
    event: "new",
    id: -1,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermisoId: "",
    fechaPermiso: "",
  });

  useEffect(() => {
    setPermission(current);
  }, []);

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }} align="center">
        Permiso
      </Typography>
      <Stack spacing={2} alignItems={"center"} paddingTop={4}>
        <TextField
          id="nombreEmpleado"
          label="Nombre empleado"
          variant="outlined"
          value={permission.nombreEmpleado}
          onChange={(e) => {
            setPermission({ ...permission, nombreEmpleado: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="apellidoEmpleado"
          label="Apellido empleado"
          variant="outlined"
          value={permission.apellidoEmpleado}
          onChange={(e) => {
            setPermission({ ...permission, apellidoEmpleado: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="tipoPermisoId"
          label="ID Tipo de permiso"
          variant="outlined"
          value={permission.tipoPermisoId}
          onChange={(e) => {
            setPermission({ ...permission, tipoPermisoId: e.target.value });
          }}
          sx={{ width: 400 }}
        />
        <TextField
          id="fechaPermiso"
          label="Fecha de permiso"
          variant="outlined"
          value={permission.fechaPermiso}
          onChange={(e) => {
            setPermission({
              ...permission,
              fechaPermiso: e.target.value,
            });
          }}
          sx={{ width: 400 }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={
            permission.nombreEmpleado.trim() == "" ||
            permission.apellidoEmpleado.trim() == "" ||
            //permission.tipoPermisoId.trim() == "" ||
            permission.fechaPermiso.trim() == ""
          }
          onClick={() => {
            switch (permission.event) {
              case "new":
                dispatch(
                  createPermission({
                    nombreEmpleado: permission.nombreEmpleado,
                    apellidoEmpleado: permission.apellidoEmpleado,
                    tipoPermisoId: permission.tipoPermisoId,
                    fechaPermiso: permission.fechaPermiso,
                  })
                );
                break;
              case "edit":
                dispatch(
                  putPermissionById({
                    id: permission.id,
                    nombreEmpleado: permission.nombreEmpleado,
                    apellidoEmpleado: permission.apellidoEmpleado,
                    tipoPermisoId: permission.tipoPermisoId,
                    fechaPermiso: permission.fechaPermiso,
                  })
                );
                break;

              default:
                break;
            }
          }}
        >
          {permission.event == "new" ? "CREAR" : "MODIFICAR"}
        </Button>
      </Stack>
    </Box>
  );
};

export default PermissionForm;
