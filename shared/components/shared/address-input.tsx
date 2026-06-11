'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="373b044bae8720707e01e5c000a7c3f8c2a94676"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
