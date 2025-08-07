'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import AlertBox from '@/components/AlertBox/AlertBox'

import { useState } from 'react';

import { ShineBorder } from '@/components/magicui/shine-border'

interface InputWithButtonProps {
    on_change: any,
    func: any,
}

export function InputWithButton({ on_change, func}: InputWithButtonProps ) {
    const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
    <div className="relative rounded-md">
    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} duration={15}/>
      <Input className="w-[300px]" type="url" placeholder="URL" onChange={on_change}/>
    </div>
    <div className="relative rounded-md">
          <ShineBorder shineColor={["#eb2d66", "#5f3be3", "#FFBE7B"]} duration={15}/>
          <Button type="submit" variant="outline" onClick={() => {setOpen(true)}}>
          Start
          </Button>
    </div>
      <AlertBox open={open} onOpenChange={setOpen} func={func}/>
    </div>
  )
}
