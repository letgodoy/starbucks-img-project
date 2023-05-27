import Chip from "@mui/material/Chip";
import { TextFieldProps } from "@mui/material/TextField";
import Downshift from "downshift";
import { FC, SetStateAction, useEffect, useState } from "react";
import { TextInput } from "../textinput";

export const TagsInput: FC<TextFieldProps & {
  setTags: (item: Array<string>) => void,
  tags: Array<string>,
}> = (props) => {

  const { setTags, tags } = props;

  const [tagInput, setTagInput] = useState(''); // Estado para o valor do input de tag

  const handleTagInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Enter' || event.key === ';') {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  // useEffect(() => {
  //   setSelectedItem(tags);
  // }, [tags]);

  // useEffect(() => {
  //   selectedTags(selectedItem);
  // }, [selectedItem, selectedTags]);

  return (
    <>
      <TextInput
        label="Tags"
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
        {...props}
      />
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => removeTag(tag)}
          style={{ margin: '0.5rem' }}
        />
      ))}
    </>

  );
}
