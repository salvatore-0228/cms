export interface PageComponent {
    id: string
    name: string
    type: "text" | "image" | "header" | "footer"
    content?: string
    position: { x: number; y: number }
    size: { width: number; height: number }
  }
  
  export interface Page {
    id: string
    pageNumber: number
    name: string
    templateType: string
    templateId: string
    components: PageComponent[]
  }
  