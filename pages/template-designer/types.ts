export interface DocumentData {
    id: string
    name: string
    content: string
    uploadedAt: Date
  }
  
  export interface TextFlow {
    id: string
    content: string
    isFlowed: boolean
    componentId?: string
  }
  
  export interface PageComponent {
    id: string
    name: string
    type: "text" | "image" | "header" | "footer"
    content?: string
    position: { x: number; y: number }
    size: { width: number; height: number }
  }
  
  export interface MasterPage {
    id: string
    name: string
    components: PageComponent[]
  }
  