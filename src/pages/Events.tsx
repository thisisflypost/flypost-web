import { useEffect, useState } from "react";

import { EventCard, type Event } from "../components/EventCard";
import type { StrapiNode } from "../types";

export function Events() {
  const [events, setEvents] = useState<Event[]>();
  useEffect(() => {
    fetch("http://localhost:1337/api/events")
      .then((response) => response.json())
      .then((response) => response.data as StrapiNode<Event>[])
      .then((eventNodes) =>
        setEvents(eventNodes.map((eventNode) => eventNode.attributes))
      );
  }, []);
  console.log({ events });
  return (
    <div>
      {events?.map((event) => (
        <EventCard event={event} />
      ))}
    </div>
  );
}
