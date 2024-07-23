import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  showMessage: false,
  isError: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.isError = action.payload.error;
      state.showMessage = true;
    },
    cleanMessage: (state) => {
      state.message = "";
      state.showMessage = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    //ADD PRODUCT
    /*builder.addMatcher(isAnyOf(createProduct.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(createProduct.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //BULK INSERT PRODUCTS
    builder.addMatcher(isAnyOf(bulkInsert.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(bulkInsert.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //PATCH PRODUCT BY ID
    builder.addMatcher(isAnyOf(patchProductById.fulfilled), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    builder.addMatcher(isAnyOf(patchProductById.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });

    //DELETE PRODUCT BY ID
    builder.addMatcher(
      isAnyOf(deleteProductById.fulfilled),
      (state, action) => {
        state.showMessage = action.payload.message ? true : false;
        state.message = action.payload.message;
        state.isError = !action.payload.valid;
      }
    );

    builder.addMatcher(isAnyOf(deleteProductById.rejected), (state, action) => {
      state.showMessage = action.payload.message ? true : false;
      state.message = action.payload.message;
      state.isError = !action.payload.valid;
    });*/
  },
});

export const { setMessage, cleanMessage } = alertSlice.actions;

export default alertSlice.reducer;
