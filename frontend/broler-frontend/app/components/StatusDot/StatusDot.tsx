export default function StatusDot({ color }: { color: "green" | "yellow" }) {
  const colorClass = color === "green" ? "bg-green-500" : "bg-yellow-400";
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colorClass} mr-2`}
      style={{ verticalAlign: "middle" }}
      aria-label={color === "green" ? "Active" : "Warning"}
    />
  );
}
