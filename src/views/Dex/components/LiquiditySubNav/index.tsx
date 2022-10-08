/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { useHistory, Link } from 'react-router-dom'

export enum LiquidityTypes {
  ADD = 'ADD',
  ZAP = 'ZAP',
  MIGRATE = 'MIGRATE',
}

const LiquiditySelector: React.FC = () => {
  const { pathname } = useHistory().location

  const { t } = useTranslation()
  return (
    <Flex sx={styles.liquiditySelectorContainer}>
      <Flex sx={styles.liquiditySelector} as={Link} to="/liquidity" id="zap-link">
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('/liquidity') ? 'text' : 'textDisabled'} icon="trade" width="10px" />
        </Flex>
        <Text color={pathname.includes('/liquidity') ? 'text' : 'textDisabled'}>{t('Positions')}</Text>
      </Flex>
      <Flex sx={styles.liquiditySelector}>
        <Text
          color={pathname.includes('add-liquidity') ? 'text' : 'textDisabled'}
          sx={{ whiteSpace: 'nowrap' }}
          as={Link}
          to="/add-liquidity"
          id="add-liquidity-link"
        >
          {t('+ Add')}
        </Text>
      </Flex>
      <Flex sx={styles.liquiditySelector} as={Link} to="/zap" id="zap-link">
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('zap') ? 'text' : 'textDisabled'} icon="ZapIcon" />
        </Flex>
        <Text color={pathname.includes('zap') ? 'text' : 'textDisabled'}>{t('Zap')}</Text>
      </Flex>
      <Flex sx={styles.migrate} as={Link} to="/migrate" id="migrate-link">
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('migrate') ? 'text' : 'textDisabled'} icon="Migrate" width="20px" />
        </Flex>
        <Text color={pathname.includes('migrate') ? 'text' : 'textDisabled'}>{t('Migrate')} </Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(LiquiditySelector)
