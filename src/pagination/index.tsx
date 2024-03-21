import {
  Button,
  makeStyles,
  shorthands,
  Label,
  useId,
  SpinButton,
  tokens,
  Slider,
  SliderProps,
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
    flexWrap: "wrap",
    justifyContent: "end",
    ...shorthands.gap("20px"),
    marginRight:"20px",
    marginTop:"20px"
  },
  slider: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  pager: {
    display: "flex",
    ...shorthands.gap("20px", "0px"),
    "& div": {
      display: "flex",
      flexDirection: "column",          
      justifyContent: "center",
      alignContent:'center',
      "> label": {
        marginBottom: tokens.spacingVerticalXXS,
      }     
    },
  },  
  button: {
    width: "50px",
  },
  spinbutton: {
    minWidth: "40px",
    maxWidth: "50px",
  },
});
export const Pagination: React.FC<{
  hasNext?: boolean;
  pageNo: number;
  pageSizes: Array<string>;
  pageSize: Array<number | string>;
  onSizeChange: (event: SelectionEvents, data: OptionOnSelectData) => void;
  onPageChange: (event: EventType) => void;
}> = (props) => {
  const classes = useStyles();
  const {
    hasNext = false,
    pageNo,

    onPageChange,
  } = props;

  const spinBtnId = useId();
  const sliderId = useId();

  // const onDropDownChange = (
  //   event: SelectionEvents,
  //   data: OptionOnSelectData
  // ): void => {
  //   if (pageSize[0] !== data.optionText) onSizeChange(event, data);
  // };

  const [sliderValue, setSliderValue] = React.useState(10);
  const onSliderChange: SliderProps["onChange"] = (_, data) =>
    setSliderValue(data.value);

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.slider}>
          <Label htmlFor={sliderId}>{`Records Size: ${sliderValue}`}</Label>
          <div className={classes.wrapper}>
            <Label aria-hidden>{10}</Label>
            <Slider
              value={sliderValue}
              onChange={onSliderChange}
              step={10}
              min={10}
              max={50}
              id={sliderId}
            />
            <Label aria-hidden>{50}</Label>
          </div>
        </div>
      </div>
      <div className={classes.pager}>
        <div>
          <Button
            shape="circular"
            appearance="primary"
            disabled={pageNo === 1}
            icon={<ArrowPrevious24Regular />}
            onClick={() => {
              onPageChange(EventType.Prev);
            }}
          />
        </div>
        <div>
          <Label htmlFor={spinBtnId}>{`Page: ${pageNo}`}</Label>
          <SpinButton
            className={classes.spinbutton}
            value={pageNo}
            min={0}
            max={20}
            id={spinBtnId}
            size="small"
          />
        </div>
        <div>
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
      </div>
    </div>
  );
};
