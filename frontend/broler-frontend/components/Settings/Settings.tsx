import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckboxSetting, CheckboxProps } from "./CheckBoxSettings"

import { useState } from 'react'



export default function Settings( props : CheckboxProps ) {

  const [duponlyCurrentDomain, dupsetDomain] = useState<boolean>(props.currentDomain)
  const [dupJSearch, dupsetJS] = useState<boolean>(props.jsSearch)
  const [dupCSSearch, dupsetCSS] = useState<boolean>(props.cssSearch)
    
  return (
    <Dialog
        onOpenChange={(open) => {
            if (open) {
                // When dialog opens, reset local state from parent
                dupsetDomain(props.currentDomain);
                dupsetJS(props.jsSearch);
                dupsetCSS(props.cssSearch);
            }
        }}
    >
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Settings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Customize Search</DialogTitle>
            <DialogDescription>
                Make changes on how to search through your domain
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
                <CheckboxSetting 
                    currentDomain={duponlyCurrentDomain}
                    jsSearch={dupJSearch}
                    cssSearch={dupCSSearch}
                    onlyCurrentDomain={dupsetDomain}
                    setJSearch={dupsetJS}
                    setCSSearch={dupsetCSS}
                />
              {/* <Label htmlFor="name-1">Name</Label> */}
              {/* <Input id="name-1" name="name" defaultValue="Pedro Duarte" /> */}
              
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ignore-url">Ignore url from search</Label>
              <Input id="ignore-url-id" name="url-name" defaultValue="" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="ignore-domain">Ignore domain from search</Label>
              <Input id="ignore-domain-id" name="domain" defaultValue="" />
            </div>
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => {
                props.onlyCurrentDomain(duponlyCurrentDomain);
                props.setJSearch(dupJSearch);
                props.setCSSearch(dupCSSearch);
            }}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
