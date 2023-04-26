import BTPMonitorSpec from "../lib/transport/monitor/BTPMonitorSpec";
import * as assert from 'assert';
import { BigNumber } from "../lib/index";

describe('BTPMonitorSpec', () => {
  it('basic', () => {
    const spec = new BTPMonitorSpec(
      BigNumber(12),
      BigNumber(1),
      false,
    )
    assert.deepEqual(spec.getParam(), {
      height: "0xc",
      networkID: "0x1",
      proofFlag: "0x0",
    })
  });
  it('proofFlag', () => {
    const spec = new BTPMonitorSpec(
      BigNumber(12),
      BigNumber(1),
      true,
    )
    assert.deepEqual(spec.getParam(), {
      height: "0xc",
      networkID: "0x1",
      proofFlag: "0x1",
    })
  });
  it('progressInterval', () => {
    const spec = new BTPMonitorSpec(
      BigNumber(12),
      BigNumber(1),
      true,
      14,
    )
    assert.deepEqual(spec.getParam(), {
      height: "0xc",
      networkID: "0x1",
      proofFlag: "0x1",
      progressInterval: "0xe",
    })
  });
});
