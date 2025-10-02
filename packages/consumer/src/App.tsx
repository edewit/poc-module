import {
  Alert,
  Button,
  Page,
  PageSection,
  Title,
} from "@patternfly/react-core";
import React, { useCallback, useEffect, useState } from "react";
import { loadPatternFlyTable, PatternFlyTableProps } from "./federatedModule";

const sampleData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Frontend Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Backend Developer",
    status: "Active",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    role: "UX Designer",
    status: "On Leave",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    role: "Product Manager",
    status: "Active",
  },
  {
    id: 5,
    name: "Eva Solomon",
    email: "eva@example.com",
    role: "QA Engineer",
    status: "Active",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    role: "DevOps Engineer",
    status: "Remote",
  },
];

const departments = [
  { id: 1, label: "Engineering", value: "Engineering" },
  { id: 2, label: "Design", value: "Design" },
  { id: 3, label: "Product", value: "Product" },
  { id: 4, label: "QA", value: "QA" },
  { id: 5, label: "Management", value: "Management" },
];

const departmentEmployees = [
  { id: 1, departmentId: 1, employeeId: 1 },
  { id: 2, departmentId: 1, employeeId: 2 },
  { id: 3, departmentId: 2, employeeId: 3 },
  { id: 4, departmentId: 4, employeeId: 4 },
  { id: 5, departmentId: 3, employeeId: 5 },
  { id: 6, departmentId: 5, employeeId: 6 },
];

// Simulate that the data we have is different from the data we want to display
function normalizeData(departmentEmployees: any[]) {
  return departmentEmployees.map((item) => ({
    ...sampleData.find((employee) => employee.id === item.employeeId),
    department: departments.find(
      (department) => department.id === item.departmentId
    )?.label,
  }));
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [TableComponent, setTableComponent] =
    useState<React.ComponentType<PatternFlyTableProps> | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const { PatternFlyTable: LoadedTable } = await loadPatternFlyTable();
        setTableComponent(() => LoadedTable);
        setIsLoading(false);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : "Failed to load component"
        );
        setIsLoading(false);
      }
    };

    loadComponent();
  }, []);

  const handleRowClick = (
    _event: React.MouseEvent,
    rowIndex: number,
    row: any
  ) => {
    console.log("Row clicked:", rowIndex, row);
    alert(`Clicked on ${row.name} (${row.role}) - Status: ${row.status}`);
  };

  // Data fetching function - simulates API call with different data
  const fetchData = useCallback(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate occasional errors for demonstration
    if (Math.random() < 0.15) {
      throw new Error("Simulated API error - please try again");
    }

    // Return a shuffled version of the data to simulate dynamic content
    return [...normalizeData(departmentEmployees)].sort(() => Math.random() - 0.5);
  }, []);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <Page>
        <PageSection>
          <Title headingLevel="h1" size="2xl">
            Loading Federated PatternFly Table...
          </Title>
        </PageSection>
      </Page>
    );
  }

  if (loadError) {
    return (
      <Page>
        <PageSection>
          <Title headingLevel="h1" size="2xl">
            PatternFly Table Consumer
          </Title>
          <Alert variant="danger" title="Error loading component">
            {loadError}
          </Alert>
        </PageSection>
      </Page>
    );
  }

  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          PatternFly Table Consumer
        </Title>
        <p>
          This application demonstrates consuming a PatternFly table component
          from a Webpack Module Federation remote. The table component is loaded
          dynamically from the remote module and uses data fetching.
        </p>
        <Button onClick={handleRefresh} style={{ marginBottom: "1rem" }}>
          Refresh Data
        </Button>
      </PageSection>
      <PageSection>
        {TableComponent && (
          <TableComponent
            dataFetcher={fetchData}
            onRowClick={handleRowClick}
            refreshTrigger={refreshTrigger}
            className="pf-m-striped"
          />
        )}
      </PageSection>
    </Page>
  );
}

export default App;
