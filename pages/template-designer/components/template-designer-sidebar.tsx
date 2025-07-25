"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layout, Square, Type, ImageIcon, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { PageComponent, MasterPage } from "../types"

interface TemplateDesignerSidebarProps {
  pageComponents: PageComponent[]
  selectedComponent: PageComponent | null
  onComponentSelect: (component: PageComponent | null) => void
  onTemplateSelect: (templateId: string) => void
  selectedTemplate: MasterPage | null
  templates: MasterPage[]
  onDeleteTemplate: (templateId: string) => void
}

export function TemplateDesignerSidebar({
  pageComponents,
  selectedComponent,
  onComponentSelect,
  onTemplateSelect,
  selectedTemplate,
  templates,
  onDeleteTemplate,
}: TemplateDesignerSidebarProps) {
  const handleDeleteTemplate = (templateId: string, templateName: string) => {
    if (templates.length <= 1) {
      toast({
        title: "Cannot delete template",
        description: "At least one template must remain.",
        variant: "destructive",
      })
      return
    }

    onDeleteTemplate(templateId)
    toast({
      title: "Template deleted",
      description: `${templateName} has been deleted successfully.`,
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Templates Section */}
      <div className="border-b">
        <div className="p-3 border-b bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4 text-green-600" />
            <span className="font-medium text-black">Templates</span>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
              {templates.length}
            </Badge>
          </div>
        </div>
        <ScrollArea className="h-64">
          <div className="p-2">
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors group ${
                    selectedTemplate?.id === template.id
                      ? "bg-green-100 border-green-300"
                      : "bg-background hover:bg-green-50 border-green-200"
                  }`}
                  onClick={() => onTemplateSelect(template.id)}
                >
                  <div className="flex items-center gap-2">
                    <Layout className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-black">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.components.length} components</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteTemplate(template.id, template.name)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Page Components Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 text-green-600" />
            <span className="font-medium text-black">Components</span>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
              {pageComponents.length}
            </Badge>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {pageComponents.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">Select a template to see components</div>
            ) : (
              <div className="space-y-2">
                {pageComponents.map((component) => (
                  <div
                    key={component.id}
                    className={`p-2 border rounded-md cursor-pointer transition-colors ${
                      selectedComponent?.id === component.id
                        ? "bg-green-100 border-green-300"
                        : "bg-background hover:bg-green-50 border-green-200"
                    }`}
                    onClick={() => onComponentSelect(component)}
                  >
                    <div className="flex items-center gap-2">
                      {component.type === "text" && <Type className="h-4 w-4 text-green-600" />}
                      {component.type === "image" && <ImageIcon className="h-4 w-4 text-green-600" />}
                      {component.type === "header" && <Square className="h-4 w-4 text-green-600" />}
                      {component.type === "footer" && <Square className="h-4 w-4 text-green-600" />}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-black">{component.name}</div>
                        <div className="text-xs text-muted-foreground">{component.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
