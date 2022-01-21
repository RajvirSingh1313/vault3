const withPreconstruct = require("@preconstruct/next");
module.exports = withPreconstruct({
  async redirects() {
    return [
      {
        source: "/guide",
        destination:
          "https://vault3.notion.site/Get-Started-4daad4b368874973a83b634b463cd372",
        permanent: false,
      },
      {
        source: "/wiki",
        destination:
          "https://vault3.notion.site/Vault3-Synopsis-f5fc3951bd944cba95258d282690b016",
        permanent: false,
      },
      {
        source: "/about",
        destination: "https://www.indiehackers.com/product/vault3/",
        permanent: false,
      },
    ];
  },
});
