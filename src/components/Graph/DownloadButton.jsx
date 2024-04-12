import React from 'react';
import { Panel, useReactFlow } from 'reactflow';
import { toSvg } from 'html-to-image';
import { DownloadButtonContainer } from './DownloadButton.styled';
import DownloadImage from '../../assets/download.svg';

function DownloadButton() {
  const reactFlowInstance = useReactFlow();

  const handleDownloadImage = async () => {
    reactFlowInstance.fitView();
    
    function filter(node) {
        return (node.tagName !== 'i');
    }
  
    let elements = document.getElementsByClassName('react-flow__renderer')[0];
  
    toSvg(elements, { filter: filter }).then(async (svgContent) => {
        const svgElement = await decodeURIComponent(svgContent.replace("data:image/svg+xml;charset=utf-8,", '').trim());
  
        const newWindow = open();
  
        newWindow.document.write(`
            <html>
            <head>
            <title>Graph.pdf</title>
            <style>
            @page {
                size: A4 landscape !important;
                margin: 0 !important;
            }
            @media print {
                * {
                    -webkit-print-color-adjust: exact !important;   /* Chrome, Safari */
                    color-adjust: exact !important;                 /* Firefox */
                }
            }
            </style>
            </head>
            <body style="margin:60px 32px 32px 32px ">
                ${svgElement}
                <script>
                window.print();
                window.close();
                </script>
            </body>
            </html>
        `);
    });
  }

  return (
    <Panel position="top-right">
      <DownloadButtonContainer>
        <button className="download-btn">
          <img onClick={handleDownloadImage} src={DownloadImage} alt="Download-Image" />
        </button>
      </DownloadButtonContainer>
    </Panel>
  );
}

export default DownloadButton;
