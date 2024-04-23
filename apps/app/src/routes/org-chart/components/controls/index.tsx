import { ExpandOutlined, LockOutlined, MinusOutlined, PlusOutlined, UnlockOutlined } from '@ant-design/icons';
import cc from 'classcat';
import { memo, useEffect, useState } from 'react';
import { Panel, ReactFlowState, useReactFlow, useStore, useStoreApi } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { ControlsButton } from './controls.button';
import { ControlsProps } from './types/controls.types';

const selector = ({
  elementsSelectable,
  maxZoom,
  minZoom,
  nodesConnectable,
  transform,
  nodesDraggable,
}: ReactFlowState) => ({
  isInteractive: elementsSelectable || nodesConnectable || nodesDraggable,
  maxZoomReached: transform[2] >= maxZoom,
  minZoomReached: transform[2] <= minZoom,
});

const ControlsComponent = ({
  onFitView,
  onInteractiveChange,
  onZoomIn,
  onZoomOut,
  children,
  className,
  fitViewOptions,
  position = 'bottom-left',
  showFitView = true,
  showInteractive = true,
  showZoom = true,
  style,
}: ControlsProps) => {
  const store = useStoreApi();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isInteractive, maxZoomReached, minZoomReached } = useStore(selector, shallow);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  const onZoomInHandler = () => {
    zoomIn();
    onZoomIn?.();
  };

  const onZoomOutHandler = () => {
    zoomOut();
    onZoomOut?.();
  };

  const onFitViewHandler = () => {
    fitView(fitViewOptions);
    onFitView?.();
  };

  const onToggleInteractivity = () => {
    store.setState({
      elementsSelectable: !isInteractive,
      nodesConnectable: !isInteractive,
      nodesDraggable: !isInteractive,
    });

    onInteractiveChange?.(!isInteractive);
  };

  return (
    <Panel className={cc(['react-flow__controls', className])} position={position} style={style}>
      {showZoom && (
        <>
          <ControlsButton
            onClick={onZoomInHandler}
            className="react-flow__controls-zoomin"
            title="Zoom in"
            aria-label="Zoom in"
            disabled={maxZoomReached}
          >
            <PlusOutlined />
          </ControlsButton>
          <ControlsButton
            onClick={onZoomOutHandler}
            className="react-flow__controls-zoomout"
            title="Zoom out"
            aria-label="Zoom out"
            disabled={minZoomReached}
          >
            <MinusOutlined />
          </ControlsButton>
        </>
      )}
      {showFitView && (
        <ControlsButton
          className="react-flow_controls-fitview"
          onClick={onFitViewHandler}
          title="Fit view"
          aria-label="Fit View"
        >
          <ExpandOutlined />
        </ControlsButton>
      )}
      {showInteractive && (
        <ControlsButton
          className="react-flow__controls-interactive"
          onClick={onToggleInteractivity}
          title="Toggle interactivity"
          aria-label="Toggle interactivity"
        >
          {isInteractive ? <UnlockOutlined /> : <LockOutlined />}
        </ControlsButton>
      )}
      {children}
    </Panel>
  );
};

ControlsComponent.displayName = 'Controls';

export const Controls = memo(ControlsComponent);
