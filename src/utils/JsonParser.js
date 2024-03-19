export const parseJsonToMermaid = (json) => {
    if (json == null || !Array.isArray(json) || json.length === 0) return null

    let diagramDefinition = 'graph TD;\n'

    json.forEach((item) => {
        for(const key in item.connections) {
            const parentNode = item.connections?.[key]?.edges?.[0]?.method + "_" + item.connections?.[key]?.edges?.[0]?.url
            const currentNode = item.method + "_" + item.url
            const paramEdge = item.connections?.[key]?.edges?.[0]?.param + " --> " + item.connections?.[key]?.param

            if (parentNode && currentNode) {
                diagramDefinition += `${parentNode}-->${currentNode};\n`
            }
        }
    })

    return diagramDefinition
}