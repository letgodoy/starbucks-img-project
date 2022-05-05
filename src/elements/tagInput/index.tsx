import Chip from "@mui/material/Chip";
import { TextFieldProps } from "@mui/material/TextField";
import Downshift from "downshift";
import { FC, useEffect, useState } from "react";
import { TextInput } from "../textinput";

export const TagsInput: FC<TextFieldProps & {
  selectedTags: (item: Array<string>) => void,
  tags: Array<string>,
}> = (props) => {

  const { selectedTags, placeholder, tags, ...other } = props;

  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]);

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  const handleKeyDown = (event: any) => {
    event.stopPropagation()
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  const handleChange = (item: any) => {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item: any) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({ getInputProps, getRootProps }: any) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder
        });
        return (
          <TextInput
          sx={{ marginY: 2}}
          {...getRootProps({}, {suppressRefError: true})}
            InputProps={{
              startAdornment: selectedItem.map(item => (
                <Chip
                  key={item}
                  tabIndex={-1}
                  label={item}
                  style={{ marginLeft: 3, marginRight: 3 }}
                  onDelete={handleDelete(item)}
                />
              )),
              onBlur,
              onChange: (event: any) => {
                handleInputChange(event);
                onChange(event);
              },
              onFocus
            }}
            {...other}
            {...inputProps}
          />
        );
      }}
    </Downshift>
  );
}
