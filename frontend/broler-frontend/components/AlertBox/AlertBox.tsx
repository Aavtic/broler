import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// AlertBox.tsx

export default function AlertBox({ open, onOpenChange, func}: { open: boolean, onOpenChange: (open: boolean) => void, func: any}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Start the search?</AlertDialogTitle>
          <AlertDialogDescription>
          Any completed progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {onOpenChange(false); if (func) func('cancel')}}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => { console.log('continue'); onOpenChange(false); if (func) func('continue');}}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
