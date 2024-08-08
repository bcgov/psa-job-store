import { DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import canvasSize from 'canvas-size';
import { toSvg } from 'html-to-image';
import { Options } from 'html-to-image/lib/types';
import { useState } from 'react';
import { Panel, Rect, getNodesBounds, getRectOfNodes, getTransformForBounds, useReactFlow } from 'reactflow';

// interface NodesBounds {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
// }

interface StyleObject {
  [key: string]: string | undefined;
}

export function downloadImage(dataUrl: string, fileName: string) {
  const a = document.createElement('a');
  a.setAttribute('download', fileName);
  a.setAttribute('href', dataUrl);
  a.click();
}

async function benchmarkAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  console.log(`${name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

function benchmark<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateSVG(getNodes: () => any[]): Promise<string> {
  const totalStart = performance.now();

  try {
    const nodesBounds = benchmark('getRectOfNodes', () => getRectOfNodes(getNodes()));
    const width = nodesBounds.width + 80;
    const height = nodesBounds.height + 80;
    const transform = benchmark('getTransformForBounds', () =>
      getTransformForBounds(nodesBounds, width, height, 0.5, 2),
    );

    const elSearchStart = performance.now();
    const el = document.querySelector('.react-flow__viewport') as HTMLElement;
    const elSearchEnd = performance.now();
    console.log(`Element search took ${(elSearchEnd - elSearchStart).toFixed(2)}ms`);

    if (!el) {
      throw new Error('Flow element not found');
    }

    const dataUrl = await benchmarkAsync('toSvg', () =>
      toSvg(el, {
        width: width,
        height: height,
        style: {
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }),
    );

    const encodedSvgString = dataUrl.split(',')[1];
    const svgString = benchmark('decodeURIComponent', () => decodeURIComponent(encodedSvgString));

    const step1 = benchmark('implementGroupings', () =>
      implementGroupings(removeStyleTags(svgString), analyzeRemainingStyles(svgString)),
    );
    const step2 = step1;

    const totalEnd = performance.now();
    console.log(`Total execution time: ${(totalEnd - totalStart).toFixed(2)}ms`);

    return step2;
  } catch (error) {
    console.error('Error in generateSVG:', error);
    throw error;
  }
}

const canvasDimensionLimit = 16384;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generatePNGBase64(getNodes: () => any[]): Promise<string> {
  const canvasAreaTestResults = await canvasSize.maxArea({
    max: 18000,
    min: 1,
    step: 300,
    usePromise: true,
  });

  const canvasWidthTestResults = await canvasSize.maxWidth({
    max: 65500,
    min: 1,
    step: 5000,
    usePromise: true,
  });

  const maxArea = canvasAreaTestResults.width * canvasAreaTestResults.height;
  console.log('maxArea: ', maxArea);
  const maxWidth = canvasWidthTestResults.width;
  const maxHeight = maxWidth; // Set maxHeight to be the same as maxWidth

  console.log('maxWidth/height: ', maxWidth);

  const padding = 20;
  const resolution = 1.5;

  const nodes = getNodes();
  console.log('nodes: ', nodes);
  const nodesBounds = getNodesBounds(nodes);

  console.log('nodesBounds: ', nodesBounds);

  const width = nodesBounds.width * resolution + 2 * padding;
  const height = nodesBounds.height * resolution + 2 * padding;
  const aspectRatio = width / height;

  let imageWidth = width;
  let imageHeight = height;

  console.log('initial width/height: ', imageWidth, imageHeight);

  // Check if the scaled size exceeds the max area, max width, or max height
  if (imageWidth * imageHeight > maxArea || imageWidth > maxWidth || imageHeight > maxHeight) {
    console.log('image doesnt fit', imageWidth * imageHeight > maxArea, imageWidth > maxWidth, imageHeight > maxHeight);
    // Reduce size to fit within all limits
    const areaConstrainedWidth = Math.sqrt(maxArea * aspectRatio);
    const areaConstrainedHeight = areaConstrainedWidth / aspectRatio;

    if (aspectRatio > 1) {
      imageWidth = Math.min(areaConstrainedWidth, maxWidth);
      imageHeight = imageWidth / aspectRatio;
      if (imageHeight > maxHeight) {
        imageHeight = maxHeight;
        imageWidth = imageHeight * aspectRatio;
      }
    } else {
      imageHeight = Math.min(areaConstrainedHeight, maxHeight);
      imageWidth = imageHeight * aspectRatio;
      if (imageWidth > maxWidth) {
        imageWidth = maxWidth;
        imageHeight = imageWidth / aspectRatio;
      }
    }
  }

  // Ensure the final dimensions don't exceed maxArea
  if (imageWidth * imageHeight > maxArea) {
    console.log('image still too big');
    const scale = Math.sqrt(maxArea / (imageWidth * imageHeight));
    imageWidth *= scale;
    imageHeight *= scale;
  }

  // TILING

  console.log('final width/height/area: ', imageWidth, imageHeight, imageWidth * imageHeight);

  // Calculate the number of tiles needed

  const tileWidth = Math.min(canvasDimensionLimit, imageWidth);
  const tileHeight = Math.min(canvasDimensionLimit, imageHeight);

  const numCols = Math.ceil(imageWidth / tileWidth);
  const numRows = Math.ceil(imageHeight / tileHeight);

  console.log('Tiles:', numCols, 'x', numRows, 'Tile size:', tileWidth, 'x', tileHeight);

  try {
    const finalImageDataUrl = await renderAndCombineTiles(
      imageWidth,
      imageHeight,
      numCols,
      numRows,
      tileWidth,
      tileHeight,
      nodesBounds,
    );

    if (finalImageDataUrl) {
      // downloadImage(
      //   `data:image/png;base64,${finalImageDataUrl}`,
      //   `reactflow_${Math.round(imageWidth)}x${Math.round(imageHeight)}.png`,
      // );
      return finalImageDataUrl;
    } else {
      throw new Error('Failed to generate image');
    }
  } catch (error) {
    console.error('Error generating PNG:', error);
    throw error;
  }

  // END TILING

  // const zoom = Math.min(
  //   imageWidth / (nodesBounds.width + 2 * padding),
  //   imageHeight / (nodesBounds.height + 2 * padding),
  // );

  // const x = -(nodesBounds.x - padding) * zoom + (imageWidth - (nodesBounds.width + 2 * padding) * zoom) / 2;
  // const y = -(nodesBounds.y - padding) * zoom + (imageHeight - (nodesBounds.height + 2 * padding) * zoom) / 2;

  // console.log('final width/height/area: ', imageWidth, imageHeight, imageWidth * imageHeight);
  // console.log('x/y/zoom: ', x, y, zoom);

  // toPng(document.querySelector('.react-flow__viewport'), {
  //   skipAutoScale: true,
  //   backgroundColor: '#ffffff',
  //   width: imageWidth,
  //   height: imageHeight,
  //   style: {
  //     width: imageWidth,
  //     height: imageHeight,
  //     transform: `translate(${x}px, ${y}px) scale(${zoom})`,
  //   },
  // }).then((dataUrl) => downloadImage(dataUrl, `reactflow_${Math.round(imageWidth)}x${Math.round(imageHeight)}.png`));

  // === OLD CODE ===

  // console.log('=== generatePNGBase64 ===');
  // console.log('canvasAreaTestResults: ', canvasAreaTestResults);
  // console.log('canvasWidthTestResults: ', canvasWidthTestResults);

  // const resolution = 300;

  // const padding = 40;
  // const maxArea = canvasAreaTestResults.width * canvasAreaTestResults.height;

  // const nodes = getNodes();
  // // console.log('nodes: ', nodes);
  // if (!nodes) {
  //   throw new Error('No nodes found');
  // }

  // const nodesBounds = getRectOfNodes(nodes);
  // if (!nodesBounds) {
  //   throw new Error('Unable to calculate node bounds');
  // }

  // console.log('nodesBounds: ', nodesBounds);

  // const { width, height } = calculateDimensions(nodesBounds, resolution, padding, maxArea);

  // console.log('final width/height: ', width, height);

  // const tileWidth = width; //canvasAreaTestResults.width;
  // const tileHeight = height; //canvasAreaTestResults.height;

  // const numCols = Math.ceil(width / tileWidth);
  // const numRows = Math.ceil(height / tileHeight);

  // console.log('numCols/numRows: ', numCols, numRows);

  // try {
  //   const tileDataUrls = await renderTiles(width, height, numCols, numRows, tileWidth, tileHeight, nodesBounds);
  //   // const finalDataUrl = await combineTiles(tileDataUrls, width, height, numCols, tileWidth, tileHeight);

  //   // if (finalDataUrl) {
  //   //   return finalDataUrl;
  //   // } else {
  //   //   throw new Error('Failed to generate final image data URL');
  //   // }
  // } catch (error) {
  //   console.error('Error generating image:', error);
  //   throw error;
  // }
}

// function loadImage(dataUrl: string): Promise<HTMLImageElement> {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = (error) => {
//       console.error('Error loading image:', error);
//       reject(new Error('Failed to load image'));
//     };
//     img.src = dataUrl;
//   });
// }

// function renderTiles(
//   width: number,
//   height: number,
//   numCols: number,
//   numRows: number,
//   tileWidth: number,
//   tileHeight: number,
//   nodesBounds: Rect,
// ): Promise<string[]> {
//   console.log('== renderTiles');

//   const transform = getTransformForBounds(nodesBounds, width, height, 0.5, 2);

//   console.log('getTransformForBounds result: ', transform);

//   if (!transform) {
//     return Promise.reject(new Error('Failed to get transform for bounds'));
//   }

//   const tiles: Promise<string>[] = [];

//   for (let row = 0; row < numRows; row++) {
//     for (let col = 0; col < numCols; col++) {
//       const useTileWidth = Math.min(tileWidth, width - col * tileWidth);
//       const useTileHeight = Math.min(tileHeight, height - row * tileHeight);
//       console.log(
//         'tileNumber: ',
//         row * numCols + col + 1,
//         useTileWidth,
//         useTileHeight,
//         col,
//         row,
//         tileWidth,
//         tileHeight,
//       );

//       tiles.push(renderTile(useTileWidth, useTileHeight, col, row, transform, tileWidth, tileHeight));
//     }
//   }

//   return Promise.all(tiles);
// }

// function renderTile(
//   useTileWidth: number,
//   useTileHeight: number,
//   col: number,
//   row: number,
//   transform: [number, number, number],
//   tileWidth: number,
//   tileHeight: number,
// ): Promise<string> {
//   console.log('== renderTile', useTileWidth, useTileHeight);
//   console.log(
//     'transform:',
//     `translate(${transform[0] - col * tileWidth}px, ${transform[1] - row * tileHeight}px) scale(${transform[2]})`,
//   );

//   const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
//   if (!viewport) {
//     return Promise.reject(new Error('Viewport element not found'));
//   }

//   return toPng(viewport, {
//     backgroundColor: '#ffffff', // can also make it 'transparent'
//     width: useTileWidth,
//     height: useTileHeight,
//     style: {
//       width: `${useTileWidth}px`,
//       height: `${useTileHeight}px`,
//       transform: `translate(${transform[0] - col * tileWidth}px, ${transform[1] - row * tileHeight}px) scale(${
//         transform[2]
//       })`,
//     },
//   });
// }

// function combineTiles(
//   tileDataUrls: string[],
//   width: number,
//   height: number,
//   numCols: number,
//   tileWidth: number,
//   tileHeight: number,
// ): Promise<string | null> {
//   console.log('== combineTiles start ==');
//   console.log('Input parameters:', { width, height, numCols, tileWidth, tileHeight });
//   console.log('Number of tile data URLs:', tileDataUrls.length);

//   try {
//     let canvas: HTMLCanvasElement | OffscreenCanvas;
//     let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

//     if (typeof OffscreenCanvas !== 'undefined') {
//       canvas = new OffscreenCanvas(width, height);
//       ctx = canvas.getContext('2d');
//       console.log('Using OffscreenCanvas');
//     } else {
//       canvas = document.createElement('canvas');
//       canvas.width = width;
//       canvas.height = height;
//       ctx = canvas.getContext('2d');
//       console.log('Using DOM Canvas');
//     }

//     console.log('Canvas created with dimensions:', width, 'x', height);

//     if (!ctx) {
//       throw new Error('Failed to get canvas context');
//     }

//     return Promise.all(
//       tileDataUrls.map((url, index) => {
//         console.log(`Loading image ${index + 1}/${tileDataUrls.length}`);
//         return loadImage(url);
//       }),
//     )
//       .then((images) => {
//         console.log('All images loaded, total:', images.length);
//         try {
//           images.forEach((img, index) => {
//             const col = index % numCols;
//             const row = Math.floor(index / numCols);
//             const x = col * tileWidth;
//             const y = row * tileHeight;
//             console.log(`Drawing image ${index + 1} at (${x}, ${y})`);
//             ctx!.drawImage(img, x, y);
//           });

//           if (canvas instanceof OffscreenCanvas) {
//             return canvas.convertToBlob({ type: 'image/png' }).then((blob) => blobToBase64(blob));
//           } else {
//             const dataUrl = canvas.toDataURL('image/png');
//             return Promise.resolve(dataUrl.split(',')[1]);
//           }
//         } catch (error) {
//           console.error('Error while drawing images:', error);
//           throw error;
//         }
//       })
//       .then((finalResult) => {
//         console.log('Final result length:', finalResult.length);
//         if (!finalResult) {
//           throw new Error('Generated data is invalid');
//         }
//         return finalResult;
//       })
//       .catch((error) => {
//         console.error('Error while loading or processing images:', error);
//         throw error;
//       });
//   } catch (error) {
//     console.error('Error in combineTiles:', error);
//     return Promise.reject(error);
//   }
// }

async function renderAndCombineTiles(
  width: number,
  height: number,
  numCols: number,
  numRows: number,
  tileWidth: number,
  tileHeight: number,
  nodesBounds: Rect,
): Promise<string> {
  console.log('== renderAndCombineTiles');

  const transform = getTransformForBounds(nodesBounds, width, height, 0.5, 2);

  console.log('getTransformForBounds result: ', transform);

  if (!transform) {
    throw new Error('Failed to get transform for bounds');
  }

  let canvas: HTMLCanvasElement | OffscreenCanvas;
  let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

  console.log('creative main canvas with size: ', width, height);
  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext('2d');
    console.log('Using OffscreenCanvas');
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    console.log('Using DOM Canvas');
  }

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  let i = 0;
  const c = document.createElement('canvas');
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      i++;
      const useTileWidth = Math.min(tileWidth, width - col * tileWidth);
      const useTileHeight = Math.min(tileHeight, height - row * tileHeight);
      console.log(
        'Rendering tile:',
        row * numCols + col + 1,
        useTileWidth,
        useTileHeight,
        col,
        row,
        tileWidth,
        tileHeight,
      );

      // tileDataUrl = await renderTile(useTileWidth, useTileHeight, col, row, transform, tileWidth, tileHeight, c);
      // tileImage = await loadImage(tileDataUrl);

      // const x = col * tileWidth;
      // const y = row * tileHeight;
      // console.log(`Drawing tile at (${x}, ${y})`);
      // ctx.drawImage(tileImage, x, y);

      const tileCanvas = await renderTile(useTileWidth, useTileHeight, col, row, transform, tileWidth, tileHeight, c);

      // //  DEBUG
      // // Create a temporary canvas for the tile
      // const tileCanvas = document.createElement('canvas');
      // tileCanvas.width = useTileWidth;
      // tileCanvas.height = useTileHeight;
      // const tileCtx = tileCanvas.getContext('2d');

      // // Fill the tile with a random color
      // if (tileCtx) {
      //   tileCtx.fillStyle = getRandomColor();
      //   tileCtx.fillRect(0, 0, useTileWidth, useTileHeight);

      //   // Add tile number for easier identification
      //   tileCtx.fillStyle = 'white';
      //   tileCtx.font = '20px Arial';
      //   tileCtx.textAlign = 'center';
      //   tileCtx.textBaseline = 'middle';
      //   tileCtx.fillText(`${i}`, useTileWidth / 2, useTileHeight / 2);
      // }

      // END DEBUG

      const x = col * tileWidth;
      const y = row * tileHeight;
      console.log(`Drawing tile ${i} at (${x}, ${y}) with size ${useTileWidth}x${useTileHeight}`);
      console.log('i:  ', i);
      // if (i == 1) ctx.drawImage(tileCanvas, 0, 0);
      ctx.drawImage(tileCanvas, x, y);
    }
  }

  if (canvas instanceof OffscreenCanvas) {
    console.log('Converting OffscreenCanvas to Blob');
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    return await blobToBase64(blob);
  } else {
    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl.split(',')[1];
  }
}

// function getRandomColor() {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r},${g},${b})`;
// }

function renderTile(
  useTileWidth: number,
  useTileHeight: number,
  col: number,
  row: number,
  transform: [number, number, number],
  tileWidth: number,
  tileHeight: number,
  canvas: HTMLCanvasElement,
): Promise<HTMLCanvasElement> {
  console.log('== renderTile', useTileWidth, useTileHeight);
  console.log(
    'transform:',
    `translate(${transform[0] - col * tileWidth}px, ${transform[1] - row * tileHeight}px) scale(${transform[2]})`,
  );

  const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
  if (!viewport) {
    return Promise.reject(new Error('Viewport element not found'));
  }

  return myToCanvas(
    viewport,
    {
      backgroundColor: '#ffffff',
      width: useTileWidth,
      height: useTileHeight,
      pixelRatio: 1,
      style: {
        width: `${useTileWidth}px`,
        height: `${useTileHeight}px`,
        transform: `translate(${transform[0] - col * tileWidth}px, ${transform[1] - row * tileHeight}px) scale(${
          transform[2]
        })`,
      },
    },
    canvas,
  );
}

// Helper function to convert Blob to Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).then((dataUrl: any) => dataUrl.split(',')[1]);
}

