import React from "react";
import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";

type Props = {
  setSize: (size: string) => void;
};
export function SizeUsersTable(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");
  const [size, setSize] = React.useState(sizeUrl || "2");

  const handleSubmit = () => {
    console.log(size);
    setSearchParams({ size: size });
    props.setSize(size);
    // e.preventDefault();
    // searchParams.set("size", "999");
  };
  return (
    <>
      <input
        type="number"
        value={size}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        onChange={(e) => setSize(e.target.value)}
      />
    </>
  );
}
