import { EventCard, type Event } from "./EventCard";

export function Events({ events }: { events: Event[] }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={`${event.organizers.map((organizer) => organizer.title).join()}${
            event.title
          }`}
          event={event}
        />
      ))}
    </div>
  );
}
