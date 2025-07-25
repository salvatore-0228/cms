"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Type, ImageIcon, Square, Trash2 } from "lucide-react"
import type { PageComponent } from "../types"

interface TemplateDesignerMainContentProps {
  pageComponents: PageComponent[]
  setPageComponents: (components: PageComponent[]) => void
  selectedComponent: PageComponent | null
  onComponentSelect: (component: PageComponent | null) => void
  onAddComponent: (type: PageComponent["type"]) => void
}

export function TemplateDesignerMainContent({
  pageComponents,
  setPageComponents,
  selectedComponent,
  onComponentSelect,
}: TemplateDesignerMainContentProps) {
  const addComponent = (type: PageComponent["type"]) => {
    const newComponent: PageComponent = {
      id: `component-${Date.now()}`,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      position: { x: 10, y: 10 },
      size: { width: 30, height: 20 },
    }
    setPageComponents([...pageComponents, newComponent])
  }

  const deleteComponent = (componentId: string) => {
    setPageComponents(pageComponents.filter((c) => c.id !== componentId))
    if (selectedComponent?.id === componentId) {
      onComponentSelect(null)
    }
  }

  const handleComponentClick = (component: PageComponent) => {
    onComponentSelect(component)
  }

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Canvas */}
        <Card className="min-h-[600px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Template Canvas</span>
              {selectedComponent && (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {selectedComponent.name} selected
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[500px] bg-white border-2 border-dashed border-green-200 rounded-lg overflow-hidden">
              {pageComponents.map((component) => (
                <div
                  key={component.id}
                  className={`absolute border-2 rounded cursor-pointer transition-all ${
                    selectedComponent?.id === component.id
                      ? "border-green-500 bg-green-50"
                      : "border-green-300 hover:border-green-400"
                  }`}
                  style={{
                    left: `${component.position.x}%`,
                    top: `${component.position.y}%`,
                    width: `${component.size.width}%`,
                    height: `${component.size.height}%`,
                  }}
                  onClick={() => handleComponentClick(component)}
                >
                  <div className="p-2 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {component.type === "text" && <Type className="h-3 w-3 text-green-600" />}
                        {component.type === "image" && <ImageIcon className="h-3 w-3 text-green-600" />}
                        {component.type === "header" && <Square className="h-3 w-3 text-green-600" />}
                        {component.type === "footer" && <Square className="h-3 w-3 text-green-600" />}
                        <span className="text-xs font-medium text-black">{component.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteComponent(component.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex-1 text-xs text-muted-foreground overflow-hidden">
                      <p className="italic text-green-600">Template component - {component.type}</p>
                    </div>
                  </div>
                </div>
              ))}

              {pageComponents.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Square className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No template selected</p>
                    <p className="text-sm">Choose a template from the sidebar to start editing</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
