"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Search } from "lucide-react"
import { useState } from "react"
import type { Page } from "../types"

interface PagesPreviewSidebarProps {
  pages: Page[]
  selectedPage: Page | null
  onPageSelect: (page: Page) => void
}

export function PagesPreviewSidebar({ pages, selectedPage, onPageSelect }: PagesPreviewSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-green-50 border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-green-600" />
          <h2 className="font-semibold text-lg text-black">Pages Preview</h2>
          <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
            {pages.length} pages
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-green-300 focus:border-green-500"
          />
        </div>
      </div>

      {/* Pages List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredPages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No pages found</p>
              <p className="text-xs">Try adjusting your search</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                    selectedPage?.id === page.id
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-background hover:bg-muted/50"
                  }`}
                  onClick={() => onPageSelect(page)}
                >
                  {/* Page Header */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded text-xs font-bold">
                      {page.pageNumber}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{page.name}</h3>
                      <p className="text-xs text-muted-foreground">{page.templateType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
