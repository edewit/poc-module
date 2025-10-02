import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import React, { useState, useEffect } from "react";

interface TableColumn {
  title: string;
  key: string;
  width?: number;
  sortable?: boolean;
}

const columns: TableColumn[] = [
  { title: 'ID', key: 'id', width: 8 },
  { title: 'Name', key: 'name', width: 20 },
  { title: 'Email', key: 'email', width: 25 },
  { title: 'Role', key: 'role', width: 20 },
  { title: 'Department', key: 'department', width: 15 },
  { title: 'Status', key: 'status', width: 12 },
]

export interface PatternFlyTableProps {
  dataFetcher: () => Promise<Array<Record<string, any>>>;
  className?: string;
  onRowClick?: (
    event: React.MouseEvent,
    rowIndex: number,
    row: Record<string, any>
  ) => void;
  loading?: boolean;
  error?: string | null;
  refreshTrigger?: number; // Can be used to trigger data refresh
}

export const PatternFlyTable: React.FC<PatternFlyTableProps> = ({
  dataFetcher,
  className,
  onRowClick,
  loading: externalLoading,
  error: externalError,
  refreshTrigger,
}) => {
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dataFetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataFetcher, refreshTrigger]);

  const isLoading = externalLoading !== undefined ? externalLoading : loading;
  const hasError = externalError !== undefined ? externalError : error;

  if (isLoading) {
    return (
      <Table className={className} aria-label="PatternFly Table">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index} style={{ width: column.width ? `${column.width}%` : undefined }}>
                {column.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>
              Loading...
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }

  if (hasError) {
    return (
      <Table className={className} aria-label="PatternFly Table">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index} style={{ width: column.width ? `${column.width}%` : undefined }}>
                {column.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              Error: {hasError}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }

  return (
    <Table className={className} aria-label="PatternFly Table">
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index} style={{ width: column.width ? `${column.width}%` : undefined }}>
              {column.title}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.length === 0 ? (
          <Tr>
            <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>
              No data available
            </Td>
          </Tr>
        ) : (
          data.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              isClickable={!!onRowClick}
              onClick={
                onRowClick
                  ? (event) => onRowClick(event, rowIndex, row)
                  : undefined
              }
            >
              {columns.map((column, cellIndex) => (
                <Td key={cellIndex}>{row[column.key] || ""}</Td>
              ))}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
};

export default PatternFlyTable;
