import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  TableHeaderCell,
} from "@fluentui/react-components";

export const AdditionalHeaders: React.FC = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <TableHeaderCell style={{ width: "28px" }} sortable={false}>
          {"Actions"}
        </TableHeaderCell>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuGroup>
          <MenuGroupHeader>Sort</MenuGroupHeader>
            <MenuItem secondaryContent="A to Z">Asc</MenuItem>
            <MenuItem secondaryContent="Z to A">Desc</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem secondaryContent="Ctrl+O">Clear</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
