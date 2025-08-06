'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import AlertBox from '@/components/AlertBox/AlertBox'

import { useState } from 'react';

interface InputWithButtonProps {
    on_change: any,
    func: any,
}

export function InputWithButton({ on_change, func}: InputWithButtonProps ) {
    const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="url" placeholder="URL" onChange={on_change}/>
      <Button type="submit" variant="outline" onClick={() => {setOpen(true)}}>
      Start
      </Button>
      <AlertBox open={open} onOpenChange={setOpen} func={func}/>
    </div>
  )
}
