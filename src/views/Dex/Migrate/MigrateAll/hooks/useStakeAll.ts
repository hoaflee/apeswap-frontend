import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { stake, stakeVaultV2 } from 'utils/callHelpers'
import { MigrateStatus, useMigrateAll } from '../provider'
import { Pair, TokenAmount } from '@ape.swap/sdk'
import { useVaults } from 'state/vaults/hooks'
import { useMasterchef, useVaultApeV2 } from 'hooks/useContract'
import { useFarms } from 'state/farms/hooks'

const useStakeAll = () => {
  const { account, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp, migrateMaximizers } = useMigrateAll()
  const masterChefContract = useMasterchef()
  const vaultApeV2Contract = useVaultApeV2()
  const { vaults } = useVaults()
  const farms = useFarms(account)

  const handleStakeAll = useCallback(
    (apeswapWalletLps: { pair: Pair; balance: TokenAmount }[]) => {
      apeswapWalletLps.map(async ({ pair, balance }) => {
        const { address: lpAddress } = pair.liquidityToken
        // If maximizers is selected we need to check if one exists first. Otherwise approve the farm
        const matchedVault = vaults.find(
          (vault) => vault.stakeToken.address[chainId].toLowerCase() === lpAddress.toLowerCase(),
        )
        const matchedFarm = farms.find((farm) => farm.lpAddresses[chainId].toLowerCase() === lpAddress.toLowerCase())
        const trxHash =
          migrateMaximizers && matchedVault
            ? stakeVaultV2(vaultApeV2Contract, matchedVault.pid, balance.toExact())
            : stake(masterChefContract, matchedFarm.pid, balance.toExact())
        handleUpdateMigrateLp(lpAddress, 'stake', MigrateStatus.PENDING, 'Almost there!')
        trxHash
          .then(() => {
            handleUpdateMigrateLp(lpAddress, 'stake', MigrateStatus.COMPLETE, 'Nice job!')
          })
          .catch((error) => {
            handleUpdateMigrateLp(lpAddress, 'stake', MigrateStatus.INVALID, error.message)
          })
      })
    },
    [handleUpdateMigrateLp, chainId, masterChefContract, vaultApeV2Contract, migrateMaximizers, farms, vaults],
  )
  return handleStakeAll
}

export default useStakeAll
