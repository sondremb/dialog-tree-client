import React, { useEffect, useState } from 'react';
import { DialogLine } from './DialogLine';
import { PlayerResponse } from './PlayerResponse';

type StrippedLine = { id: id; content: LineContent; responses?: StrippedLine };
// TODO this type name is a war crime
type LineWithBool = { content: string; fromPlayer: boolean };
type StateData = {
  id: number;
  content: string;
  responses: StrippedLine[];
};

// TODO ya boi did that shit again
function isStateData(data: object): data is StateData {
  return true;
}
const emptyState = {
  id: -1,
  content: '',
  responses: new Array<StrippedLine>(),
};

export const DialogContainer = () => {
  const [content, setContent] = useState(new Array<LineWithBool>());
  const useAddLine = (line: LineWithBool) => {
    setContent([...content, line]);
  };
  const [data, setData] = useState(emptyState);
  const useUpdate = (id: id) => {
    fetch(`http://localhost:8000/api/${id}`)
      .then((res) => res.json())
      .then((jRes) => (isStateData(jRes) ? (jRes as StateData) : emptyState))
      .then(setData);
  };
  const usePlayerResponse = (resp: StrippedLine) => {
    useAddLine({ content: resp.content, fromPlayer: true });
    useUpdate(resp.id);
  };
  useEffect(() => useUpdate(1), []);
  useEffect(() => useAddLine({ content: data.content, fromPlayer: false }), [
    data,
  ]);
  return (
    <div>
      {content.map((line, i) => (
        <DialogLine {...line} key={i} />
      ))}
      <br />
      {data.responses.map((resp: StrippedLine, i: number) => (
        <PlayerResponse
          key={i}
          content={resp.content}
          handleClick={() => usePlayerResponse(resp)}
        />
      ))}
    </div>
  );
};
