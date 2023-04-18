const hre = require("hardhat");

async function getBalances(address){
  const balanceBigint = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigint);
}

async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
    console.log(`Address ${counter} balance`,await getBalances(address))
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const address = memo.sender;
    const message = memo.message;
    console.log(`At ${timestamp}, Name:${name}, Address: ${address}, Message:${message}`)
  }
}

async function main() {
  const [owner,from1,from2,from3] = await hre.ethers.getSigners();
  const coffee = await hre.ethers.getContractFactory('Coffee');
  const contract = await coffee.deploy();

  await contract.deployed();
  console.log(`Address of contract`, contract.address)
  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before Buying");
  await consoleBalances(addresses);

  const amount = {value:hre.ethers.utils.parseEther("1")}
  await contract.connect(from1).buyCoffee("from1","hi",amount);
  await contract.connect(from2).buyCoffee("from2","hi",amount);

  console.log("After Buying");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