function removeStyleTags(svgString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  // Find all <style> elements
  const styleTags = doc.getElementsByTagName('style');

  // Remove each <style> element
  while (styleTags.length > 0 && styleTags[0].parentNode) {
    styleTags[0].parentNode.removeChild(styleTags[0]);
  }

  // Serialize the modified document back to a string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}

// CSS properties to exclude from extraction
// these properties will remain as inline styles
const excludedProperties: Set<StyleProperty> = new Set([]);

type StyleProperty = string;

function analyzeRemainingStyles(svgString: string): StyleProperty[][] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  const propertyValues: { [key: string]: Set<unknown> } = {};
  excludedProperties.forEach((prop) => (propertyValues[prop] = new Set()));

  const styledElements = doc.querySelectorAll('[style]');
  styledElements.forEach((element) => {
    const style = element.getAttribute('style');
    const styleObj = parseStyle(style ?? '');

    excludedProperties.forEach((prop) => {
      if (styleObj[prop]) {
        propertyValues[prop].add(styleObj[prop]);
      }
    });
  });

  const propertyGroups = [];

  const remainingProps: Set<StyleProperty> = new Set(Object.keys(propertyValues));

  while (remainingProps.size > 0) {
    let bestGroup: string[] = [];
    let bestScore = 0;

    for (const prop of remainingProps) {
      const group = [prop];
      const groupValues = new Set(propertyValues[prop]);

      for (const otherProp of remainingProps) {
        if (otherProp !== prop) {
          const combinedValues = new Set([...groupValues, ...propertyValues[otherProp]]);
          if (combinedValues.size === groupValues.size) {
            group.push(otherProp);
          }
        }
      }

      const score = group.length / groupValues.size;
      if (score > bestScore) {
        bestGroup = group;
        bestScore = score;
      }
    }

    propertyGroups.push(bestGroup);
    bestGroup.forEach((prop) => remainingProps.delete(prop));
  }

  // console.log('Recommended property groupings:');
  // propertyGroups.forEach((group, index) => {
  //   console.log(`Group ${index + 1}:`, group.join(', '));
  // });

  return propertyGroups;
}

