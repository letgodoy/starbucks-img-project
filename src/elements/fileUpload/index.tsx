import { colors } from '@mui/material';
import { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export function FileUploadInput(props: IProps) {
  return (
    <label
      htmlFor="file"
      style={{
        width: '100%', height: '5rem', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.grey[300], border: `2px dashed ${colors.grey[600]}`,
        borderRadius: 8, cursor: 'pointer',
      }}>
      <input
        style={
          {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            visibility: 'hidden'
          }
        }
        type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        {...props}
      />
      <span>Arreste e solte sua imagem aqui ou clique parar fazer upload</span>
    </label>
  )
}