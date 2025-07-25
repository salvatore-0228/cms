"use client"

import { useState } from "react"
import { PagesPreviewSidebar } from "./components/pages-preview-sidebar"
import { PagesPreviewMainContent } from "./components/pages-preview-main-content"
import type { Page } from "./types"

// Sample pages data - removed status and dates
const samplePages: Page[] = [
  {
    id: "page-1",
    pageNumber: 1,
    name: "Homepage",
    templateType: "Article Layout",
    templateId: "template-1",
    components: [
      {
        id: "header-1",
        name: "Header",
        type: "header",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 10 },
        content: "Welcome to Our Website - Your trusted partner for innovative solutions",
      },
      {
        id: "content-1",
        name: "Main Content",
        type: "text",
        position: { x: 0, y: 15 },
        size: { width: 70, height: 70 },
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        id: "sidebar-1",
        name: "Sidebar",
        type: "text",
        position: { x: 75, y: 15 },
        size: { width: 25, height: 70 },
        content: "Quick Links: About Us, Services, Contact, Blog, News Updates",
      },
      {
        id: "footer-1",
        name: "Footer",
        type: "footer",
        position: { x: 0, y: 90 },
        size: { width: 100, height: 10 },
        content: "© 2024 Company Name. All rights reserved. Contact: info@company.com",
      },
    ],
  },
  {
    id: "page-2",
    pageNumber: 2,
    name: "About Us",
    templateType: "Magazine Layout",
    templateId: "template-2",
    components: [
      {
        id: "header-2",
        name: "Header",
        type: "header",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 15 },
        content: "About Our Company - Building the Future Together",
      },
      {
        id: "image-2",
        name: "Hero Image",
        type: "image",
        position: { x: 0, y: 20 },
        size: { width: 100, height: 30 },
        content: "[Hero Image Placeholder - Team photo or company building]",
      },
      {
        id: "col1-2",
        name: "Column 1",
        type: "text",
        position: { x: 0, y: 55 },
        size: { width: 33, height: 35 },
        content: "Our Mission: To provide innovative solutions that transform businesses and improve lives.",
      },
      {
        id: "col2-2",
        name: "Column 2",
        type: "text",
        position: { x: 35, y: 55 },
        size: { width: 33, height: 35 },
        content: "Our Vision: To be the leading provider of cutting-edge technology solutions worldwide.",
      },
      {
        id: "col3-2",
        name: "Column 3",
        type: "text",
        position: { x: 70, y: 55 },
        size: { width: 30, height: 35 },
        content: "Our Values: Innovation, Integrity, Excellence, and Customer Success.",
      },
    ],
  },
  {
    id: "page-3",
    pageNumber: 3,
    name: "Services",
    templateType: "Article Layout",
    templateId: "template-1",
    components: [
      {
        id: "header-3",
        name: "Header",
        type: "header",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 10 },
        content: "Our Services - Comprehensive Solutions for Your Business",
      },
      {
        id: "content-3",
        name: "Main Content",
        type: "text",
        position: { x: 0, y: 15 },
        size: { width: 70, height: 70 },
        content:
          "We offer a wide range of professional services including web development, mobile applications, cloud solutions, and digital transformation consulting. Our expert team works closely with clients to deliver customized solutions that meet their specific needs and drive business growth.",
      },
      {
        id: "sidebar-3",
        name: "Sidebar",
        type: "text",
        position: { x: 75, y: 15 },
        size: { width: 25, height: 70 },
      },
      {
        id: "footer-3",
        name: "Footer",
        type: "footer",
        position: { x: 0, y: 90 },
        size: { width: 100, height: 10 },
        content: "Contact us today for a free consultation: 1-800-SERVICES",
      },
    ],
  },
  {
    id: "page-4",
    pageNumber: 4,
    name: "Contact",
    templateType: "Magazine Layout",
    templateId: "template-2",
    components: [
      {
        id: "header-4",
        name: "Header",
        type: "header",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 15 },
        content: "Contact Us - We'd Love to Hear From You",
      },
      {
        id: "image-4",
        name: "Hero Image",
        type: "image",
        position: { x: 0, y: 20 },
        size: { width: 100, height: 30 },
        content: "[Contact Image Placeholder - Office location or contact form illustration]",
      },
      {
        id: "col1-4",
        name: "Column 1",
        type: "text",
        position: { x: 0, y: 55 },
        size: { width: 33, height: 35 },
        content: "Phone: +1 (555) 123-4567\nEmail: contact@company.com\nHours: Mon-Fri 9AM-6PM",
      },
      {
        id: "col2-4",
        name: "Column 2",
        type: "text",
        position: { x: 35, y: 55 },
        size: { width: 33, height: 35 },
        content: "Address:\n123 Business Street\nSuite 100\nCity, State 12345\nUnited States",
      },
      {
        id: "col3-4",
        name: "Column 3",
        type: "text",
        position: { x: 70, y: 55 },
        size: { width: 30, height: 35 },
        content: "Follow Us:\nLinkedIn: /company\nTwitter: @company\nFacebook: /company",
      },
    ],
  },
]

export function PagesPreview() {
  const [selectedPage, setSelectedPage] = useState<Page | null>(samplePages[0])

  return (
    <div className="h-full w-full overflow-hidden bg-background">
      {/* Layout Container */}
      <div className="flex h-full pt-2">
        {/* Fixed Left Sidebar */}
        <div className="w-80 h-full border-r bg-background">
          <PagesPreviewSidebar pages={samplePages} selectedPage={selectedPage} onPageSelect={setSelectedPage} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full overflow-auto bg-muted/20">
          <PagesPreviewMainContent selectedPage={selectedPage} />
        </div>
      </div>
    </div>
  )
}
