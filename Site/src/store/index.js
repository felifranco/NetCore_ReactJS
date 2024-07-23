import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./Alert";
import permissionReducer from "./Permissions";
import permissionTypeReducer from "./PermissionTypes";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    permission: permissionReducer,
    permissionType: permissionTypeReducer,
  },
});
