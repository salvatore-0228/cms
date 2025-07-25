"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye } from "lucide-react"
import type { TextFlow } from "../types"

interface ContentManagerSidebarProps {
  textFlows: TextFlow[]
  documentText: string
}

export function ContentManagerSidebar({ textFlows, documentText }: ContentManagerSidebarProps) {
  const unflowedTexts = textFlows.filter((text) => !text.isFlowed)

  return (
    <div className="h-full flex flex-col">
      {/* Document Text View */}
      <div className="border-b">
        <div className="p-3 border-b bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-600" />
            <span className="font-medium text-black">Document Text</span>
          </div>
        </div>
        <ScrollArea className="h-64">
          <div className="p-3">
            {documentText ? (
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{documentText}</div>
            ) : (
              <div className="p-4 text-sm text-muted-foreground text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No document uploaded</p>
                <p className="text-xs">Upload a document to see its content here</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Un-flowed Content Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-green-600" />
            <span className="font-medium text-black">Un-flowed Content</span>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
              {unflowedTexts.length}
            </Badge>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {unflowedTexts.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                <div className="space-y-2">
                  <Eye className="h-8 w-8 mx-auto opacity-50" />
                  <p>No un-flowed content</p>
                  <p className="text-xs">All content has been flowed to components</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {unflowedTexts.map((text, index) => (
                  <div key={text.id} className="p-3 border rounded-md bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-800">Content Block {index + 1}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-4">{text.content.substring(0, 150)}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Instructions */}
      <div className="border-t p-3 bg-green-50/30 border-green-200">
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-medium">Content Management:</p>
          <p>1. View document text in the upper section</p>
          <p>2. Un-flowed content appears in the lower section</p>
          <p>3. Use the canvas to manage page content</p>
        </div>
      </div>
    </div>
  )
}
