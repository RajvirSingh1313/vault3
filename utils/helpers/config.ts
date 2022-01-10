import KeyRegistrar from "../../artifacts/contracts/KeyRegistrar.sol/KeyRegistrar.json"
import UserVault from "../../artifacts/contracts/UserVault.sol/UserVault.json"

const config = {
    chainId: 80001,
    maxFileSize: 8388608,
    keyRegistrar: {
        address: "0xfce35dAbb2b898BE3a3F377B95d787D5972D4fb2",
        abi: KeyRegistrar.abi
    },
    userVault: {
        address: "0x2cADf8B6aEd642dB33310Bb81ac870C058916D49",
        abi: UserVault.abi
    }
}

export default config;