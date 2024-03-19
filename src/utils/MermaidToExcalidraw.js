import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { convertToExcalidrawElements}  from "@excalidraw/excalidraw"

export const convertMermaidToExcalidraw = async (diagramDefinition, fontSize, setExcalidrawDiagram, toggleExcalidraw, handleNullDiagram) => {
    try {
        const { elements } = await parseMermaidToExcalidraw(diagramDefinition, {
        fontSize: fontSize,
        })
        const excalidrawElements = convertToExcalidrawElements(elements)
        setExcalidrawDiagram(excalidrawElements)
    } catch (e) {
        handleNullDiagram()
        // TODO("This is temp fix. There is something by which this method is getting executed 2 times I guess.")
        !toggleExcalidraw && convertMermaidToExcalidraw()
        console.log(e.message)
    }
}