function implementGroupings(svgString: string, propertyGroups: string[][]) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = doc.querySelector('svg');

  if (!svgElement) return svgString;

  const styleMap = new Map();
  let classCounter = 0;

  const styledElements = doc.querySelectorAll('[style]');

  styledElements.forEach((element) => {
    const style = element.getAttribute('style');
    const styleObj = parseStyle(style ?? '');

    propertyGroups.forEach((group, groupIndex) => {
      let groupStyle = '';
      group.forEach((prop) => {
        if (styleObj[prop]) {
          groupStyle += `${prop}: ${styleObj[prop]}; `;
          delete styleObj[prop];
        }
      });

      if (groupStyle) {
        if (!styleMap.has(groupStyle)) {
          const className = `og-${groupIndex}-${classCounter++}`;
          styleMap.set(groupStyle, className);
        }
        const className = styleMap.get(groupStyle);
        element.classList.add(className);
      }
    });

    // Handle any remaining properties not in groups
    let remainingStyle = '';
    for (const [prop, value] of Object.entries(styleObj)) {
      remainingStyle += `${prop}: ${value}; `;
    }

    if (remainingStyle) {
      if (!styleMap.has(remainingStyle)) {
        const className = `og-${classCounter++}`;
        styleMap.set(remainingStyle, className);
      }
      const className = styleMap.get(remainingStyle);
      element.classList.add(className);
    }

    element.removeAttribute('style');
  });

  // Create the <style> element
  const styleElement = doc.createElementNS('http://www.w3.org/2000/svg', 'style');

  let cssContent = '';
  styleMap.forEach((className, style) => {
    cssContent += `.${className} { ${style} }\n`;
  });

  // Create a text node with CDATA section
  const cdataSection = doc.createCDATASection('\n' + cssContent + '\n');
  styleElement.appendChild(cdataSection);

  // Insert the <style> element as the first child of the <svg> element
  svgElement.insertBefore(styleElement, svgElement.firstChild);

  // Serialize the modified document back to a string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}

