import { DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { toPng, toSvg } from 'html-to-image';
import { Panel, Rect, getRectOfNodes, getTransformForBounds, useReactFlow } from 'reactflow';

interface NodesBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generatePNGBase64(getNodes: () => any[]): Promise<string> {
  const resolution = 200;
  const tileSize = 16382;
  const padding = 40;
  const maxDimension = 16382 * 3;

  const nodes = getNodes();
  console.log('nodes: ', nodes);
  if (!nodes) {
    throw new Error('No nodes found');
  }

  const nodesBounds = getRectOfNodes(nodes);
  if (!nodesBounds) {
    throw new Error('Unable to calculate node bounds');
  }

  const { width, height } = calculateDimensions(nodesBounds, resolution, padding, maxDimension);

  const numCols = Math.ceil(width / tileSize);
  const numRows = Math.ceil(height / tileSize);

  try {
    const tileDataUrls = await renderTiles(width, height, numCols, numRows, tileSize, nodesBounds);
    const finalDataUrl = await combineTiles(tileDataUrls, width, height, numCols, tileSize);

    if (finalDataUrl) {
      return finalDataUrl;
    } else {
      throw new Error('Failed to generate final image data URL');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataUrl;
  });
}

function calculateDimensions(
  nodesBounds: NodesBounds,
  resolution: number,
  padding: number,
  maxDimension: number,
): { width: number; height: number } {
  let width = Math.ceil((nodesBounds.width + padding * 2) * (resolution / 72));
  let height = Math.ceil((nodesBounds.height + padding * 2) * (resolution / 72));

  if (width > maxDimension || height > maxDimension) {
    const scale = Math.min(maxDimension / width, maxDimension / height);
    width = Math.floor(width * scale);
    height = Math.floor(height * scale);
  }

  return { width, height };
}

function renderTiles(
  width: number,
  height: number,
  numCols: number,
  numRows: number,
  tileSize: number,
  nodesBounds: Rect,
): Promise<string[]> {
  const transform = getTransformForBounds(nodesBounds, width, height, 0.5, 2);
  if (!transform) {
    return Promise.reject(new Error('Failed to get transform for bounds'));
  }

  const tiles: Promise<string>[] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const tileWidth = Math.min(tileSize, width - col * tileSize);
      const tileHeight = Math.min(tileSize, height - row * tileSize);
      console.log('tileNumber: ', row * numCols + col + 1, tileWidth, tileHeight);

      tiles.push(renderTile(tileWidth, tileHeight, col, row, transform, tileSize));
    }
  }

  return Promise.all(tiles);
}

function renderTile(
  tileWidth: number,
  tileHeight: number,
  col: number,
  row: number,
  transform: [number, number, number],
  tileSize: number,
): Promise<string> {
  const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
  if (!viewport) {
    return Promise.reject(new Error('Viewport element not found'));
  }

  return toPng(viewport, {
    backgroundColor: '#ffffff', // can also make it 'transparent'
    width: tileWidth,
    height: tileHeight,
    style: {
      width: `${tileWidth}px`,
      height: `${tileHeight}px`,
      transform: `translate(${transform[0] - col * tileSize}px, ${transform[1] - row * tileSize}px) scale(${
        transform[2]
      })`,
    },
  });
}

function combineTiles(
  tileDataUrls: string[],
  width: number,
  height: number,
  numCols: number,
  tileSize: number,
): Promise<string | null> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return Promise.reject(new Error('Failed to get canvas context'));
  }

  return Promise.all(tileDataUrls.map(loadImage)).then((images) => {
    images.forEach((img, index) => {
      const col = index % numCols;
      const row = Math.floor(index / numCols);
      ctx.drawImage(img, col * tileSize, row * tileSize);
    });
    return canvas.toDataURL('image/png').split(',')[1];
  });
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

function DownloadButton() {
  const { getNodes } = useReactFlow();

  // SVG GENERATION
  const onClick_svg = () => {
    generateSVG(getNodes).then((svgString: string) => {
      downloadImage('data:image/svg+xml;base64,' + btoa(svgString), 'chart.svg');
    });
  };

  // // TILE PNG
  const onClick_png = async () => {
    const pngBase64 = await generatePNGBase64(getNodes);
    downloadImage('data:image/png;base64,' + pngBase64, 'org-chart.png');
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
    <Panel position="top-right">
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button icon={<DownloadOutlined />}>Download</Button>
      </Dropdown>
    </Panel>
  );
}

export default DownloadButton;
