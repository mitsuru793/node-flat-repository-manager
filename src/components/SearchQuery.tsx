import React from 'react'
import {Box} from 'ink'
import TextInput from 'ink-text-input'

interface Props {
  query: string
  onChange: (query: string) => void
  onSubmit: () => void
}

export function SearchQuery(props: Props) {
  const {query, onChange, onSubmit} = props
  return (
    <Box>
      <Box marginRight={1}>
        Enter your query:
      </Box>

      <TextInput
        value={query}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </Box>
  )
}
