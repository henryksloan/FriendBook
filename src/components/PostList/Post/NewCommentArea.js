import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getFullName } from '../../../utils/profile';

function NewCommentArea({ replyTo, inputRef, onSubmit }) {
  const [text, setText] = useState("");

  function onKeyPress(e) {
    if (e.key === 'Enter' && text !== '') {
      const replyString = replyTo ? (getFullName(replyTo) + ' ') : '';
      const comment = {
        name: "alex_doe",
        content: replyString + text,
      };
      if (onSubmit) {
        onSubmit(comment);
      }
      setText("");
    }
  }

  const placeholder = (replyTo) ? 'Write a reply...' : 'Write a comment...';
  return (
    <input className="NewCommentArea" type='text' placeholder={placeholder}
      rows='1' cols='65' onKeyPress={onKeyPress}
      onChange={(e) => setText(e.target.value)} value={text}
      autoComplete='off' ref={inputRef} />
  );
}

NewCommentArea.propTypes = {
  replyTo: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  onSubmit: PropTypes.func
};

export default NewCommentArea;