// Helper function to parse style string into an object
function parseStyle(styleString: string): StyleObject {
  const styleObj: { [key: string]: string } = {};
  styleString.split(';').forEach((pair) => {
    const [property, value] = pair.split(':').map((item) => item.trim());
    if (property && value) {
      styleObj[property] = value;
    }
  });
  return styleObj;
}

function DownloadButton({ focusable = true }: { focusable?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getNodes } = useReactFlow();

  // SVG GENERATION
  const onClick_svg = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      generateSVG(getNodes).then((svgString: string) => {
        downloadImage('data:image/svg+xml;base64,' + btoa(svgString), 'chart.svg');
      });
    } finally {
      setIsLoading(false);
    }
  };

  // // TILE PNG
  const onClick_png = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const pngBase64 = await generatePNGBase64(getNodes);
      downloadImage('data:image/png;base64,' + pngBase64, 'org-chart.png');
    } finally {
      setIsLoading(false);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Download PNG',
      onClick: onClick_png,
    },
    {
      key: '2',
      label: 'Download SVG',
      onClick: onClick_svg,
    },
  ];

  return (
    <Panel position="top-right" style={{ marginTop: 0 }}>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button tabIndex={focusable ? 0 : -1} loading={isLoading} icon={<DownloadOutlined />}>
          Download
        </Button>
      </Dropdown>
    </Panel>
  );
}

