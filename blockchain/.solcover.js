module.exports = {
  testrpcOptions: '-p 8555 --mnemonic "toddler weather rocket off sentence chat unlock flame organ shuffle treat awful"',
  compileCommand: '../node_modules/.bin/truffle compile',
  testCommand: '../node_modules/.bin/truffle test --network coverage',
  skipFiles: ['ERC20.sol', 'TestERC20.sol', 'ERC725.sol', 'mocks/PhysicalAddressClaimMock.sol'],
};
