"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Layout, Eye } from "lucide-react"
import { TemplateDesigner } from "@/pages/template-designer/template-designer"
import { ContentManager } from "@/pages/content-manager/content-manager"
import { PagesPreview } from "@/pages/pages-preview/pages-preview"


export default function Home() {
  const [currentPage, setCurrentPage] = useState</* "template" */ | "content" | "preview">("content")

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      {/* Page Navigation - Updated styling */}
      <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-gray-200">
        <div className="flex items-center h-full">
          <div className="flex">
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage("template")}
              className={`flex items-center gap-2 px-6 h-12 rounded-none border-b-2 transition-colors ${
                currentPage === "template"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Layout className="h-4 w-4" />
              Template Designer
            </Button> */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage("content")}
              className={`flex items-center gap-2 px-6 h-12 rounded-none border-b-2 transition-colors ${
                currentPage === "content"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FileText className="h-4 w-4" />
              Content Manager
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage("preview")}
              className={`flex items-center gap-2 px-6 h-12 rounded-none border-b-2 transition-colors ${
                currentPage === "preview"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Eye className="h-4 w-4" />
              Pages Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-12 h-full">
        {/* {currentPage === "template" && <TemplateDesigner />} */}
        {currentPage === "content" && <ContentManager />}
        {currentPage === "preview" && <PagesPreview />}
      </div>
    </div>
  )
}
