import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="url" placeholder="URL" />
      <Button type="submit" variant="outline">
      Start
      </Button>
    </div>
  )
}
