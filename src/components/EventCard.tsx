interface Organizer {
  id: number;
  title: string;
}

export interface Event {
  title: string;
  startTime: string;
  endTime: string;
  organizers: Organizer[];
  description: string;
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
    <div>
      <h1 className="text-center font-bold text-lg">{event.title}</h1>
      <h2 className="text-center">
        {event.organizers.map((organizer) => (
          <a className="underline" href={`/organizers/${organizer.id}`}>
            {organizer.title}
          </a>
        ))}
      </h2>
      <h2>
        {dateFormatter.format(new Date(event.startTime))} -{" "}
        {dateFormatter.format(new Date(event.endTime))}
      </h2>
      <p>{event.description}</p>
    </div>
  );
}
