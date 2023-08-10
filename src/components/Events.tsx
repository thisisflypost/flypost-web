import { EventCard, type Event } from "./EventCard";

export function Events({ events }: { events: Event[] }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard event={event} />
      ))}
    </div>
  );
}
