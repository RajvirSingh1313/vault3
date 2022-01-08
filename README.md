# How to test

1.  Run `npx hardhat run scripts/deploy.js --network localhost`, copy the address in the console
2.  Go to utils/helpers/config.ts and change KeyRegistrar address to the address you copied
3.  Run `npx hardhat node` copy one of the private key, and import it in metamask and start using the app, if u face errors while key uploading change the private key to another and try again
