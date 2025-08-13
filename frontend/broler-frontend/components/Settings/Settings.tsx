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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckboxSetting, CheckboxProps } from "./CheckBoxSettings"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { useState } from 'react'


interface SettingsProps {
    checkboxProps: CheckboxProps,
    collapsible_props: {
        allowed_websites: Array<String>,
        setAllowed_websites: React.Dispatch<React.SetStateAction<String[]>>
        disallowed_websites: Array<String>,
        setDisAllowed_websites: React.Dispatch<React.SetStateAction<String[]>>
    }
}

export default function Settings( props: SettingsProps ) {

  const [duponlyCurrentDomain, dupsetDomain] = useState<boolean>(props.checkboxProps.currentDomain)
  const [dupJSearch, dupsetJS] = useState<boolean>(props.checkboxProps.jsSearch)
  const [dupCSSearch, dupsetCSS] = useState<boolean>(props.checkboxProps.cssSearch)

  const [allowedUrl, setAllowedUrl] = useState<String>('');
  const [disAllowedUrl, setDisAllowedUrl] = useState<String>('');
    
  return (
    <Dialog
        onOpenChange={(open) => {
            if (open) {
                // When dialog opens, reset local state from parent
                dupsetDomain(props.checkboxProps.currentDomain);
                dupsetJS(props.checkboxProps.jsSearch);
                dupsetCSS(props.checkboxProps.cssSearch);
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
              
            </div>

            <div className="flex flex-col gap-4">

                <fieldset className="p-4 border rounded-lg bg-muted/30 space-y-3">
                  {/* Label */}
                  <Label className="font-medium text-sm text-primary">
                    Allow to search a URL
                  </Label>

                  {/* Collapsible */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 w-full justify-between"
                      >
                        Allowed URLs
                        <span className="text-xs opacity-70">(Click to expand)</span>
                      </Button>
                    </CollapsibleTrigger>
                    <span className="sr-only">Toggle</span>

                    <CollapsibleContent className="flex flex-col gap-2 mt-2">
                      {props.collapsible_props.allowed_websites.length > 0 ? (
                        props.collapsible_props.allowed_websites.map((val, i) => (
                          <div
                            key={i}
                            className="rounded-md border px-4 py-2 font-mono text-sm bg-background"
                          >
                            {val}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          No URLs added yet.
                        </p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Input + Add Button */}
                  <div className="flex w-full max-w-sm items-center gap-2 pt-1">
                    <Input
                      type="url"
                      placeholder="https://example.com/path"
                      className="flex-1"
                      onChange={(e) => setAllowedUrl(e.target.value)}
                    />
                    <Tooltip>
                    <TooltipTrigger asChild>
                    <Button type="submit" variant="outline" onClick={() => {
                        props.collapsible_props.setAllowed_websites((prev) => {
                            prev.push(allowedUrl)
                            setAllowedUrl('');
                            return prev
                        })
                    }}>
                      Add
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add a URL</p>
                    </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                    <TooltipTrigger asChild>
                    <Button type="button" variant="destructive" onClick={() => {
                        props.collapsible_props.setAllowed_websites([]);
                    }}>
                      
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Clear</p>
                    </TooltipContent>
                    </Tooltip>

                  </div>
                </fieldset>


                <fieldset className="p-4 border rounded-lg bg-muted/30 space-y-3">
                  {/* Label */}
                  <Label className="font-medium text-sm text-primary">
                    Don't search a URL
                  </Label>

                  {/* Collapsible */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 w-full justify-between"
                      >
                        Disallowed URLs
                        <span className="text-xs opacity-70">(Click to expand)</span>
                      </Button>
                    </CollapsibleTrigger>
                    <span className="sr-only">Toggle</span>

                    <CollapsibleContent className="flex flex-col gap-2 mt-2">
                      {props.collapsible_props.disallowed_websites.length > 0 ? (
                        props.collapsible_props.disallowed_websites.map((val, i) => (
                          <div
                            key={i}
                            className="rounded-md border px-4 py-2 font-mono text-sm bg-background"
                          >
                            {val}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          No URLs added yet.
                        </p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Input + Add Button */}
                  <div className="flex w-full max-w-sm items-center gap-2 pt-1">
                    <Input
                      type="url"
                      placeholder="https://example.com/path"
                      className="flex-1"

                      onChange={(e) => setDisAllowedUrl(e.target.value)}
                    />
                    <Tooltip>
                    <TooltipTrigger asChild>
                    <Button type="submit" variant="destructive" onClick={
                        () => props.collapsible_props.setDisAllowed_websites((prev) => {
                            prev.push(disAllowedUrl);
                            setDisAllowedUrl('');
                            return prev;
                        })
                    }>
                      Add
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add a URL</p>
                    </TooltipContent>
                    </Tooltip>


                    <Tooltip>
                    <TooltipTrigger asChild>
                    <Button type="button" variant="destructive" onClick={() => {
                        props.collapsible_props.setDisAllowed_websites([]);
                    }}>
                      
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Clear</p>
                    </TooltipContent>
                    </Tooltip>

                  </div>
                </fieldset>

                
            </div>

            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => {
                props.checkboxProps.onlyCurrentDomain(duponlyCurrentDomain);
                props.checkboxProps.setJSearch(dupJSearch);
                props.checkboxProps.setCSSearch(dupCSSearch);
            }}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
