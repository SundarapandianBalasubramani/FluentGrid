import { SortDirection } from "@fluentui/react-table";
import { SortState, TableColumnType } from "./table/types";
const distantFuture = new Date(1000, 1, 1);
export const searchItems = <T>(
  text: string,
  data: T[],
  keys: Array<keyof T>
): T[] => {
  return data.filter((item) =>
    keys.some((k) => String(item[k]).toLowerCase().includes(text))
  );
};

export const sortAscNumbers = <T>(data: T[], key: keyof T): T[] => {
  return data.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (a[key] as any) - (b[key] as any);
  });
};

export const sortDescNumbers = <T>(data: T[], key: keyof T): T[] => {
  return data.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (b[key] as any) - (a[key] as any);
  });
};

export const sortAscStrings = <T>(data: T[], key: keyof T): T[] => {
  return data.sort((a, b) => {
    const first = a[key] ? String(a[key]).trim().toUpperCase() : "";
    const second = b[key] ? String(b[key]).trim().toUpperCase() : "";
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
};

export const sortDescStrings = <T>(data: T[], key: keyof T): T[] => {
  return data.sort((a, b) => {
    const second = a[key] ? String(a[key]).trim().toUpperCase() : "";
    const first = b[key] ? String(b[key]).trim().toUpperCase() : "";
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  });
};

export const sortAscDate = <T>(data: T[], key: keyof T): T[] => {
  return data.sort((a, b) => {
    const dateA = a[key] ? new Date(String(a[key])) : distantFuture;
    const dateB = b[key] ? new Date(String(b[key])) : distantFuture;
    return dateA.getTime() - dateB.getTime();
  });
};

export const sortDescDate = <T>(data: T[], key: keyof T): T[] => {
  return data.sort((a, b) => {
    const dateA = a[key] ? new Date(String(a[key])) : distantFuture;
    const dateB = b[key] ? new Date(String(b[key])) : distantFuture;
    return dateB.getTime() - dateA.getTime();
  });
};

export const sortItems = <T>(data: T[], state: SortState): T[] => {
  if (state.sortColumn) {
    const key: keyof T = state.sortColumn as keyof T;
    const dir: SortDirection =
      state.sortDirection === "descending" ? "descending" : "ascending";
    if (dir === "ascending") {
      if (state.type === TableColumnType.number)
        return sortAscNumbers(data, key);
      else if (state.type === TableColumnType.date)
        return sortAscDate(data, key);
      return sortAscStrings(data, key);
    } else {
      if (state.type === TableColumnType.number)
        return sortDescNumbers(data, key);
      else if (state.type === TableColumnType.date)
        return sortDescDate(data, key);
      return sortDescStrings(data, key);
    }
  }
  return data;
};
