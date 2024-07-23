import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box, Stack, Alert } from "@mui/material";
import Principal from "./components/Principal/Principal";
import { cleanMessage } from "./store/Alert";

const App = () => {
  const message = useSelector((state) => state.alert.message);
  const showMessage = useSelector((state) => state.alert.showMessage);
  const isError = useSelector((state) => state.alert.isError);

  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Principal />,
    },
  ]);

  const Message = () => {
    return showMessage ? (
      <Alert
        severity={isError ? "error" : "success"}
        variant="filled"
        sx={{ position: "absolute", right: 50, bottom: 50 }}
      >
        {message}
      </Alert>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (showMessage) {
        dispatch(cleanMessage());
      }
    }, 3000);
  }, [showMessage]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Stack alignItems={"center"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            width: "100%",
          }}
        >
          <RouterProvider router={router} />
        </Box>
        <Message />
      </Stack>
    </Box>
  );
};

export default App;