// html-to-image library extract - modified toCanvas function to re-use the canvas object instead of re-creating it
// this improves memory usage for the tiling process.
function px(node: HTMLElement, styleProperty: string) {
  const win = node.ownerDocument.defaultView || window;
  const val = win.getComputedStyle(node).getPropertyValue(styleProperty);
  return val ? parseFloat(val.replace('px', '')) : 0;
}

function getNodeWidth(node: HTMLElement) {
  const leftBorder = px(node, 'border-left-width');
  const rightBorder = px(node, 'border-right-width');
  return node.clientWidth + leftBorder + rightBorder;
}

function getNodeHeight(node: HTMLElement) {
  const topBorder = px(node, 'border-top-width');
  const bottomBorder = px(node, 'border-bottom-width');
  return node.clientHeight + topBorder + bottomBorder;
}

function getImageSize(targetNode: HTMLElement, options: Options = {}) {
  const width = options.width || getNodeWidth(targetNode);
  const height = options.height || getNodeHeight(targetNode);

  return { width, height };
}

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img.decode = () => resolve(img) as any;
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.src = url;
  });
}

export function getPixelRatio() {
  let ratio;

  let FINAL_PROCESS;
  try {
    FINAL_PROCESS = process;
  } catch (e) {
    // pass
  }

  const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
  if (val) {
    ratio = parseInt(val, 10);
    if (Number.isNaN(ratio)) {
      ratio = 1;
    }
  }
  return ratio || window.devicePixelRatio || 1;
}

