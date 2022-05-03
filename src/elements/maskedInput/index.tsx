//@ts-nocheck
import { TextFieldProps } from '@mui/material/TextField';
import InputMask, { Props } from "react-input-mask";
import { TextInput } from '../textinput';

export const MaskedInput = (props: TextFieldProps & Props) => <InputMask
  {...props}
  value={props.value}
  onChange={props.onChange}
  onInput={props.onInput} >
  {(inputProps: TextFieldProps) => <TextInput {...inputProps} />}
</InputMask >