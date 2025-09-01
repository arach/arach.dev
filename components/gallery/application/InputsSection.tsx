'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface InputsSectionProps {
  theme?: Theme | null
}

export function InputsSection({ theme }: InputsSectionProps) {
  const inputVariants = [
    {
      name: 'Default Input',
      variant: 'default',
      inputClass: 'input-default',
      labelClass: 'label-default',
      description: 'Standard glass morphism input with backdrop blur',
      placeholder: 'Enter text...'
    },
    {
      name: 'Monospace Input',
      variant: 'mono',
      inputClass: 'input-mono',
      labelClass: 'label-default',
      description: 'Monospace input for code or technical content',
      placeholder: 'Code input...'
    },
    {
      name: 'Dark Input',
      variant: 'dark',
      inputClass: 'input-dark',
      labelClass: 'label-default',
      description: 'Dark themed input with reduced opacity',
      placeholder: 'Dark themed input...'
    },
    {
      name: 'Transparent Input',
      variant: 'transparent',
      inputClass: 'input-transparent',
      labelClass: 'label-default',
      description: 'Minimal input with bottom border only',
      placeholder: 'Minimal input...'
    }
  ]

  const labelVariants = [
    {
      name: 'Default Label',
      classes: 'label-default',
      text: 'Standard Label',
      description: 'Standard form label'
    },
    {
      name: 'Required Label',
      classes: 'label-required',
      text: 'Required Field',
      description: 'Label with required indicator'
    },
    {
      name: 'Small Label',
      classes: 'label-small',
      text: 'SMALL UPPERCASE LABEL',
      description: 'Small uppercase label for compact forms'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="grid gap-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Input Fields</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {inputVariants.map((input) => (
              <div key={input.variant}>
                <label className={input.labelClass}>{input.name}</label>
                <input 
                  type="text" 
                  placeholder={input.placeholder}
                  className={input.inputClass}
                  data-style-element="input"
                  data-element-name={input.name}
                  data-description={input.description}
                  data-classes={input.inputClass}
                  data-label-classes={input.labelClass}
                  data-variant={input.variant}
                  data-usage={`<input type='text' className='${input.inputClass}' placeholder='${input.placeholder}' />`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Textareas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-default">Default Textarea</label>
              <textarea 
                className="textarea-default"
                rows={3}
                placeholder="Enter description..."
                data-style-element="input"
                data-element-name="Default Textarea"
                data-description="Standard textarea with glass morphism styling"
                data-classes="textarea-default"
                data-variant="textarea"
                data-usage="<textarea className='textarea-default' rows={3} />"
              />
            </div>
            <div>
              <label className="label-default">Monospace Textarea</label>
              <textarea 
                className="textarea-mono"
                rows={3}
                placeholder="// Enter code..."
                data-style-element="input"
                data-element-name="Monospace Textarea"
                data-description="Code textarea with monospace font"
                data-classes="textarea-mono"
                data-variant="textarea-mono"
                data-usage="<textarea className='textarea-mono' rows={3} />"
              />
            </div>
            <div>
              <label className="label-default">Dark Textarea</label>
              <textarea 
                className="textarea-dark"
                rows={3}
                placeholder="Dark themed textarea..."
                data-style-element="input"
                data-element-name="Dark Textarea"
                data-description="Dark variant textarea"
                data-classes="textarea-dark"
                data-variant="textarea-dark"
                data-usage="<textarea className='textarea-dark' rows={3} />"
              />
            </div>
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Label Variants</h3>
          <div className="space-y-3">
            {labelVariants.map((label) => (
              <label 
                key={label.name}
                className={label.classes}
                data-style-element="typography"
                data-element-name={label.name}
                data-description={label.description}
                data-classes={label.classes}
                data-variant="label"
                data-usage={`<label className='${label.classes}'>${label.text}</label>`}
              >
                {label.text}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}