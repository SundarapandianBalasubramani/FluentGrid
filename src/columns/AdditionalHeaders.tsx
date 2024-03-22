import { TableHeaderCell } from "@fluentui/react-components";

export const AdditionalHeaders: React.FC = () => {
  return (
    <TableHeaderCell style={{ width: "70px" }} sortable={false}>
      {"Actions"}
    </TableHeaderCell>
  );
};