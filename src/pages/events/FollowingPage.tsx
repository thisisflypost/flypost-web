import { useEffect, useState } from "react";
import { Events } from "../../components/Events";
import axios from "axios";
import qs from "qs";
import { getFollowedOrganizers } from "../../utils/localStorage";

export function FollowingPage() {
  const [events, setEvents] = useState();
  useEffect(() => {
    const followedOrganizers = getFollowedOrganizers();
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          id: {
            $in: followedOrganizers,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    axios
      .get(`${import.meta.env.PUBLIC_API_BASE_URL}organizers?${query}`)
      .then((response) =>
        response.data.data.flatMap((organizerNode: any) => {
          return organizerNode.attributes.events.data.map((eventNode: any) => ({
            ...eventNode.attributes,
            organizers: [
              {
                id: organizerNode.id,
                title: organizerNode.attributes.title,
              },
            ],
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
