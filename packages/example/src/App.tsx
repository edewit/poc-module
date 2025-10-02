import React, { useCallback } from 'react'
import { PatternFlyTable, TableColumn } from '@poc/lib'
import { Page, PageSection, Title, Button } from '@patternfly/react-core'

// Sample data - in a real app this would come from an API
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Management' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', department: 'Engineering' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Tester', department: 'QA' },
]

function App() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0)

  const handleRowClick = (_event: React.MouseEvent, rowIndex: number, row: any) => {
    console.log('Row clicked:', rowIndex, row)
  }

  // Data fetching function - simulates API call
  const fetchData = useCallback(async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate occasional errors for demonstration
    if (Math.random() < 0.1) {
      throw new Error('Simulated API error')
    }
    
    return sampleData
  }, [])

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="2xl">
          PatternFly Table Example
        </Title>
        <p>This example demonstrates the PatternFly table component with data fetching from the lib workspace.</p>
        <Button onClick={handleRefresh} style={{ marginBottom: '1rem' }}>
          Refresh Data
        </Button>
      </PageSection>
      <PageSection>
        <PatternFlyTable
          dataFetcher={fetchData}
          onRowClick={handleRowClick}
          refreshTrigger={refreshTrigger}
          className="pf-m-striped"
        />
      </PageSection>
    </Page>
  )
}

export default App
