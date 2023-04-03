# 代码说明

**逻辑合约 Sahara.sol**

v1版本部署
```shell
npx hardhat run scripts/1.deploy_sahara.ts --network bnbtest
```
与v1版本交互
```shell
npx hardhat saharav1 --network bnbtest
```
升级v2
```shell
npx hardhat run scripts/2.deploy_saharaV2.ts --network bnbtest
```
与v2版本交互
```shell
npx hardhat saharav2 --network bnbtest
```

升级v3
```shell
npx hardhat run scripts/3.deploy_saharaV3.ts --network bnbtest
```
与v3版本交互
```shell
npx hardhat saharav3 --network bnbtest
```

