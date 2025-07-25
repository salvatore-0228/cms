"use client"

import { useState } from "react"
import { TemplateDesignerSidebar } from "./components/template-designer-sidebar"
import { TemplateDesignerTopbar } from "./components/template-designer-topbar"
import { TemplateDesignerMainContent } from "./components/template-designer-main-content"
import type { PageComponent, MasterPage } from "./types"

export function TemplateDesigner() {
  const [pageComponents, setPageComponents] = useState<PageComponent[]>([])
  const [selectedComponent, setSelectedComponent] = useState<PageComponent | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<MasterPage | null>(null)
  const [templates, setTemplates] = useState<MasterPage[]>([
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
    {
      id: "template-3",
      name: "Simple Layout",
      components: [
        {
          id: "header-3",
          name: "Header",
          type: "header",
          position: { x: 0, y: 0 },
          size: { width: 100, height: 15 },
        },
        {
          id: "content-3",
          name: "Main Content",
          type: "text",
          position: { x: 0, y: 20 },
          size: { width: 100, height: 70 },
        },
        {
          id: "footer-3",
          name: "Footer",
          type: "footer",
          position: { x: 0, y: 95 },
          size: { width: 100, height: 5 },
        },
      ],
    },
  ])

  const handleAddComponent = (type: PageComponent["type"]) => {
    const newComponent: PageComponent = {
      id: `component-${Date.now()}`,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      position: { x: 10, y: 10 },
      size: { width: 30, height: 20 },
    }
    setPageComponents([...pageComponents, newComponent])
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setPageComponents([...template.components])
      setSelectedComponent(null)
    }
  }

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter((t) => t.id !== templateId)
    setTemplates(updatedTemplates)

    // If the deleted template was selected, clear the selection
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null)
      setPageComponents([])
      setSelectedComponent(null)
    }
  }

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return

    // Update the selected template with current components
    const updatedTemplates = templates.map((template) =>
      template.id === selectedTemplate.id ? { ...template, components: [...pageComponents] } : template,
    )

    setTemplates(updatedTemplates)

    // Update the selected template reference
    const updatedSelectedTemplate = updatedTemplates.find((t) => t.id === selectedTemplate.id)
    if (updatedSelectedTemplate) {
      setSelectedTemplate(updatedSelectedTemplate)
    }
  }

  return (
    <div className="h-full w-full overflow-hidden bg-white">
      {/* Fixed Top Toolbar */}
      <div className="fixed top-12 left-0 right-0 z-40 h-14 border-b bg-white border-green-200">
        <TemplateDesignerTopbar
          onAddComponent={handleAddComponent}
          onSaveTemplate={handleSaveTemplate}
          selectedTemplateName={selectedTemplate?.name || null}
        />
      </div>

      {/* Layout Container - positioned below top toolbar */}
      <div className="flex h-full pt-14">
        {/* Fixed Left Sidebar */}
        <div className="w-80 h-full border-r bg-white border-green-200">
          <TemplateDesignerSidebar
            pageComponents={pageComponents}
            selectedComponent={selectedComponent}
            onComponentSelect={setSelectedComponent}
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
            templates={templates}
            onDeleteTemplate={handleDeleteTemplate}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full overflow-auto bg-green-50/20">
          <TemplateDesignerMainContent
            pageComponents={pageComponents}
            setPageComponents={setPageComponents}
            selectedComponent={selectedComponent}
            onComponentSelect={setSelectedComponent}
            onAddComponent={handleAddComponent}
          />
        </div>
      </div>
    </div>
  )
}
