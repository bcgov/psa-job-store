/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import './initials-avatar.component.css';

function map(value: any, start1: any, stop1: any, start2: any, stop2: any) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

const getByteLength = (string: string): number => {
  return new TextEncoder().encode(string[0])[0];
};

const minCharByteValue: number = getByteLength('a');
const maxCharByteValue: number = getByteLength('z');

const minRange: number = minCharByteValue / maxCharByteValue;
const maxRange: number = 1;

const initials = (firstname: string, lastname: string) => (firstname[0] + lastname[0]).toUpperCase();

const colorByUser = ({ firstName, lastName }: IUser): string => {
  const userValue = getByteLength(firstName[0].toLowerCase()) / getByteLength(lastName[0].toLowerCase());

  return `hsl(${map(userValue, minRange, maxRange, 0, 360)},70%,30%)`;
};

interface IUser {
  firstName: string;
  lastName: string;
}

interface IProps {
  name: string;
  size?: number;
  fontSize?: string;
  lineHeight?: string;
}

export const InitialsAvatar: React.FC<IProps> = ({ name, size, fontSize, lineHeight }) => {
  // Split the name by spaces
  const nameParts = name.split(' ');
  // Extract the first name (first element) and last name (last element, or the first if there's only one)
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  return (
    <div
      aria-hidden
      className="avatar"
      style={{
        backgroundColor: colorByUser({ firstName, lastName }),
        ...(size ? { width: size.toString() + 'px', height: size.toString() + 'px' } : {}),
        ...(fontSize ? { fontSize: fontSize } : {}),
        ...(lineHeight ? { lineHeight: lineHeight } : {}),
      }}
    >
      {initials(firstName, lastName)}
    </div>
  );
};
