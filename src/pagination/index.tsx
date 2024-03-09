import {
  Button,
  Dropdown,
  Text,
  makeStyles,
  shorthands,
  Option,
} from "@fluentui/react-components";
import {
  ArrowNext24Regular,
  ArrowPrevious24Regular,
} from "@fluentui/react-icons";
import { SelectionEvents, OptionOnSelectData } from "@fluentui/react-combobox";
import { EventType } from "../types/EventType";
import * as React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "calc(100% - 20px)",
    justifyContent: "flex-end",
    alignItems: "center",
    ...shorthands.gap("20px"),
    ...shorthands.padding("20px"),
    marginTop: "20px",
    marginRight: "20px",
  },
  button: {
    width: "50px",
  },
  dropdown: {
    minWidth: "80px",
    maxWidth: "200px",
  },
});
export const Pagination: React.FC<{
  hasNext?: boolean;
  pageNo: number;
  pageSizes: Array<string>;
  pageSize: Array<string>;
  onSizeChange: (event: SelectionEvents, data: OptionOnSelectData) => void;
  onPageChange: (event: EventType) => void;
}> = (props) => {
  const classes = useStyles();
  const {
    hasNext = false,
    pageNo,
    pageSizes,
    pageSize,
    onSizeChange,
    onPageChange,
  } = props;

  const onDropDownChange = (
    event: SelectionEvents,
    data: OptionOnSelectData
  ): void => {
    if (pageSize[0] !== data.optionText) onSizeChange(event, data);
  };

  return (
    <div className={classes.container}>
      <Text>{"Showing Page of:"}</Text>
      <Text>{pageNo}</Text>
      <Button
        shape="circular"
        appearance="primary"
        disabled={pageNo === 1}
        icon={<ArrowPrevious24Regular />}
        onClick={() => {
          onPageChange(EventType.Prev);
        }}
      />

      <Text>{"Size:"}</Text>
      <Dropdown
        className={classes.dropdown}
        placeholder="Size"
        selectedOptions={pageSize}
        value={pageSize[0]}
        size="medium"
        onOptionSelect={onDropDownChange}
      >
        {pageSizes.map((s) => (
          <Option key={s} text={s} value={s}>
            {s}
          </Option>
        ))}
      </Dropdown>
      <Button
        disabled={hasNext}
        appearance="primary"
        className={classes.button}
        icon={<ArrowNext24Regular />}
        onClick={() => {
          onPageChange(EventType.Next);
        }}
        shape="circular"
      />
    </div>
  );
};
