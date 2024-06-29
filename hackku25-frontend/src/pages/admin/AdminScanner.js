import React, { useState, useEffect, useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import BASE_URL from "../../config";
import {
  Container,
  Title,
  Select,
  Text,
  Paper,
  Alert,
  Center,
  Autocomplete,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const AdminScanner = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const selectedEventRef = useRef("");
  const [scanResult, setScanResult] = useState(null);
  const successSoundRef = useRef(null);
  const errorSoundRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/events`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user && user.token) {
      fetchEvents();
    }
  }, [user]);

  useEffect(() => {
    selectedEventRef.current = selectedEvent;
  }, [selectedEvent]);

  const handleScan = async (result) => {
    if (result) {
      const decodedText = result[0].rawValue;
      console.log("Decoded text:", decodedText);
      setScanResult(decodedText);
      if (decodedText && selectedEventRef.current) {
        try {
          await axios.post(
            `${BASE_URL}/admin/checkins`,
            {
              user_id: parseInt(decodedText),
              event_id: parseInt(selectedEventRef.current),
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          console.log("Check-in successful for user ID:", decodedText);

          setErrorMessage("");
          if (successSoundRef.current) {
            successSoundRef.current.play();
          }
        } catch (error) {
          console.error("Check-in error:", error);
          if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data.detail);
          }
          if (errorSoundRef.current) {
            errorSoundRef.current.play();
          }
        }
      } else {
        console.log("No data or event selected.");
      }
    }
  };

  const handleEventChange = (value) => {
    setSelectedEvent(value);
    console.log("Event selected:", value);
  };

  useEffect(() => {
    console.log("Selected event state updated:", selectedEvent);
  }, [selectedEvent]);

  return (
    <Container size="sm" my={40}>
      <Title align="center" mb="lg">
        Admin Scanner
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Autocomplete
          label="Select Event"
          placeholder="Select an event"
          data={events.map((event) => ({
            value: event.id.toString(),
            label: event.name,
          }))}
          value={selectedEvent}
          onChange={handleEventChange}
          mb="lg"
        />
        <Center mb="lg">
          <Scanner onScan={handleScan} />
        </Center>
        {scanResult && (
          <Text align="center" mt="md">
            Scanned User ID: {scanResult}
          </Text>
        )}
        {errorMessage && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            mt="md"
          >
            {errorMessage}
          </Alert>
        )}
        <audio ref={successSoundRef} src="/sounds/success.mp3" preload="auto" />
        <audio ref={errorSoundRef} src="/sounds/error.mp3" preload="auto" />
      </Paper>
    </Container>
  );
};

export default AdminScanner;
