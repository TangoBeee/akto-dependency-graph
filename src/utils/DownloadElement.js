import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export const downloadAsImage = () => {
    const node = document.getElementById('mermaid-flowchart');

    htmlToImage.toPng(node, { pixelRatio: 50 })
      .then(blob => {
        download(blob, 'flowchart.png');
      })
      .catch(error => {
        console.error('Error converting div to image:', error);
      });
};