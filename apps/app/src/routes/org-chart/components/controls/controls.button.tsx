import cc from 'classcat';
import { FC, PropsWithChildren } from 'react';
import type { ControlsButtonProps } from './types/controls.types';

export const ControlsButton: FC<PropsWithChildren<ControlsButtonProps>> = ({ children, className, ...rest }) => (
  <button type="button" className={cc(['react-flow__controls-button', className])} {...rest}>
    {children}
  </button>
);
