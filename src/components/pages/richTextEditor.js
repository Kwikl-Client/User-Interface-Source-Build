import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const MyRichTextEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default MyRichTextEditor;
