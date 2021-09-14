const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

module.exports = async function (deployer) {
  await deployer.deploy(BonusToken);
  const bonusToken = await BonusToken.deployed();

  const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const pairAddress = '0xC2e9F25Be6257c210d7Adf0D4Cd6E3E881ba25f8';
  const routerForkAddress = '0x319082Aa2A37188123AE446Ad701DaaFbA3D1ca3';
  const pairForkAddress = '0xC2e9F25Be6257c210d7Adf0D4Cd6E3E881ba25f8';

//   const address factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
//   const address token0 = 0xCAFE000000000000000000000000000000000000; 
//   const address token1 = 0xF00D000000000000000000000000000000000000; 

// const address pair = address(uint(keccak256(abi.encodePacked(
//   hex'ff',
//   factory,
//   keccak256(abi.encodePacked(token0, token1)),
//   hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
// ))));

  await deployer.deploy(
      LiquidityMigrator,
      routerAddress,
      pairAddress,
      routerForkAddress,
      pairForkAddress,
      bonusToken.address
  );
  const liquidityMigrator = await LiquidityMigrator.deployed();
  await bonusToken.setLiquidator(liquidityMigrator.address);
};
