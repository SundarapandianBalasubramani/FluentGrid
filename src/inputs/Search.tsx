import { Button } from "@fluentui/react-components";
import * as React from "react";
import { TextBox } from "./TextBox";
import { Dismiss24Regular, Search24Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";

export const Search: React.FC<{
  value: string;
  disabled?: boolean;
  onChange?: (name: string, value: string) => void;
}> = ({ value, onChange, disabled }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(value);
  }, [value]);
  const onSearchChange = (
    _name: string,
    val: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data?: unknown
  ): void => {
    setSearch(val as string);
  };

  return (
    <TextBox
      placeholder="Search"
      name="search"
      disabled={disabled}
      value={search}
      onChange={onSearchChange}
      contentAfter={
        <>
          <Button
            appearance="transparent"
            icon={<Search24Regular />}
            size="small"
            onClick={() => {
              onChange?.("search", search);
            }}
          />
          <Button
            appearance="transparent"
            icon={<Dismiss24Regular />}
            size="small"
            onClick={() => {
              setSearch("");
              onChange?.("search", "");
            }}
          />
        </>
      }
    />
  );
};
