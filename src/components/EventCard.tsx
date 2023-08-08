export interface Event {
  title: string;
  startTime: string;
  endTime: string;
}

export function EventCard({ event }: { event: Event }) {
  return (
    <div>
      <strong>{event.title}</strong>
    </div>
  );
}
