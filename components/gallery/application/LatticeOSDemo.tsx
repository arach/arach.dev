/**
 * LatticeOS Demo Component
 * 
 * Showcases the new LatticeOS-inspired tactical UI elements
 * and military-grade interface design.
 */

import type { Theme } from '@/types/theme'

interface LatticeOSDemoProps {
  theme?: Theme | null
}

export function LatticeOSDemo({ theme }: LatticeOSDemoProps) {
  return (
    <section className="space-y-6">
      <div className="tactical-panel scanlines tactical-grid" style={{
        background: 'linear-gradient(135deg, hsl(var(--color-background)) 0%, hsl(var(--color-muted)) 100%)',
        border: '2px solid hsl(var(--color-primary) / 0.3)',
        boxShadow: '0 0 20px hsl(var(--color-primary) / 0.1), inset 0 0 20px hsl(var(--color-primary) / 0.05)'
      }}>
        <h3 className="text-lg font-semibold text-foreground mb-4 font-mono tracking-wider">LATTICE_OS TACTICAL INTERFACE</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Military-grade interface design with precision-focused UI elements and tactical aesthetics.
        </p>
        
        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="status-online">ONLINE</div>
            <span className="text-sm text-foreground">System Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-warning">WARNING</div>
            <span className="text-sm text-foreground">Alert Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-error">ERROR</div>
            <span className="text-sm text-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-online">SECURE</div>
            <span className="text-sm text-foreground">Connection</span>
          </div>
        </div>

        {/* Tactical Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="btn-tactical">Execute Command</button>
          <button className="btn-tactical">Deploy System</button>
          <button className="btn-tactical">Emergency Stop</button>
        </div>

        {/* Data Grid */}
        <div className="tactical-grid p-4 rounded-md">
          <h4 className="text-sm font-medium text-foreground mb-3">System Metrics</h4>
          <table className="tactical-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Status</th>
                <th>Uptime</th>
                <th>Load</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Core Processor</td>
                <td><span className="status-online">ACTIVE</span></td>
                <td>99.9%</td>
                <td>23%</td>
              </tr>
              <tr>
                <td>Memory Bank</td>
                <td><span className="status-online">ACTIVE</span></td>
                <td>99.8%</td>
                <td>67%</td>
              </tr>
              <tr>
                <td>Network Stack</td>
                <td><span className="status-warning">DEGRADED</span></td>
                <td>98.2%</td>
                <td>89%</td>
              </tr>
              <tr>
                <td>Storage Array</td>
                <td><span className="status-error">FAILED</span></td>
                <td>0%</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scanline Effect Demo */}
        <div className="scanlines tactical-panel mt-6">
          <h4 className="text-sm font-medium text-foreground mb-2">Terminal Display</h4>
          <div className="font-mono text-xs text-primary">
            <div>LATTICE_OS v2.1.4 - TACTICAL INTERFACE</div>
            <div>========================================</div>
            <div>System initialized at 2024-01-15 14:30:22 UTC</div>
            <div>All subsystems: OPERATIONAL</div>
            <div>Security clearance: LEVEL 7</div>
            <div>Ready for command input...</div>
          </div>
        </div>
      </div>
    </section>
  )
}
