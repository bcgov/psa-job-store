import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { FitViewOptions, PanelPosition } from 'reactflow';

export type ControlsProps = HTMLAttributes<HTMLDivElement> & {
  onFitView?: () => void;
  onInteractiveChange?: (interactiveStatus: boolean) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  showZoom?: boolean;
  showFitView?: boolean;
  showInteractive?: boolean;
  fitViewOptions?: FitViewOptions;
  position?: PanelPosition;
  focusable?: boolean;
};

export type ControlsButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
