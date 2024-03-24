import { TableHeaderCell } from "@fluentui/react-components";

export const AdditionalHeaders: React.FC = () => {
  return (
    <TableHeaderCell style={{ width: "110px" }} sortable={false}>
      {"Actions"}
    </TableHeaderCell>
  );
};
