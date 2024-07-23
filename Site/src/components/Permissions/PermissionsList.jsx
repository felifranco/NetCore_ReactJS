import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  addPermission,
  editPermission,
  cancelAddPermission,
  deletePermissionById,
  getPermissions,
} from "../../store/Permissions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomModal from "../Common/CustomModal";
import PermissionForm from "./PermissionForm";

const PermissionsList = () => {
  const reloadList = useSelector((state) => state.permission.reloadList);
  const isAddingPermission = useSelector(
    (state) => state.permission.isAddingPermission
  );
  const list = useSelector((state) => state.permission.list);

  const dispatch = useDispatch();

  const handleClickShowEdit = (permission) => {
    dispatch(editPermission(permission));
  };

  const handleClickDelete = (id) => {
    dispatch(deletePermissionById(id));
  };

  useEffect(() => {
    dispatch(getPermissions());
  }, []);

  useEffect(() => {
    if (reloadList) {
      dispatch(getPermissions());
    }
  }, [reloadList]);

  return (
    <Box>
      <Stack spacing={3} sx={{ marginTop: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#0A6847" }}
          endIcon={<CheckCircleIcon />}
          onClick={() => {
            dispatch(addPermission());
          }}
        >
          AGREGAR PERMISO
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}>Nombre empleado</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Apellido empleado</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Tipo de permiso</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Fecha de permiso</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Acción</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((permission) => {
                return (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.nombreEmpleado}</TableCell>
                    <TableCell align="center">
                      {permission.apellidoEmpleado}
                    </TableCell>
                    <TableCell align="center">
                      {permission.tipoPermisoId}
                    </TableCell>
                    <TableCell align="center">
                      {permission.fechaPermiso}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleClickShowEdit(permission);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleClickDelete(permission.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <CustomModal
        open={isAddingPermission}
        component={<PermissionForm />}
        handleClose={() => {
          dispatch(cancelAddPermission());
        }}
      />
    </Box>
  );
};

export default PermissionsList;
