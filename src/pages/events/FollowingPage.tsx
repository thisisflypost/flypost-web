import { useEffect, useState } from "react";
import { Events } from "../../components/Events";
import axios from "axios";
import qs from "qs";
import { getFollowedPublishers } from "../../utils/localStorage";

export function FollowingPage() {
  const [events, setEvents] = useState();
  useEffect(() => {
    const followedPublishers = getFollowedPublishers();
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          id: {
            $in: followedPublishers,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    axios
      .get(`${import.meta.env.PUBLIC_API_BASE_URL}users?${query}`)
      .then((response) =>
        response.data.flatMap((publisherNode: any) => {
          return publisherNode.events.map((eventNode: any) => ({
            ...eventNode,
            publisher: {
              id: publisherNode.id,
              username: publisherNode.username,
            },
          }));
        })
      )
      .then((events) => setEvents(events));
  }, []);

  return (
    <>
      <h1>Events from organisations you follow</h1>
      {events && <Events events={events} />}
    </>
  );
}
