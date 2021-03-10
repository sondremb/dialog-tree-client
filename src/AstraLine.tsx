import React, { useState } from 'react';

type Props = { content: LineContent; fromPlayer: boolean };

export const AstraLine = (props: Props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p
        style={{
          whiteSpace: 'pre-wrap',
          textAlign: props.fromPlayer ? 'right' : 'left',
          width: '40%',
          margin: 'auto',
        }}
      >
        {props.content}
      </p>
    </div>
  );
};
