"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export interface CheckboxProps {
    currentDomain: boolean,
    jsSearch: boolean,
    cssSearch: boolean,
    onlyCurrentDomain: React.Dispatch<React.SetStateAction<boolean>>
    setJSearch: React.Dispatch<React.SetStateAction<boolean>>
    setCSSearch: React.Dispatch<React.SetStateAction<boolean>>
}

export function CheckboxSetting(props: CheckboxProps ) {
  let {currentDomain, jsSearch, cssSearch, onlyCurrentDomain, setJSearch, setCSSearch } = props
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="check-domain" checked={currentDomain} onCheckedChange={(checked) => onlyCurrentDomain(checked===true)} />
        <Label htmlFor="terms">Only Search through the given domain</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="check-js" checked={jsSearch} onCheckedChange={(checked) => setJSearch(checked===true)}/>
        <Label htmlFor="terms">Ignore checking any javascript files (*.js)</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="check-css" checked={cssSearch} onCheckedChange={(checked) => setCSSearch(checked===true)} />
        <Label htmlFor="terms">Ignore checking any css files (*.css)</Label>
      </div>

    </div>
  )
}
