import KeyRegistrar from "../../artifacts/contracts/KeyRegistrar.sol/KeyRegistrar.json"
import UserVault from "../../artifacts/contracts/UserVault.sol/UserVault.json"

const config = {
    chainId: 80001,
    keyRegistrar: {
        address: "0xfce35dAbb2b898BE3a3F377B95d787D5972D4fb2",
        abi: KeyRegistrar.abi
    },
    userVault: {
        address: "0x768a6Ba21a08Fa85720c366b9178C9f6F0FC1d03",
        abi: UserVault.abi
    }
}

export default config;