'use client';

import { Metadata } from 'next';
import Link from 'next/link';
// import { getAllAgents } from '@/lib/agents'; // Server-side only
import { BaseUIProvider } from '@/components/BaseUIProvider';
import { Card } from 'baseui/card';
import { Block } from 'baseui/block';
import { HeadingLevel } from 'baseui/heading';
import { LabelSmall, LabelMedium, ParagraphMedium, HeadingXLarge, HeadingLarge, ParagraphSmall } from 'baseui/typography';
import { Tag } from 'baseui/tag';
import { useEffect, useState } from 'react';
import './agents.css';

// Metadata will need to be handled differently in client component
// Move this to a separate metadata export or handle in parent

interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  capabilities: string[];
  projects: string[];
  model?: string;
}

interface AgentCardProps extends Agent {}

function AgentCard({ id, name, type, description, capabilities, projects, model }: AgentCardProps) {
  return (
    <Link href={`/agents/${id}`} className="group block">
      <Card
        overrides={{
          Root: {
            style: {
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
              borderRadius: '0px',
              borderWidth: '1px',
              borderStyle: 'solid',
              position: 'relative',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              ':hover': {
                borderColor: 'var(--accent)',
                backgroundColor: 'var(--bg-terminal)',
                transform: 'translateY(-2px)',
              },
              ':hover::before': {
                transform: 'scaleX(1)',
              },
              '::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '2px',
                backgroundColor: 'var(--accent)',
                transform: 'scaleX(0)',
                transition: 'transform 0.2s ease',
              },
            },
          },
          Contents: {
            style: {
              margin: '0',
            },
          },
        }}
      >
        <Block marginBottom="scale600">
          <Block display="flex" alignItems="center" marginBottom="scale500">
            <LabelSmall
              color="var(--accent)"
              overrides={{
                Block: {
                  style: {
                    fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    padding: '0.25rem 0.5rem',
                    marginRight: '0.5rem',
                  },
                },
              }}
            >
              {type}
            </LabelSmall>
            <LabelSmall color="var(--terminal-green)" $style={{ fontSize: '0.75rem' }}>
              ● READY
            </LabelSmall>
          </Block>
        </Block>
        
        <HeadingLarge
          color="var(--text-terminal)"
          marginBottom="scale500"
          overrides={{
            Block: {
              style: {
                fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                fontSize: '1.1rem',
                fontWeight: '600',
              },
            },
          }}
        >
          {name}
        </HeadingLarge>
        
        <ParagraphMedium
          color="var(--text-secondary)"
          marginBottom="scale600"
          overrides={{
            Block: {
              style: {
                fontSize: '0.85rem',
                lineHeight: '1.4',
              },
            },
          }}
        >
          {description}
        </ParagraphMedium>
        
        <Block display="flex" flexWrap marginBottom="scale600">
          {capabilities.slice(0, 4).map((cap) => (
            <Tag
              key={cap}
              closeable={false}
              overrides={{
                Root: {
                  style: {
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                    fontSize: '0.7rem',
                    borderRadius: '0px',
                    margin: '0 0.25rem 0.25rem 0',
                    ':hover': {
                      color: 'var(--accent)',
                      borderColor: 'var(--accent)',
                    },
                  },
                },
              }}
            >
              {cap}
            </Tag>
          ))}
        </Block>
        
        <Block marginBottom="scale600">
          <LabelSmall
            color="var(--text-secondary)"
            overrides={{
              Block: {
                style: {
                  fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  '::before': {
                    content: '"$ projects: "',
                    color: 'var(--terminal-green)',
                    fontWeight: '600',
                  },
                },
              },
            }}
          >
            {projects.slice(0, 3).join(', ')}
          </LabelSmall>
        </Block>
        
        <Block
          overrides={{
            Block: {
              style: {
                color: 'var(--accent)',
                fontSize: '0.8rem',
                fontWeight: '500',
                fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                border: '1px solid var(--border)',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'var(--bg-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color 0.2s',
                ':hover': {
                  color: 'var(--bg-primary)',
                  backgroundColor: 'var(--accent)',
                  borderColor: 'var(--accent)',
                },
                '::before': {
                  content: '"> "',
                },
                '::after': {
                  content: '" _"',
                  animation: 'blink 1s infinite',
                },
              },
            },
          }}
        >
          view spec
        </Block>
      </Card>
    </Link>
  );
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAgents() {
      try {
        const response = await fetch('/api/agents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const agentData = await response.json();
        setAgents(agentData);
      } catch (error) {
        console.error('Failed to load agents:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAgents();
  }, []);
  
  return (
    <BaseUIProvider>
      <div className="agents-registry bg-terminal-bg min-h-screen font-terminal">
        {/* Terminal Window Styling */}
        <div className="terminal-window max-w-6xl mx-auto">
          {/* Terminal Header */}
          <div className="terminal-header bg-terminal-secondary px-4 py-3 border-b border-terminal-border flex items-center">
            <div className="terminal-dots flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            </div>
            <div className="terminal-title text-terminal-text text-sm font-medium">
              agents.arach.dev
            </div>
          </div>

          <div className="px-8 py-6">
            {/* Header with Terminal Prompt */}
            <Block marginBottom="scale1000">
              <Block display="flex" alignItems="center" marginBottom="scale600">
                <LabelMedium color="var(--terminal-green)" $style={{ fontWeight: '600', marginRight: '1rem' }}>
                  arach@agents:~$
                </LabelMedium>
                <LabelMedium color="var(--text-terminal)">
                  cat registry.txt
                </LabelMedium>
              </Block>
              
              <HeadingXLarge
                color="var(--text-terminal)"
                marginBottom="scale400"
                overrides={{
                  Block: {
                    style: {
                      fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                      fontSize: '2rem',
                      margin: '1rem 0',
                    },
                  },
                }}
              >
                AGENT REGISTRY
              </HeadingXLarge>
              
              <ParagraphMedium color="var(--text-secondary)" marginBottom="scale600">
                Specialized AI agents for development automation and task execution.
              </ParagraphMedium>
              
              <ParagraphMedium color="var(--text-secondary)">
                Status: <span style={{ color: 'var(--terminal-green)' }}>ONLINE</span> • 
                Agents: <strong style={{ color: 'var(--accent)' }}>{isLoading ? 'Loading...' : agents.length}</strong> • 
                Updated: 2024
              </ParagraphMedium>
            </Block>

            {/* Navigation */}
            <Block 
              marginBottom="scale1000" 
              paddingBottom="scale600" 
              overrides={{
                Block: {
                  style: {
                    borderBottom: '1px solid var(--border)',
                  },
                },
              }}
            >
              <Block display="flex" alignItems="center" marginBottom="scale400">
                <LabelMedium color="var(--terminal-green)" $style={{ fontWeight: '600', marginRight: '1rem' }}>
                  arach@agents:~$
                </LabelMedium>
              </Block>
              <Block display="flex" gridGap="scale800">
                <Block
                  as="a"
                  href="#overview"
                  overrides={{
                    Block: {
                      style: {
                        color: 'var(--text-terminal)',
                        textDecoration: 'none',
                        padding: '0.25rem 0.5rem',
                        margin: '0 0.5rem',
                        border: '1px solid transparent',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                        ':hover': {
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--accent)',
                          color: 'var(--accent)',
                        },
                        '::before': {
                          content: '"["',
                          color: 'var(--text-secondary)',
                        },
                        '::after': {
                          content: '"]"',
                          color: 'var(--text-secondary)',
                        },
                      },
                    },
                  }}
                >
                  overview
                </Block>
                <Block
                  as="a"
                  href="#agents"
                  overrides={{
                    Block: {
                      style: {
                        color: 'var(--text-terminal)',
                        textDecoration: 'none',
                        padding: '0.25rem 0.5rem',
                        margin: '0 0.5rem',
                        border: '1px solid transparent',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                        ':hover': {
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--accent)',
                          color: 'var(--accent)',
                        },
                        '::before': {
                          content: '"["',
                          color: 'var(--text-secondary)',
                        },
                        '::after': {
                          content: '"]"',
                          color: 'var(--text-secondary)',
                        },
                      },
                    },
                  }}
                >
                  list-all
                </Block>
                <Block
                  as="a"
                  href="/api/agents"
                  overrides={{
                    Block: {
                      style: {
                        color: 'var(--text-terminal)',
                        textDecoration: 'none',
                        padding: '0.25rem 0.5rem',
                        margin: '0 0.5rem',
                        border: '1px solid transparent',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
                        ':hover': {
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--accent)',
                          color: 'var(--accent)',
                        },
                        '::before': {
                          content: '"["',
                          color: 'var(--text-secondary)',
                        },
                        '::after': {
                          content: '"]"',
                          color: 'var(--text-secondary)',
                        },
                      },
                    },
                  }}
                >
                  api-docs
                </Block>
              </Block>
            </Block>

            {/* Main Content */}
            <Block>
              {isLoading ? (
                <Block
                  overrides={{
                    Block: {
                      style: {
                        color: 'var(--terminal-green)',
                        marginBottom: '1rem',
                      },
                    },
                  }}
                >
                  <ParagraphMedium>$ scanning agents directory...</ParagraphMedium>
                  <ParagraphSmall color="var(--text-secondary)">
                    Loading specifications...
                  </ParagraphSmall>
                </Block>
              ) : (
                <Block>
                  {/* Terminal-style header for agent list */}
                  <Block
                    marginBottom="scale600"
                    paddingBottom="scale400"
                    overrides={{
                      Block: {
                        style: {
                          color: 'var(--terminal-green)',
                          borderBottom: '1px solid var(--border)',
                        },
                      },
                    }}
                  >
                    <ParagraphMedium>$ ls -la agents/ | grep -E "(ready|active)"</ParagraphMedium>
                    <ParagraphSmall color="var(--text-secondary)">
                      total {agents.length} agents
                    </ParagraphSmall>
                  </Block>
                  
                  {/* Agent Grid */}
                  <Block 
                    display="grid" 
                    gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))" 
                    gridGap="scale600"
                    overrides={{
                      Block: {
                        style: {
                          marginTop: '1rem',
                        },
                      },
                    }}
                  >
                    {agents.map((agent, index) => (
                      <Block
                        key={agent.id}
                        overrides={{
                          Block: {
                            style: {
                              animationDelay: `${index * 0.1}s`,
                              opacity: 0,
                              animation: 'fadeInUp 0.5s ease-out forwards',
                            },
                          },
                        }}
                      >
                        <AgentCard {...agent} />
                      </Block>
                    ))}
                  </Block>
                </Block>
              )}
            </Block>
          </div>
        </div>
      </div>
    </BaseUIProvider>
  );
}