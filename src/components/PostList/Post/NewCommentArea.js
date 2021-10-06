import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewCommentArea({ type }) {
  const [text, setText] = useState("");

  function onKeyPress(e) {
    if (e.key === 'Enter' && text !== '') {
      // TODO
      // onSubmit();
    }
  }

  const placeholder = (type == 'reply') ? 'Write a reply...' : 'Write a comment...';
  return (
    <input className="NewCommentArea" type='text' placeholder={placeholder}
      rows='1' cols='65' onKeyPress={onKeyPress}
      onChange={(e) => setText(e.target.value)} value={text}
      autoComplete='off' />
  );
}

NewCommentArea.propTypes = {
  type: PropTypes.string
};

export default NewCommentArea;
