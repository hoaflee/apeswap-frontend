/** @jsxImportSource theme-ui */
import React from 'react'
import { ChainId } from '@ape.swap/sdk'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { useHistory, Link } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { StyledTag } from 'views/Pools/components/styles'

export enum LiquidityTypes {
  ADD = 'ADD',
  ZAP = 'ZAP',
  MIGRATE = 'MIGRATE',
}

const LiquiditySelector: React.FC = () => {
  const { pathname } = useHistory().location
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'space-around', margin: '20px 0px' }}>
      <Flex sx={styles.liquiditySelector} as={Link} to="/liquidity" id="zap-link">
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('/liquidity') ? 'text' : 'textDisabled'} icon="Positions" width="20px" />
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
      <Flex as={Link} to="/zap" id="zap-link" sx={styles.liquiditySelector}>
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('zap') ? 'text' : 'textDisabled'} icon="ZapIcon" />
        </Flex>
        <Text color={pathname.includes('zap') ? 'text' : 'textDisabled'}>{t('Zap')}</Text>
      </Flex>
      {chainId === ChainId.BSC ? (
        <Flex as={Link} to="/migrate" id="migrate-link" sx={styles.liquiditySelector}>
          <Flex sx={{ marginRight: '5px' }}>
            <Svg color={pathname.includes('migrate') ? 'text' : 'textDisabled'} icon="Migrate" width="20px" />
          </Flex>
          <Text color={pathname.includes('migrate') ? 'text' : 'textDisabled'}>{t('Migrate')} </Text>
        </Flex>
      ) : (
        <Flex
          sx={{
            position: 'relative',
            alignItems: 'center',
            fontSize: '14px',
            '@media (max-width: 350px)': {
              fontSize: '12px',
            },
          }}
        >
          <Text color={pathname.includes('migrate') ? 'text' : 'textDisabled'} mr="5px">
            {t('Migrate')}{' '}
          </Text>
          <StyledTag variant={'binance'}> {t('Soon')} </StyledTag>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(LiquiditySelector)
