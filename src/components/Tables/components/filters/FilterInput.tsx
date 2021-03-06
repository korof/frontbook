import React from 'react';
import { ChangeEvent } from 'react';
import { Label, Input } from 'semantic-ui-react';

interface InputDropdownProps {
  label?: string;
  tail?: string;
  width?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FilterInput = ({ label = 'min', tail, width = '80%', onChange = e => null }: InputDropdownProps) => (
  <Input
    size="mini"
    labelPosition={tail ? 'right' : 'left'}
    type="text"
    placeholder="value"
    style={{ width }}
    aria-label="filter records"
  >
    <Label basic>{label}</Label>
    <input style={{ width: tail ? '50%' : '80%' }} onChange={onChange} aria-label="filter records" />
    {tail && <Label basic>{tail}</Label>}
  </Input>
);
