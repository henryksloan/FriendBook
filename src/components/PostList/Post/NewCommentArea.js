import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewCommentArea({ type, inputRef, onSubmit }) {
  const [text, setText] = useState("");

  function onKeyPress(e) {
    if (e.key === 'Enter' && text !== '') {
      const comment = {
        name: "alex_doe",
        content: text,
      };
      if (onSubmit) {
        onSubmit(comment);
      }
      setText("");
    }
  }

  const placeholder = (type == 'reply') ? 'Write a reply...' : 'Write a comment...';
  return (
    <input className="NewCommentArea" type='text' placeholder={placeholder}
      rows='1' cols='65' onKeyPress={onKeyPress}
      onChange={(e) => setText(e.target.value)} value={text}
      autoComplete='off' ref={inputRef} />
  );
}

NewCommentArea.propTypes = {
  type: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  onSubmit: PropTypes.func
};

export default NewCommentArea;
