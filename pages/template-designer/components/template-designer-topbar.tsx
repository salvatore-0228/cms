"use client"
import { Button } from "@/components/ui/button"
import { Save, Undo, Redo, FileText, Settings, Eye, Type, ImageIcon, Square } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface TemplateDesignerTopbarProps {
  onAddComponent: (type: "text" | "image" | "header" | "footer") => void
  onSaveTemplate: () => void
  selectedTemplateName: string | null
}

export function TemplateDesignerTopbar({
  onAddComponent,
  onSaveTemplate,
  selectedTemplateName,
}: TemplateDesignerTopbarProps) {
  const handleSave = () => {
    if (!selectedTemplateName) {
      toast({
        title: "No template selected",
        description: "Please select a template to save changes.",
        variant: "destructive",
      })
      return
    }

    onSaveTemplate()
    toast({
      title: "Template saved",
      description: `${selectedTemplateName} has been saved successfully.`,
    })
  }

  return (
    <div className="flex items-center justify-between h-full px-4 bg-white border-b border-green-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-lg text-black">Template Designer</span>
          {selectedTemplateName && <span className="text-sm text-green-600 font-medium">- {selectedTemplateName}</span>}
        </div>

        {/* Add Components Section - Moved from main content */}
        <div className="flex items-center space-x-2 border-l border-green-200 pl-4">
          <span className="text-sm font-medium text-black">Add Components:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddComponent("text")}
            className="border-green-300 text-black hover:bg-green-50 hover:text-green-700"
          >
            <Type className="h-4 w-4 mr-1" />
            Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddComponent("image")}
            className="border-green-300 text-black hover:bg-green-50 hover:text-green-700"
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddComponent("header")}
            className="border-green-300 text-black hover:bg-green-50 hover:text-green-700"
          >
            <Square className="h-4 w-4 mr-1" />
            Header
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddComponent("footer")}
            className="border-green-300 text-black hover:bg-green-50 hover:text-green-700"
          >
            <Square className="h-4 w-4 mr-1" />
            Footer
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Action Buttons */}
        <div className="flex items-center space-x-1 border-l border-green-200 pl-2">
          <Button variant="ghost" size="sm" className="text-black hover:bg-green-50 hover:text-green-700">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-black hover:bg-green-50 hover:text-green-700">
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-l border-green-200 pl-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-black hover:bg-green-50 hover:text-green-700"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-black hover:bg-green-50 hover:text-green-700">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Settings Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-black hover:bg-green-50 hover:text-green-700">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border-green-200">
            <DropdownMenuItem className="hover:bg-green-50">Save Template</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-50">Export Template</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-50">Preferences</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-50">Help</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
