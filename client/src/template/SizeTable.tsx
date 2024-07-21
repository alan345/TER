import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  initSize: number;
};
export function SizeTable(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");
  const [sizeInput, setSizeInput] = React.useState(
    sizeUrl || props.initSize.toString()
  );

  return (
    <div className="flex justify-end">
      <input
        type="number"
        className="w-16"
        placeholder="Lines"
        value={sizeInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchParams({ size: sizeInput });
          }
        }}
        onChange={(e) => setSizeInput(e.target.value)}
      />
    </div>
  );
}
