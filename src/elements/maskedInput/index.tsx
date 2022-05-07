// @ts-nocheck
import { TextFieldProps } from '@mui/material/TextField';
import { FC } from 'react';
import InputMask, { Props } from "react-input-mask";
import { TextInput } from '../textinput';

export const MaskedInput: FC<TextFieldProps & Props> = (props) => <InputMask
  {...props}
  mask={props.mask}
  value={props.value}
  onChange={props.onChange}
  onInput={props.onInput} >
  {(inputProps: TextFieldProps) => <TextInput {...inputProps} />}
</InputMask >