interface Organizer {
  id: number;
  title: string;
}

export interface Event {
  title: string;
  startTime: string;
  endTime: string;
  organizers: Organizer[];
}

const dateFormatter = new Intl.DateTimeFormat("en-IE", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

export function EventCard({ event }: { event: Event }) {
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        padding: 20,
      }}
    >
      <h1>{event.title}</h1>
      <h2>
        {event.organizers.map((organizer) => (
          <a href={`/organizers/${organizer.id}`}>{organizer.title}</a>
        ))}
      </h2>
      <h2>
        {dateFormatter.format(new Date(event.startTime))} -{" "}
        {dateFormatter.format(new Date(event.endTime))}
      </h2>
    </div>
  );
}
