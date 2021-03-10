import React from 'react';

type Props = { content: LineContent; handleClick: Function };

export const PlayerResponse = (props: Props) => (
  <div onClick={() => props.handleClick()}>{props.content}</div>
);
