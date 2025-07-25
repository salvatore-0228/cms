"use client"

import { useState } from "react"
import { ContentManagerSidebar } from "./components/content-manager-sidebar"
import { ContentManagerTopbar } from "./components/content-manager-topbar"
import { ContentManagerMainContent } from "./components/content-manager-main-content"
import type { DocumentData, TextFlow, PageComponent, MasterPage } from "./types"

export function ContentManager() {
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [textFlows, setTextFlows] = useState<TextFlow[]>([])
  const [pageComponents, setPageComponents] = useState<PageComponent[]>([])
  const [selectedMasterPage, setSelectedMasterPage] = useState<MasterPage | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<PageComponent | null>(null)
  const [documentText, setDocumentText] = useState<string>("")

  const handleFileUpload = (file: File) => {
    // Simulate file processing
    const newDoc: DocumentData = {
      id: Date.now().toString(),
      name: file.name,
      content:
        "Sample extracted text from the uploaded document. This would be the actual content extracted from the .doc file using a proper document parser. This is longer content to demonstrate text flow management in the content management interface.\n\nThis is a second paragraph of the document content. It contains more detailed information about the document processing and how the text extraction works in the system.\n\nThe third paragraph shows how multi-paragraph documents are handled and displayed in the text view section of the sidebar.",
      uploadedAt: new Date(),
    }

    setDocuments((prev) => [...prev, newDoc])
    setDocumentText(newDoc.content)

    // Add to un-flowed text
    const newTextFlow: TextFlow = {
      id: Date.now().toString(),
      content: newDoc.content,
      isFlowed: false,
    }

    setTextFlows((prev) => [...prev, newTextFlow])
  }

  const handleMasterPageSelect = (templateId: string) => {
    const masterPageTemplates: MasterPage[] = [
      {
        id: "template-1",
        name: "Article Layout",
        components: [
          {
            id: "header-1",
            name: "Header",
            type: "header",
            position: { x: 0, y: 0 },
            size: { width: 100, height: 10 },
          },
          {
            id: "content-1",
            name: "Main Content",
            type: "text",
            position: { x: 0, y: 15 },
            size: { width: 70, height: 70 },
          },
          {
            id: "sidebar-1",
            name: "Sidebar",
            type: "text",
            position: { x: 75, y: 15 },
            size: { width: 25, height: 70 },
          },
          {
            id: "footer-1",
            name: "Footer",
            type: "footer",
            position: { x: 0, y: 90 },
            size: { width: 100, height: 10 },
          },
        ],
      },
      {
        id: "template-2",
        name: "Magazine Layout",
        components: [
          {
            id: "header-2",
            name: "Header",
            type: "header",
            position: { x: 0, y: 0 },
            size: { width: 100, height: 15 },
          },
          {
            id: "image-2",
            name: "Hero Image",
            type: "image",
            position: { x: 0, y: 20 },
            size: { width: 100, height: 30 },
          },
          { id: "col1-2", name: "Column 1", type: "text", position: { x: 0, y: 55 }, size: { width: 33, height: 35 } },
          { id: "col2-2", name: "Column 2", type: "text", position: { x: 35, y: 55 }, size: { width: 33, height: 35 } },
          { id: "col3-2", name: "Column 3", type: "text", position: { x: 70, y: 55 }, size: { width: 30, height: 35 } },
        ],
      },
    ]

    const template = masterPageTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedMasterPage(template)
      setPageComponents(template.components)
    }
  }

  const handleAddPage = (pageNumber: number) => {
    // This would typically save the current page and create a new one
    console.log(`Adding page ${pageNumber} with template:`, selectedMasterPage?.name)
    // Implementation would depend on your page management system
  }

  return (
    <div className="h-full w-full overflow-hidden bg-white">
      {/* Fixed Top Toolbar */}
      <div className="fixed top-12 left-0 right-0 z-40 h-14 border-b bg-white border-green-200">
        <ContentManagerTopbar
          onFileUpload={handleFileUpload}
          selectedMasterPage={selectedMasterPage}
          onMasterPageSelect={handleMasterPageSelect}
          onAddPage={handleAddPage}
        />
      </div>

      {/* Layout Container - positioned below top toolbar */}
      <div className="flex h-full pt-14">
        {/* Fixed Left Sidebar */}
        <div className="w-80 h-full border-r bg-white border-green-200">
          <ContentManagerSidebar textFlows={textFlows} documentText={documentText} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full overflow-auto bg-green-50/20">
          <ContentManagerMainContent
            pageComponents={pageComponents}
            selectedComponent={selectedComponent}
            onComponentSelect={setSelectedComponent}
          />
        </div>
      </div>
    </div>
  )
}
