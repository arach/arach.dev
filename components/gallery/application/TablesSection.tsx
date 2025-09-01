'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface TablesSectionProps {
  theme?: Theme | null
}

export function TablesSection({ theme }: TablesSectionProps) {
  const tableData = [
    { id: 1, name: 'api-server-01', status: 'online', cpu: '45%', memory: '2.1 GB', uptime: '15 days', lastCheck: '2 min ago' },
    { id: 2, name: 'db-primary', status: 'online', cpu: '78%', memory: '8.3 GB', uptime: '45 days', lastCheck: '1 min ago' },
    { id: 3, name: 'cache-redis', status: 'processing', cpu: '23%', memory: '512 MB', uptime: '7 days', lastCheck: '5 min ago' },
    { id: 4, name: 'worker-node-02', status: 'error', cpu: '92%', memory: '3.8 GB', uptime: '2 hours', lastCheck: '30 sec ago' },
    { id: 5, name: 'cdn-edge-west', status: 'offline', cpu: '0%', memory: '0 MB', uptime: '-', lastCheck: '10 min ago' },
  ]

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'online': return 'badge-online'
      case 'offline': return 'badge-offline'
      case 'processing': return 'badge-processing'
      case 'error': return 'badge-error'
      default: return 'badge-default'
    }
  }

  return (
    <section className="space-y-6 max-w-6xl">
      <div className="glass-panel overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-foreground mb-4">Server Status Table</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-border bg-input" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                  Server Name ↓
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                  CPU Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Check
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tableData.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-muted/30 transition-colors"
                  data-style-element="table-row"
                  data-element-name="Table Row"
                  data-description="Interactive table row with hover state"
                  data-classes="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-border bg-input" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(row.status)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {row.cpu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {row.memory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {row.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {row.lastCheck}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary hover:text-primary/80 transition-colors mr-2">View</button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 border-t border-border bg-muted/10 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing 1 to 5 of 5 entries
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted/20 transition-colors">Previous</button>
            <button className="px-3 py-1 text-xs border border-border rounded bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted/20 transition-colors">2</button>
            <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted/20 transition-colors">3</button>
            <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted/20 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </section>
  )
}