import { Node } from 'reactflow';
import { Elements } from '../interfaces/elements.interface';

enum ExcludedClassifications {
  BAND_1 = '185001',
  BAND_2 = '185002',
  BAND_3 = '185003',
  BAND_4 = '185004',
  BAND_5 = '185005',
  BAND_6 = '185006',
  BAND_1_MS = '024001',
  BAND_2_MS = '024002',
  BAND_3_MS = '024003',
  BAND_4_MS = '024004',
  BAND_5_MS = '024005',
  BAND_6_MS = '024006',
  BAND_1_OIC = '155001',
  BAND_2_OIC = '155002',
  BAND_3_OIC = '155003',
  BAND_4_OIC = '155004',
  BAND_5_OIC = '155005',
  BAND_6_OIC = '155006',
}

const excludedClassifications = Object.values(ExcludedClassifications);

export const findExcludedManager = (targetNodeId: string, elements: Elements): Node | undefined => {
  const { edges, nodes } = elements;

  const node = nodes.find((node) => node.id === targetNodeId);
  if (node) {
    if (excludedClassifications.includes(node.data.classification.id)) {
      return node;
    } else {
      const edge = edges.find((edge) => edge.target === targetNodeId);

      if (edge != null) {
        return findExcludedManager(edge.source, elements);
      } else {
        return undefined;
      }
    }
  } else {
    return undefined;
  }
};
