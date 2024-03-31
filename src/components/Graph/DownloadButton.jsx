import React from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
import { DownloadButtonContainer } from './DownloadButton.styled';
import DownloadImage from '../../assets/download.svg';

function downloadImage(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const handleDownloadImage = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0, 1);

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#1a365d',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

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
