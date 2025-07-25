"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Type, ImageIcon, Square, Eye } from "lucide-react"
import type { Page } from "../types"

interface PagesPreviewMainContentProps {
  selectedPage: Page | null
}

export function PagesPreviewMainContent({ selectedPage }: PagesPreviewMainContentProps) {
  if (!selectedPage) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Eye className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">No Page Selected</h3>
          <p className="text-sm">Select a page from the sidebar to preview it here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Page Preview */}
        <Card className="min-h-[600px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Page Preview</span>
              <Button
                variant="outline"
                size="sm"
                className="border-green-300 text-black hover:bg-green-50 bg-transparent"
              >
                <Eye className="h-4 w-4 mr-2" />
                Full Screen
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[600px] bg-white border-2 border-dashed border-muted-foreground/20 rounded-lg overflow-hidden shadow-inner">
              {selectedPage.components.map((component) => (
                <div
                  key={component.id}
                  className={`absolute border-2 rounded transition-all ${
                    component.content
                      ? "border-green-300 bg-green-50/30"
                      : "border-orange-300 bg-orange-50/30 border-dashed"
                  }`}
                  style={{
                    left: `${component.position.x}%`,
                    top: `${component.position.y}%`,
                    width: `${component.size.width}%`,
                    height: `${component.size.height}%`,
                  }}
                >
                  <div className="p-2 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {component.type === "text" && <Type className="h-3 w-3" />}
                        {component.type === "image" && <ImageIcon className="h-3 w-3" />}
                        {component.type === "header" && <Square className="h-3 w-3" />}
                        {component.type === "footer" && <Square className="h-3 w-3" />}
                        <span className="text-xs font-medium">{component.name}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          component.content ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {component.content ? "Filled" : "Empty"}
                      </Badge>
                    </div>
                    <div className="flex-1 text-xs overflow-hidden">
                      {component.content ? (
                        <div className="space-y-1">
                          <p className="line-clamp-6 text-gray-700 leading-relaxed">{component.content}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-orange-600">
                          <div className="text-lg opacity-50 mb-1">📝</div>
                          <p className="italic text-xs">No content</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
