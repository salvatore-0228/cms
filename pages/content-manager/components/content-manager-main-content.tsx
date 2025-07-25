"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Type, ImageIcon, Square, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PageComponent } from "../types"
import MasterHistoryPage from "@/pages/master-pages/history-page"

interface ContentManagerMainContentProps {
  pageComponents: PageComponent[]
  selectedComponent: PageComponent | null
  onComponentSelect: (component: PageComponent | null) => void
}

export function ContentManagerMainContent({
  pageComponents,
  selectedComponent,
  onComponentSelect,
}: ContentManagerMainContentProps) {
  const handleComponentClick = (component: PageComponent) => {
    onComponentSelect(component)
  }

  const getComponentStatus = (component: PageComponent) => {
    if (component.content) {
      return { status: "filled", color: "bg-green-100 text-green-800", text: "Has Content" }
    }
    return { status: "empty", color: "bg-orange-100 text-orange-800", text: "Needs Content" }
  }

  return (
    <div className="h-full p-6 overflow-auto bg-gray-500">
      <div className="mx-auto space-y-6 h-full">
        {/* Page Preview */}
        <Card className="min-h-[600px] h-full">
          <CardContent className="p-6 h-full">
            <div className="relative w-full h-[100%] bg-white border-2 border-dashed border-green-200 rounded-lg overflow-hidden">
              {pageComponents.map((component) => {
                const status = getComponentStatus(component)
                return (
                  <div
                    key={component.id}
                    className={`absolute border-2 rounded cursor-pointer transition-all ${
                      selectedComponent?.id === component.id
                        ? "border-green-500 bg-green-50 shadow-lg"
                        : component.content
                          ? "border-green-300 hover:border-green-500 bg-green-50/50"
                          : "border-orange-300 hover:border-orange-500 bg-orange-50/50"
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
                        <Badge variant="outline" className={`text-xs ${status.color}`}>
                          {status.text}
                        </Badge>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground overflow-hidden">
                        {component.content ? (
                          <div className="space-y-1">
                            <p className="line-clamp-4 text-gray-700">{component.content}</p>
                            <div className="text-xs text-green-600 font-medium">✓ Content loaded</div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <Eye className="h-4 w-4 mb-1 opacity-50" />
                            <p className="italic text-orange-600">Click to select component</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {pageComponents.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* <div className="text-center text-muted-foreground">
                    <Square className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No template selected</p>
                    <p className="text-sm">Choose a template from the top toolbar to start managing content</p>
                  </div> */}
                  <MasterHistoryPage />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
