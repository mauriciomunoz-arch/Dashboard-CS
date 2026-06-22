'use client'

import { useMemo, useState } from 'react'
import { useIssues } from '../hooks/useIssues.js'
import { useTeams } from '../hooks/useTeams.js'
import { computeIssueKpis } from '../../application/useCases/computeIssueKpis.js'
import DashboardTemplate from '../templates/DashboardTemplate.jsx'
import DashboardHeader from '../organisms/DashboardHeader.jsx'
import FilterBar from '../organisms/FilterBar.jsx'
import KpiRow from '../organisms/KpiRow.jsx'
import ChartsGrid from '../organisms/ChartsGrid.jsx'
import IssueDrawer from '../organisms/IssueDrawer.jsx'
import ExportButton from '../molecules/ExportButton.jsx'
import Spinner from '../atoms/Spinner.jsx'
import Button from '../atoms/Button.jsx'

/**
 * Page: orquesta hooks de datos + estado del filtro y compone los organisms.
 * El filtro principal es por equipo; el cálculo de KPIs y las agrupaciones se
 * delegan a la capa application.
 */
export default function DashboardPage() {
  const [selectedTeamId, setSelectedTeamId] = useState('')
  const [createdAfter, setCreatedAfter] = useState('')
  const [createdBefore, setCreatedBefore] = useState('')
  const [drawer, setDrawer] = useState(null)

  const teamsQuery = useTeams()
  const issuesQuery = useIssues({ teamId: selectedTeamId, createdAfter, createdBefore })

  const issues = issuesQuery.data ?? []
  const kpis = useMemo(() => computeIssueKpis(issuesQuery.data ?? []), [issuesQuery.data])

  const clearDates = () => {
    setCreatedAfter('')
    setCreatedBefore('')
  }

  const teamName = teamsQuery.data?.find((t) => t.id === selectedTeamId)?.name
  const dateLabel =
    createdAfter || createdBefore
      ? ` · ${createdAfter || '…'} → ${createdBefore || '…'}`
      : ''
  const subtitle = issuesQuery.isSuccess
    ? `${kpis.total} tickets · ${teamName ?? 'Todos los equipos'}${dateLabel}`
    : 'Cargando…'

  return (
    <>
      <DashboardTemplate
      header={<DashboardHeader subtitle={subtitle} />}
      filters={
        <div className="flex flex-wrap items-end justify-between gap-4">
          <FilterBar
            teams={teamsQuery.data ?? []}
            isLoading={teamsQuery.isLoading}
            selectedTeamId={selectedTeamId}
            onTeamChange={setSelectedTeamId}
            createdAfter={createdAfter}
            createdBefore={createdBefore}
            onCreatedAfterChange={setCreatedAfter}
            onCreatedBeforeChange={setCreatedBefore}
            onClearDates={clearDates}
          />
          <ExportButton
            issues={issues}
            filename={`tickets-${(teamName ?? 'todos-los-equipos')
              .toLowerCase()
              .replace(/\s+/g, '-')}.csv`}
            label="Exportar CSV"
          />
        </div>
      }
    >
      {issuesQuery.isLoading && (
        <div className="py-16">
          <Spinner label="Cargando tickets…" />
        </div>
      )}

      {issuesQuery.isError && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-state-canceled/30 bg-state-canceled/5 p-6">
          <p className="text-sm text-state-canceled">
            No se pudieron cargar los tickets: {issuesQuery.error?.message}
          </p>
          <Button variant="ghost" onClick={issuesQuery.refetch}>
            Reintentar
          </Button>
        </div>
      )}

      {issuesQuery.isSuccess && (
        <div className="flex flex-col gap-6">
          <KpiRow kpis={kpis} />
          <ChartsGrid issues={issues} onSegmentSelect={setDrawer} />
        </div>
      )}
      </DashboardTemplate>
      <IssueDrawer data={drawer} onClose={() => setDrawer(null)} />
    </>
  )
}