export function checkCanvasDimensions(canvas: HTMLCanvasElement) {
  if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) {
    console.log(
      'checkCanvasDimensions TRIGGERED, canvas.width: ',
      canvas.width,
      'canvas.height: ',
      canvas.height,
      'canvasDimensionLimit: ',
      canvasDimensionLimit,
    );
    if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) {
      if (canvas.width > canvas.height) {
        canvas.height *= canvasDimensionLimit / canvas.width;
        canvas.width = canvasDimensionLimit;
      } else {
        canvas.width *= canvasDimensionLimit / canvas.height;
        canvas.height = canvasDimensionLimit;
      }
    } else if (canvas.width > canvasDimensionLimit) {
      canvas.height *= canvasDimensionLimit / canvas.width;
      canvas.width = canvasDimensionLimit;
    } else {
      canvas.width *= canvasDimensionLimit / canvas.height;
      canvas.height = canvasDimensionLimit;
    }
  }
}

export async function toCanvas<T extends HTMLElement>(
  node: T,
  options: Options = {},
  canvas: HTMLCanvasElement,
): Promise<HTMLCanvasElement> {
  const { width, height } = getImageSize(node, options);
  const svg = await toSvg(node, options);
  const img = await createImage(svg);

  const context = canvas.getContext('2d')!;
  const ratio = options.pixelRatio || getPixelRatio();
  const canvasWidth = options.canvasWidth || width;
  const canvasHeight = options.canvasHeight || height;

  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;

  if (!options.skipAutoScale) {
    checkCanvasDimensions(canvas);
  }
  canvas.style.width = `${canvasWidth}`;
  canvas.style.height = `${canvasHeight}`;

  if (options.backgroundColor) {
    context.fillStyle = options.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
}

// async function myToPng<T extends HTMLElement>(
//   node: T,
//   options: Options = {},
//   canvas: HTMLCanvasElement,
// ): Promise<string> {
//   const c = await toCanvas(node, options, canvas);
//   return c.toDataURL();
// }

async function myToCanvas<T extends HTMLElement>(
  node: T,
  options: Options = {},
  canvas: HTMLCanvasElement,
): Promise<HTMLCanvasElement> {
  return toCanvas(node, options, canvas);
}

export default DownloadButton;
