import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}
