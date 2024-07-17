import { DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { toPng, toSvg } from 'html-to-image';
// import { jsPDF } from 'jspdf';
import { Panel, Rect, getRectOfNodes, getTransformForBounds, useReactFlow } from 'reactflow';
// import 'svg2pdf.js';

interface NodesBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface StyleObject {
  [key: string]: string | undefined;
}

function downloadImage(dataUrl: string, fileName: string) {
  const a = document.createElement('a');
  a.setAttribute('download', fileName);
  a.setAttribute('href', dataUrl);
  a.click();
}

// function downloadPDF(svgString) {
//   const doc = new jsPDF();

//   // Parse the SVG string
//   const parser = new DOMParser();
//   const svgElement = parser.parseFromString(svgString, 'image/svg+xml').documentElement;

//   console.log('svgString: ', svgString);
//   console.log('width/height: ', doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
//   console.log('svgElement: ', svgElement);

//   // Convert SVG to PDF
//   doc
//     .svg(svgElement, {
//       x: 0,
//       y: 0,
//       width: doc.internal.pageSize.getWidth(),
//       height: doc.internal.pageSize.getHeight(),
//     })
//     .then(() => {
//       // Save the PDF
//       doc.save('reactflow.pdf');
//     });
// }

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

// function removeStyleAttributes(svgString) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(svgString, 'image/svg+xml');

//   // Remove style attributes from all elements
//   const allElements = doc.getElementsByTagName('*');
//   for (const element of allElements) {
//     if (element.hasAttribute('style')) {
//       element.removeAttribute('style');
//     }
//   }

//   // Remove <style> tags
//   const styleTags = doc.getElementsByTagName('style');
//   while (styleTags.length > 0) {
//     styleTags[0].parentNode.removeChild(styleTags[0]);
//   }

//   // Serialize back to string
//   const serializer = new XMLSerializer();
//   return serializer.serializeToString(doc);
// }

// CSS properties to exclude from extraction
// these properties will remain as inline styles
const excludedProperties: Set<StyleProperty> = new Set([
  // 'transform',
  // 'transform-origin',
  // 'stroke',
  // 'block-size',
  // 'inset',
  // 'cursor',
  // 'd',
  // 'display',
  // 'fill',
  // 'height',
  // 'inline-size',
  // 'inset-block',
  // 'inset-inline',
  // 'marker',
  // 'overflow-clip-margin',
  // 'padding-block',
  // 'padding',
  // 'padding-inline',
  // 'perspective-origin',
  // 'pointer-events',
  // 'position',
  // 'margin',
  // 'margin-inline',
  // 'unicode-bidi',
  // 'width',
  // 'z-index',
  // 'flex-flow',
  // 'border-end-start-radius',
  // 'border-end-end-radius',
  // 'border-radius',
  // 'touch-action',
  // 'marker-end',
  // 'marker-mid',
  // 'marker-start',
  // 'stroke-opacity',
  // 'stroke-width',
  // 'user-select',
  // 'min-height',
  // 'min-block-size',
  // 'margin-block',
  // 'list-style',
  // 'font-weight',
  // 'border-start-start-radius',
  // 'border-start-end-radius',
  // 'border-width',
  // 'border-style',
  // 'border-color',
  // 'border-block-end',
  // 'place-content',
  // 'min-inline-size',
  // 'min-width',
  // 'border-inline-start',
  // 'border-inline-end',
  // 'border-block-start',
  // 'background',
  // 'place-items',
  // 'white-space',
  // 'text-overflow',
  // 'overflow',
  // 'flex',
  // 'word-break',
  // '-webkit-text-stroke',
  // '-webkit-text-fill-color',
  // 'text-emphasis',
  // 'text-decoration',
  // 'outline',
  // 'column-rule',
  // 'color',
  // 'caret-color',
  // 'font-style',
  // 'max-inline-size',
  // 'max-width',
  // 'visibility',
  // 'opacity',
  // 'border-image',
]);

// Remove style attributes from all elements and move them to a <style> element as classes
// function optimizeStyles(svgString: string): string {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(svgString, 'image/svg+xml');
//   const svgElement = doc.querySelector('svg');

//   if (!svgElement) return '';

//   const styleMap = new Map();
//   let classCounter = 0;

//   // Find all elements with style attributes
//   const styledElements = doc.querySelectorAll('[style]');

//   styledElements.forEach((element) => {
//     const style = element.getAttribute('style');
//     const styleObj = parseStyle(style ?? '');

//     let extractedStyle = '';
//     let remainingStyle = '';

//     for (const [property, value] of Object.entries(styleObj)) {
//       if (excludedProperties.has(property)) {
//         remainingStyle += `${property}: ${value}; `;
//       } else {
//         extractedStyle += `${property}: ${value}; `;
//       }
//     }

//     if (extractedStyle) {
//       if (!styleMap.has(extractedStyle)) {
//         const className = `oc-${classCounter++}`;
//         styleMap.set(extractedStyle, className);
//       }

//       const className = styleMap.get(extractedStyle);
//       element.classList.add(className);
//     }

//     if (remainingStyle) {
//       element.setAttribute('style', remainingStyle.trim());
//     } else {
//       element.removeAttribute('style');
//     }
//   });

//   // Create the <style> element
//   const styleElement = doc.createElementNS('http://www.w3.org/2000/svg', 'style');

//   let cssContent = '';
//   styleMap.forEach((className, style) => {
//     cssContent += `.${className} { ${style} }\n`;
//   });

//   // Create a text node with CDATA section
//   const cdataSection = doc.createCDATASection('\n' + cssContent + '\n');
//   styleElement.appendChild(cdataSection);

//   // Insert the <style> element as the first child of the <svg> element
//   svgElement.insertBefore(styleElement, svgElement.firstChild);

//   // Serialize the modified document back to a string
//   const serializer = new XMLSerializer();
//   return serializer.serializeToString(doc);
// }

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

// function replaceDivsWithG(svgString) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(svgString, 'image/svg+xml');

//   // Find all div elements
//   const divs = doc.getElementsByTagName('div');

//   // Convert the HTMLCollection to an array because it's live and will be modified
//   const divsArray = Array.from(divs);

//   divsArray.forEach((div) => {
//     // Create a new g element
//     const g = doc.createElementNS('http://www.w3.org/2000/svg', 'g');

//     // Copy all attributes from div to g
//     for (let i = 0; i < div.attributes.length; i++) {
//       const attr = div.attributes[i];
//       g.setAttribute(attr.name, attr.value);
//     }

//     // Move all child nodes from div to g
//     while (div.firstChild) {
//       g.appendChild(div.firstChild);
//     }

//     // Replace div with g
//     div.parentNode.replaceChild(g, div);
//   });

//   // Serialize the modified document back to a string
//   const serializer = new XMLSerializer();
//   return serializer.serializeToString(doc);
// }

function DownloadButton() {
  const { getNodes } = useReactFlow();

  // svg with optimizer
  // const onClick = () => {
  //   const nodesBounds = getRectOfNodes(getNodes());
  //   const width = nodesBounds.width + 80;
  //   const height = nodesBounds.height + 80;
  //   const transform = getTransformForBounds(nodesBounds, width, height, 0.5, 2);

  //   toSvg(document.querySelector('.react-flow__viewport'), {
  //     width: width,
  //     height: height,
  //     style: {
  //       transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
  //     },
  //   }).then((dataUrl) => {
  //     // Extract SVG string from data URL
  //     // console.log('dataUrl: ', dataUrl);
  //     // console.log('dataUrl.split(', ')[1]: ', dataUrl.split(',')[1]);
  //     const encodedSvgString = dataUrl.split(',')[1];
  //     const svgString = decodeURIComponent(encodedSvgString);

  //     console.log('svgString: ', svgString);

  //     console.log('Original SVG string:', svgString);
  //     logPseudoElements(svgString);

  //     const svgWithoutPseudoElements = removePseudoElements(svgString);
  //     console.log('SVG without pseudo-elements:', svgWithoutPseudoElements);

  //     const noStyleSvg = removeStyleAttributes(svgString);

  //     // Optimize SVG using SVGO
  //     const optimizedSvg = optimize(removeStyleTags(svgString), {
  //       plugins: [
  //         // 'removeDoctype',
  //         // 'removeXMLProcInst',
  //         // 'removeComments',
  //         // 'removeMetadata',
  //         // 'removeEditorsNSData',
  //         // 'cleanupAttrs',
  //         // 'minifyStyles',
  //         // 'convertStyleToAttrs',
  //         // 'cleanupIds',
  //         // 'removeRasterImages',
  //         // 'removeUselessDefs',
  //         // 'cleanupNumericValues',
  //         // 'cleanupListOfValues',
  //         // 'convertColors',
  //         // 'removeUnknownsAndDefaults',
  //         // 'removeNonInheritableGroupAttrs',
  //         // 'removeUselessStrokeAndFill',
  //         // 'removeViewBox',
  //         // 'cleanupEnableBackground',
  //         // 'removeHiddenElems',
  //         // 'removeEmptyText',
  //         // 'convertShapeToPath',
  //         // 'moveElemsAttrsToGroup',
  //         // 'moveGroupAttrsToElems',
  //         // 'collapseGroups',
  //         // 'convertPathData',
  //         // 'convertTransform',
  //         // 'removeEmptyAttrs',
  //         // 'removeEmptyContainers',
  //         // 'mergePaths',
  //         // 'removeUnusedNS',
  //         // 'sortAttrs',
  //         // 'removeTitle',
  //         // 'removeDesc',
  //         // 'removeDimensions',
  //         // // 'removeAttrs',
  //         // 'removeEmptyAttrs',
  //         // 'removeStyleElement',
  //         // 'removeScriptElement',
  //       ],
  //     });

  //     // Convert optimized SVG back to data URL
  //     const optimizedDataUrl = 'data:image/svg+xml;base64,' + btoa(optimizedSvg.data);

  //     downloadImage(optimizedDataUrl);
  //   });
  // };

  // function appendRedCircle(svgString) {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(svgString, 'image/svg+xml');
  //   const svg = doc.documentElement;

  //   // Create a new circle element
  //   const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  //   circle.setAttribute('cx', '150');
  //   circle.setAttribute('cy', '150');
  //   circle.setAttribute('r', '50');
  //   circle.setAttribute('fill', 'red');

  //   // Append the circle to the SVG
  //   svg.appendChild(circle);

  //   // Convert the modified SVG back to a string
  //   return new XMLSerializer().serializeToString(svg);
  // }

  // SVG GENERATION
  const onClick_svg = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const width = nodesBounds.width + 80;
    const height = nodesBounds.height + 80;
    const transform = getTransformForBounds(nodesBounds, width, height, 0.5, 2);

    //   toSvg(document.querySelector('.react-flow__viewport'), {
    //     width: width,
    //     height: height,
    //     style: {
    //       transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
    //     },

    const el = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!el) {
      console.error('No react-flow__viewport found');
      return;
    }

    toSvg(el, {
      width: width,
      height: height,
      style: {
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(function (dataUrl) {
      const encodedSvgString = dataUrl.split(',')[1];
      const svgString = decodeURIComponent(encodedSvgString);

      // 1. remove all style tags - these don't seem to affect rendering
      // 2. optimize styles - move inline styles to classes
      const step1 = implementGroupings(removeStyleTags(svgString), analyzeRemainingStyles(svgString));
      // 3. analyze remaining styles and group them
      const step2 = step1; //implementGroupings(step1, analyzeRemainingStyles(step1));

      // downloadPDF(appendRedCircle(step2));
      downloadImage('data:image/svg+xml;base64,' + btoa(step2), 'chart.svg');
    });
  };

  // // TILE PNG
  const onClick_png = (): void => {
    const resolution = 200;
    const tileSize = 16382;
    const padding = 40;
    const maxDimension = 16382 * 3;

    const nodes = getNodes();
    if (!nodes) {
      console.error('No nodes found');
      return;
    }

    const nodesBounds = getRectOfNodes(nodes);
    if (!nodesBounds) {
      console.error('Unable to calculate node bounds');
      return;
    }

    const { width, height } = calculateDimensions(nodesBounds, resolution, padding, maxDimension);

    console.log('nodesBounds: ', nodesBounds, width, height);

    const numCols = Math.ceil(width / tileSize);
    const numRows = Math.ceil(height / tileSize);

    renderTiles(width, height, numCols, numRows, tileSize, nodesBounds)
      .then((tileDataUrls) => combineTiles(tileDataUrls, width, height, numCols, tileSize))
      .then((finalDataUrl) => {
        if (finalDataUrl) {
          downloadImage(finalDataUrl, 'reactflow-large.png');
        } else {
          console.error('Failed to generate final image data URL');
        }
      })
      .catch((error) => console.error('Error generating image:', error));
  };

  interface Dimensions {
    width: number;
    height: number;
  }

  function calculateDimensions(
    nodesBounds: NodesBounds,
    resolution: number,
    padding: number,
    maxDimension: number,
  ): Dimensions {
    const rawWidth = (nodesBounds.width + padding * 2) * (resolution / 96);
    const rawHeight = (nodesBounds.height + padding * 2) * (resolution / 96);
    const scaleFactor = Math.min(1, maxDimension / Math.max(rawWidth, rawHeight));
    return {
      width: Math.ceil(rawWidth * scaleFactor),
      height: Math.ceil(rawHeight * scaleFactor),
    };
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
      return canvas.toDataURL('image/png');
    });
  }

  function loadImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = dataUrl;
    });
  }

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
