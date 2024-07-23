import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configurations from "../../config/configurations";

const endpoint = "permission-type";

const initialState = {
  isLoading: false,
  isError: false,
  reloadList: false,
  created: false,
  isAddingPermissionType: false,
  current: {
    event: "new",
    id: -1,
    descripcion: "",
  },
  list: [],
};

export const createPermissionType = createAsyncThunk(
  "createPermissionType",
  async ({ descripcion }) => {
    const res = await axios.post(
      `${configurations.WEB_API}/${endpoint}`,
      JSON.stringify({
        descripcion: descripcion,
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

export const getPermissionsTypes = createAsyncThunk(
  "getPermissionsTypes",
  async () => {
    const res = await axios.get(`${configurations.WEB_API}/${endpoint}`);
    return res?.data;
  }
);

export const getPermissionTypesById = createAsyncThunk(
  "getPermissionTypesById",
  async (id) => {
    const res = await axios.get(`${configurations.WEB_API}/${endpoint}/${id}`);
    return res?.data;
  }
);

export const putPermissionTypeById = createAsyncThunk(
  "putPermissionTypeById",
  async ({ id, descripcion }) => {
    const res = await axios.put(
      `${configurations.WEB_API}/${endpoint}/${id}`,
      JSON.stringify({
        id: id,
        descripcion: descripcion,
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

export const deletePermissionTypeById = createAsyncThunk(
  "deletePermissionTypeById",
  async (id) => {
    const res = await axios.delete(
      `${configurations.WEB_API}/${endpoint}/${id}`
    );

    return res?.data;
  }
);

export const permissionTypeSlice = createSlice({
  name: "permissionType",
  initialState,
  reducers: {
    addPermissionType: (state) => {
      state.isAddingPermissionType = true;
    },
    editPermissionType: (state, action) => {
      state.isAddingPermissionType = true;
      state.current = {
        event: "edit",
        id: action.payload.id,
        descripcion: action.payload.descripcion,
      };
    },
    cancelAddPermissionType: (state) => {
      state.isAddingPermissionType = false;
      state.current = {
        event: "new",
        id: -1,
        descripcion: "",
      };
    },
  },
  extraReducers: (builder) => {
    //ADD PERMISSION TYPE
    builder.addCase(createPermissionType.pending, (state, action) => {
      state.isLoading = true;
      state.created = false;
    });
    builder.addCase(createPermissionType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingPermissionType = false;
      state.created = true;
    });
    builder.addCase(createPermissionType.rejected, (state, action) => {
      state.isLoading = false;
      state.created = false;
      state.isError = true;
    });

    //ALL PERMISSION TYPES
    builder.addCase(getPermissionsTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPermissionsTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      /*if (action.payload.valid) {
        state.list = action.payload.data;
      }*/
      state.list = action.payload;
      state.reloadList = false;
    });
    builder.addCase(getPermissionsTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PERMISSION TYPES BY ID
    builder.addCase(getPermissionTypesById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPermissionTypesById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = action.payload;
    });
    builder.addCase(getPermissionTypesById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    //PUT PERMISSION TYPE BY ID
    builder.addCase(putPermissionTypeById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putPermissionTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
      state.isAddingPermissionType = false;
      state.current = {
        event: "new",
        id: -1,
        descripcion: "",
        apellidoEmpleado: "",
        tipoPermisoId: "",
        fechaPermiso: "",
      };
    });
    builder.addCase(putPermissionTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.reloadList = true;
      state.isAddingPermissionType = false;
      state.current = {
        event: "new",
        id: -1,
        descripcion: "",
        apellidoEmpleado: "",
        tipoPermisoId: "",
        fechaPermiso: "",
      };
    });

    //DELETE PERMISSION TYPE BY ID
    builder.addCase(deletePermissionTypeById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletePermissionTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadList = true;
    });
    builder.addCase(deletePermissionTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.reloadList = true;
    });
  },
});

export const {
  addPermissionType,
  editPermissionType,
  cancelAddPermissionType,
} = permissionTypeSlice.actions;

export default permissionTypeSlice.reducer;
