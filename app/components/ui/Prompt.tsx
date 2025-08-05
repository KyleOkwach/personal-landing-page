interface PromptProps {
  text?: string
  onChange?: (text: string) => void
  onSubmit?: (text: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function Prompt({ 
  text = '', 
  onChange, 
  onSubmit, 
  placeholder = '',
  disabled = false 
}: PromptProps) {
  return (
    <div className="flex items-center font-mono text-sm leading-none terminal">
      <span className="text-accent mr-1">[kylebolo@portfolio]~$ </span>
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={text}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSubmit && !disabled) {
              e.preventDefault();
              onSubmit(text);
            }
          }}
          className="bg-transparent outline-none text-secondary placeholder:text-secondary/50 disabled:cursor-not-allowed caret-transparent"
          style={{ 
            width: `${Math.max(text.length, placeholder.length, 0)}ch`,
            minWidth: '0ch',
            maxWidth: '82ch',
          }}
          autoComplete="off"
          spellCheck="false"
        />
        <span 
          className={`
            w-2 h-4 bg-secondary
            ${disabled ? 'opacity-50' : 'cursor'}
          `}
        />
      </div>
    </div>
  )
}