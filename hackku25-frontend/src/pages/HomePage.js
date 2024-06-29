import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Container, Title, Text, Paper } from "@mantine/core";

const Home = () => {
  const { fetchUserData, user } = useUser();

  useEffect(() => {
    if (user && user.token) {
      fetchUserData().catch((err) => {
        console.error("Failed to fetch user data:", err);
      });
    }
  }, []);

  return (
    <Container size="xs" my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title align="center" mb="lg">
          myHackKU Portal
        </Title>

        {user ? (
          <Text align="center">Hi, {user?.username}!</Text>
        ) : (
          <Text align="center">Please sign in to access the portal.</Text>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
