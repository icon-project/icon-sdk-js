const pkg = require("icon-sdk-js");
const { HttpProvider, BlockMonitorSpec, Converter, IconService } = pkg;

const NODE_URL = "http://localhost:9090/api/v3";
const provider = new HttpProvider(NODE_URL + "/icon_dex");
const iconService = new IconService(provider);
async function main() {
  const lastBlock = await iconService.getLastBlock().execute();
  const height = lastBlock.height;
  const spec = new BlockMonitorSpec(Converter.toBigNumber(height + 1));
  const onevent = (data) => {
    console.log(data);
  };
  const onerror = (error) => {
    console.log(error);
  };
  const monitor = iconService.monitorBlock(spec, onevent, onerror);
}

main().catch((e) => console.log(e));
