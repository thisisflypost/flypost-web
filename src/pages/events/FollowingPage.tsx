import { useEffect, useState } from "react";
import { Events } from "../../components/Events";
import axios from "axios";

export function FollowingPage() {
  const [events, setEvents] = useState();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${import.meta.env.PUBLIC_API_PREFIX}users/me/following-events`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => response.data)
        .then((events) => setEvents(events));
    }
  }, []);
  return (
    <>
      <h1>Events from organisations you follow</h1>
      {events && <Events events={events} />}
    </>
  );
}
