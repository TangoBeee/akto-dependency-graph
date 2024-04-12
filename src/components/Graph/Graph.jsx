import React, { useCallback, useEffect } from 'react'
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    useReactFlow,
    Controls,
    MiniMap,
} from 'reactflow';

import 'reactflow/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js';
import DownloadButton from './DownloadButton';

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': 100,
    'elk.spacing.nodeNode': 80,
  };

  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: 'root',
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

const LayoutFlow = ({ initialNodes, initialEdges }) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements();

  const proOptions = { hideAttribution: true };

  useEffect(() => {
    setTimeout(() => {
      getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
    }, 1);
  }, [])

  return (
    <ReactFlow
      proOptions={proOptions}
      nodes={nodes}
      edges={edges}
      minZoom={0.001}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      snapToGrid={true}
      fitView={true}
    >
      <Controls />
      <MiniMap className='graph-minimap' />
      <DownloadButton />
    </ReactFlow>
  );
};

const Graph = ({ nodes, edges }) => {
  return (
    <ReactFlowProvider>
        <LayoutFlow
            initialNodes={nodes}
            initialEdges={edges}
        />
    </ReactFlowProvider>
  );
}

export default Graph
