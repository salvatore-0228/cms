"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Square, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import type { MasterPage } from "../types"

interface ContentManagerTopbarProps {
  onFileUpload: (file: File) => void
  selectedMasterPage: MasterPage | null
  onMasterPageSelect: (templateId: string) => void
  onAddPage: (pageNumber: number) => void
}

export function ContentManagerTopbar({
  onFileUpload,
  selectedMasterPage,
  onMasterPageSelect,
  onAddPage,
}: ContentManagerTopbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [pageNumber, setPageNumber] = useState("")

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".doc") && !file.name.endsWith(".docx")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .doc or .docx file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      onFileUpload(file)
      setIsUploading(false)
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed and added to your documents.`,
      })
    }, 1500)

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleAddPage = () => {
    const pageNum = Number.parseInt(pageNumber)
    if (!pageNum || pageNum < 1) {
      toast({
        title: "Invalid page number",
        description: "Please enter a valid page number (1 or greater).",
        variant: "destructive",
      })
      return
    }

    if (!selectedMasterPage) {
      toast({
        title: "No template selected",
        description: "Please select a template before adding a page.",
        variant: "destructive",
      })
      return
    }

    onAddPage(pageNum)
    setPageNumber("")
    toast({
      title: "Page added",
      description: `Page ${pageNum} has been created successfully.`,
    })
  }

  return (
    <div className="flex items-center justify-between h-full px-4 bg-white border-b border-green-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-lg text-black">Content Manager</span>
        </div>

        {/* Template Selection */}
        <div className="flex items-center space-x-2 border-l border-green-200 pl-4">
          <Square className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-black">Template:</span>
          <Select onValueChange={onMasterPageSelect}>
            <SelectTrigger className="w-48 border-green-300 focus:border-green-500">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template-1">Article Layout</SelectItem>
              <SelectItem value="template-2">Magazine Layout</SelectItem>
            </SelectContent>
          </Select>
          {selectedMasterPage && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              {selectedMasterPage.name}
            </Badge>
          )}
        </div>

        {/* File Upload - Moved to left side */}
        <div className="flex items-center space-x-2 border-l border-green-200 pl-4">
          <Button
            onClick={triggerFileUpload}
            disabled={isUploading}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Upload className="h-4 w-4" />
            <span>{isUploading ? "Uploading..." : "Upload Content"}</span>
          </Button>
          <input ref={fileInputRef} type="file" accept=".doc,.docx" onChange={handleFileSelect} className="hidden" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Add Page Section - Moved to right side */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Add Page:</span>
          <Input
            type="number"
            placeholder="Page #"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            className="w-20 h-8 border-green-300 focus:border-green-500"
            min="1"
          />
          <Button size="sm" onClick={handleAddPage} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
