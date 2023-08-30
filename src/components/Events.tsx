import { EventCard, type Event } from "./EventCard";

export function Events({ events }: { events: Event[] }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard key={`${event.publisher}${event.title}`} event={event} />
      ))}
    </div>
  );
}
