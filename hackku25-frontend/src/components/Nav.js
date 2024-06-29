import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  Container,
  Group,
  Anchor,
  Modal,
  Divider,
  Menu,
  Button,
  rem,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PopupAuth from "./PopupAuth";
import ColorToggle from "./ColorToggle";
import {
  IconSettings,
  IconLogout,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import logout from "../utils/logout"; // Import the logout function

const Nav = () => {
  const { user, setUser, loading } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [authType, setAuthType] = useState("login"); // Add authType state

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(setUser, navigate);
  };

  const openLoginModal = () => {
    setAuthType("login");
    open();
  };

  const openRegisterModal = () => {
    setAuthType("register");
    open();
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Group>
            <Anchor
              style={{
                fontWeight: 700,
              }}
              component={Link}
              to="/"
              size="lg"
            >
              HackKU25
            </Anchor>
          </Group>

          <Group>
            <Menu shadow="md" width={200} trigger="click-hover">
              <Menu.Target>
                <Button variant="subtle">Profile</Button>
              </Menu.Target>

              {user ? (
                <Menu.Dropdown>
                  <Menu.Label>My Account</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconUser style={{ width: rem(14), height: rem(14) }} />
                    }
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </Menu.Item>
                  {user.role === "admin" && (
                    <Menu.Item
                      leftSection={
                        <IconSettings
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      component={Link}
                      to="/admin"
                    >
                      Admin Panel
                    </Menu.Item>
                  )}
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              ) : (
                <Menu.Dropdown>
                  <Menu.Label>Not Logged in</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconUser style={{ width: rem(14), height: rem(14) }} />
                    }
                    onClick={openLoginModal} // Change to openLoginModal
                  >
                    Login
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconUserPlus
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={openRegisterModal} // Change to openRegisterModal
                  >
                    Register
                  </Menu.Item>
                </Menu.Dropdown>
              )}
            </Menu>
            <Tooltip label="Toggle Theme" withArrow>
              <div>
                <ColorToggle />
              </div>
            </Tooltip>
          </Group>
        </Group>
      </Container>
      <Divider />
      <Modal
        size={"sm"}
        opened={opened}
        onClose={close}
        transitionProps={{
          transition: "pop",
        }}
      >
        <Container size="sm">
          <PopupAuth onSuccess={close} initialAuth={authType} />{" "}
        </Container>
      </Modal>
    </>
  );
};

export default Nav;
