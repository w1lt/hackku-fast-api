import { Anchor, LoadingOverlay, Text } from "@mantine/core";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

const PopupAuth = ({ onSuccess, initialAuth }) => {
  const [authType, setAuthType] = useState(initialAuth);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <LoadingOverlay visible={loading} loaderProps={{ type: "dots" }} />
      {authType === "login" ? (
        <Login onSuccess={onSuccess} setLoading={setLoading} />
      ) : (
        <Register onSuccess={onSuccess} setLoading={setLoading} />
      )}
      <Text
        align="center"
        mt="md"
        style={{
          color: "grey",
        }}
      >
        {authType === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <Anchor
          onClick={() =>
            setAuthType(authType === "login" ? "register" : "login")
          }
        >
          {authType === "login" ? "Register" : "Log In"}
        </Anchor>
      </Text>
    </>
  );
};

export default PopupAuth;
