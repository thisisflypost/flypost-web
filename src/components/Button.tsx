export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-sm border border-gray-500 active:bg-gray-500 py-1 px-2 rounded"
      {...props}
    />
  );
}
