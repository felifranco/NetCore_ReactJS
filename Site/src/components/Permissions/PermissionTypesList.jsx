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
  addPermissionType,
  editPermissionType,
  cancelAddPermissionType,
  deletePermissionTypeById,
  getPermissionsTypes,
} from "../../store/PermissionTypes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomModal from "../Common/CustomModal";
import PermissionTypeForm from "./PermissionTypeForm";

const PermissionTypesList = () => {
  const reloadList = useSelector((state) => state.permissionType.reloadList);
  const isAddingPermissionType = useSelector(
    (state) => state.permissionType.isAddingPermissionType
  );
  const list = useSelector((state) => state.permissionType.list);

  const dispatch = useDispatch();

  const handleClickShowEdit = (permissionType) => {
    dispatch(editPermissionType(permissionType));
  };

  const handleClickDelete = (id) => {
    dispatch(deletePermissionTypeById(id));
  };

  useEffect(() => {
    dispatch(getPermissionsTypes());
  }, []);

  useEffect(() => {
    if (reloadList) {
      dispatch(getPermissionsTypes());
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
            dispatch(addPermissionType());
          }}
        >
          AGREGAR TIPO DE PERMISO
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}>ID</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Descripción</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={"bold"}>Acción</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((permissionType) => {
                return (
                  <TableRow key={permissionType.id}>
                    <TableCell>{permissionType.id}</TableCell>
                    <TableCell align="center">{permissionType.descripcion}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleClickShowEdit(permissionType);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleClickDelete(permissionType.id);
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
        open={isAddingPermissionType}
        component={<PermissionTypeForm />}
        handleClose={() => {
          dispatch(cancelAddPermissionType());
        }}
      />
    </Box>
  );
};

export default PermissionTypesList;
