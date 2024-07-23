import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "permission";

const initialState = {
  isLoading: false,
  isError: false,
  reloadList: false,
  created: false,
  isAddingPermission: false,
  current: {
    event: "new",
    id: -1,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermisoId: "",
    fechaPermiso: "",
  },
  list: [],
};

export const createPermission = createAsyncThunk(
  "createPermission",
  async ({ nombreEmpleado, apellidoEmpleado, tipoPermisoId, fechaPermiso }) => {
    const res = await axios.post(
      `${configurations.WEB_API}/${endpoint}`,
      JSON.stringify({
        nombreEmpleado: nombreEmpleado,
        apellidoEmpleado: apellidoEmpleado,
        tipoPermisoId: tipoPermisoId,
        fechaPermiso: fechaPermiso,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res?.data;
  }
);

export const getPermissions = createAsyncThunk("getPermissions", async () => {
  const res = await axios.get(`${configurations.WEB_API}/${endpoint}`);
  return res?.data;
});

export const getPermissionById = createAsyncThunk(
  "getPermissionById",
  async (id) => {
    const res = await axios.get(`${configurations.WEB_API}/${endpoint}/${id}`);
    return res?.data;
  }
);

export const putPermissionById = createAsyncThunk(
  "putPermissionById",
  async ({
    id,
    nombreEmpleado,
    apellidoEmpleado,
    tipoPermisoId,
    fechaPermiso,
  }) => {
    const res = await axios.put(
      `${configurations.WEB_API}/${endpoint}/${id}`,
      JSON.stringify({
        id: id,
        nombreEmpleado: nombreEmpleado,
        apellidoEmpleado: apellidoEmpleado,
        tipoPermisoId: tipoPermisoId,
        fechaPermiso: fechaPermiso,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res?.data;
  }
);

export const deletePermissionById = createAsyncThunk(
  "deletePermissionById",
  async (id) => {
    const res = await axios.delete(
      `${configurations.WEB_API}/${endpoint}/${id}`
    );

    return res?.data;
  }
);

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    addPermission: (state) => {
      state.isAddingPermission = true;
    },
    editPermission: (state, action) => {
      state.isAddingPermission = true;
      state.current = {
        event: "edit",
        id: action.payload.id,
        nombreEmpleado: action.payload.nombreEmpleado,
        apellidoEmpleado: action.payload.apellidoEmpleado,
        tipoPermisoId: action.payload.tipoPermisoId,
        fechaPermiso: action.payload.fechaPermiso,
      };
    },
    cancelAddPermission: (state) => {
      state.isAddingPermission = false;
      state.current = {
        event: "new",
        id: -1,
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermisoId: "",
        fechaPermiso: "",
      };
    },
  },
  extraReducers: (builder) => {
    //ADD PERMISSION
    builder.addCase(createPermission.pending, (state, action) => {
      state.isLoading = true;
      state.created = false;
    });
    builder.addCase(createPermission.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingPermission = false;
      state.created = true;
    });
    builder.addCase(createPermission.rejected, (state, action) => {
      state.isLoading = false;
      state.created = false;
      state.isError = true;
    });

    //ALL PERMISSIONS
    builder.addCase(getPermissions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPermissions.fulfilled, (state, action) => {
      state.isLoading = false;
      //if (action.payload.valid) {
      //  state.list = action.payload.data;
      //}
      state.list = action.payload;
      state.reloadList = false;
    });
    builder.addCase(getPermissions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PERMISSIONS BY ID
    builder.addCase(getPermissionById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPermissionById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = action.payload;
    });
    builder.addCase(getPermissionById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PUT PERMISSION BY ID
    builder.addCase(putPermissionById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putPermissionById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingPermission = false;
      state.current = {
        event: "new",
        id: -1,
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermisoId: "",
        fechaPermiso: "",
      };
    });
    builder.addCase(putPermissionById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.reloadList = true;
      state.isAddingPermission = false;
      state.current = {
        event: "new",
        id: -1,
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermisoId: "",
        fechaPermiso: "",
      };
    });

    //DELETE PERMISSION BY ID
    builder.addCase(deletePermissionById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletePermissionById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
    });
    builder.addCase(deletePermissionById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.reloadList = true;
    });
  },
});

export const { addPermission, editPermission, cancelAddPermission } =
  permissionSlice.actions;

export default permissionSlice.reducer;
