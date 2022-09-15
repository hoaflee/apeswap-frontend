/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import { Flex, Input } from '@ape.swap/uikit'
import styled from '@emotion/styled'
import { useTranslation } from 'contexts/Localization'
import { Box } from 'theme-ui'
import { ParsedFarm } from 'state/zap/reducer'
import DisplayRows from './components/DisplayRows'
import { useZapOutputList } from 'state/zap/hooks'
import { styles } from './styles'

interface LPSearcherProps {
  onLpSelect: (farm: ParsedFarm) => void
  zapOutputList?: any
}

function LPSearcher({ onLpSelect }: LPSearcherProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const zapOutputList = useZapOutputList()

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={styles.inputContainer}>
        <StyledInput
          id="token-search-input"
          placeholder={t('Name or Address')}
          autoComplete="off"
          value={query}
          onChange={handleChangeQuery}
          icon="search"
          autoFocus
        />
      </Flex>
      <Box sx={styles.displayRowsContainer}>
        <DisplayRows tokens={zapOutputList} onLpSelect={onLpSelect} />
      </Box>
    </Flex>
  )
}

const StyledInput = styled(Input)`
  width: 420px;
  max-width: 100% !important;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.white3};
  color: ${({ theme }) => theme.colors.text};
  placeholder-color: ${({ theme }) => theme.colors.gray};
  ::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
  :focus {
    box-shadow: none !important;
  }
`

export default React.memo(LPSearcher)
