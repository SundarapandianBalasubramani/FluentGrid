import {
  Button,
  makeStyles,
  shorthands,
  Label,
  useId,
  SpinButton,
  tokens,
  Slider,
  SliderOnChangeData,
  SpinButtonProps,
} from "@fluentui/react-components";
import {
  ArrowNext24Regular,
  ArrowPrevious24Regular,
} from "@fluentui/react-icons";
import * as React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "end",
    ...shorthands.gap("20px"),
    marginRight: "20px",
    marginTop: "20px",
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
      alignContent: "center",
      "> label": {
        marginBottom: tokens.spacingVerticalXXS,
        marginTop: tokens.spacingVerticalXXS,
      },
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
  step?: number;
  min?: number;
  max?: number;
  page: number;
  pages: number;
  size: number;
  total: number;
  onSizeChange: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: SliderOnChangeData
  ) => void;
  onPageChange: (current: number) => void;
}> = (props) => {
  const classes = useStyles();
  const {
    page,
    pages,
    size,
    step = 10,
    min = 10,
    max = 50,
    total,
    onSizeChange,
    onPageChange,
  } = props;

  const spinBtnId = useId();
  const sliderId = useId();

  const onSpinButtonChange: SpinButtonProps["onChange"] = (_ev, data) => {
    console.log("onSpinButtonChange", data.value, data.displayValue);
    if (data.value) onPageChange(data.value);
    else if (data.displayValue !== undefined) {
      const newValue = parseFloat(data.displayValue);
      if (!Number.isNaN(newValue)) {
        onPageChange(newValue);
      } else {
        console.error(`Cannot parse "${data.displayValue}" as a number.`);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.slider}>
          <Label htmlFor={sliderId}>{`Records Size: ${size}`}</Label>
          <div className={classes.wrapper}>
            <Label aria-hidden>{10}</Label>
            <Slider
              value={size}
              onChange={onSizeChange}
              step={step}
              min={min}
              max={max}
              id={sliderId}
            />
            <Label aria-hidden>{50}</Label>
          </div>
          <Label htmlFor={sliderId}>{`Total Records: ${total}`}</Label>
        </div>
      </div>
      <div className={classes.pager}>
        <div>
          <Button
            shape="circular"
            appearance="primary"
            disabled={page === 1}
            icon={<ArrowPrevious24Regular />}
            onClick={() => {
              onPageChange(page - 1);
            }}
          />
        </div>
        <div>
          <Label htmlFor={spinBtnId}>{`Page: ${page}`}</Label>
          <SpinButton
            className={classes.spinbutton}
            value={page}
            min={1}
            max={pages}
            id={spinBtnId}
            size="small"
            onChange={onSpinButtonChange}
          />
          <Label htmlFor={sliderId}>{`Total Pages: ${pages}`}</Label>
        </div>
        <div>
          <Button
            disabled={page === pages || page > pages}
            appearance="primary"
            className={classes.button}
            icon={<ArrowNext24Regular />}
            onClick={() => {
              onPageChange(page + 1);
            }}
            shape="circular"
          />
        </div>
      </div>
    </div>
  );
};
