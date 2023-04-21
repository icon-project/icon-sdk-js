import EventMonitorSpec from "../lib/transport/monitor/EventMonitorSpec";
import * as assert from 'assert';
import { Converter, BigNumber } from "../lib/index";
import EventFilter from "../lib/transport/monitor/EventFilter";

describe('EventMonitorSpec', () => {
  it('single', () => {
    const exp = {
      height: "0xc",
      addr: "cx1234123412341234123412341234123412341234",
      event: "BTPEvent()",
      indexed: [],
      data: [],
    };
    const spec: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      new EventFilter("BTPEvent()", "cx1234123412341234123412341234123412341234", [], [])
    );
    assert.deepEqual(spec.getParam(), exp);
    const spec2: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      [
        new EventFilter("BTPEvent()", "cx1234123412341234123412341234123412341234", [], [])
      ]
    );
    assert.deepEqual(spec2.getParam(), exp);
  });
  it('omitting some', () => {
    const exp = {
      height: "0xc",
      event: "BTPEvent(str,int,str,str)",
      indexed: ["0x1.icon"],
    };
    const spec: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      new EventFilter("BTPEvent(str,int,str,str)", undefined, ["0x1.icon"])
    );
    assert.deepEqual(spec.getParam(), exp);
    const exp2 = {
      height: "0xc",
      event: "BTPEvent(str,int,str,str)",
    };
    const spec2: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      new EventFilter("BTPEvent(str,int,str,str)")
    );
    assert.deepEqual(spec2.getParam(), exp2);
  });
  it('multi', () => {
    const spec: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      [
        new EventFilter("BTPEvent()", "cx1234123412341234123412341234123412341234", [], []),
        new EventFilter("BTPEvent()", "cx1234123412341234123412341234123412341235", [], []),
      ]
    );
    assert.deepEqual(spec.getParam(), {
      height: "0xc",
      eventFilters: [
        {
          addr: "cx1234123412341234123412341234123412341234",
          event: "BTPEvent()",
          indexed: [],
          data: [],
        },
        {
          addr: "cx1234123412341234123412341234123412341235",
          event: "BTPEvent()",
          indexed: [],
          data: [],
        },
      ],
    });
  });
  it('logs', () => {
    const spec: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      new EventFilter("BTPEvent()", "cx1234123412341234123412341234123412341234", [], []),
      true
    );
    assert.deepEqual(spec.getParam(), {
      height: "0xc",
      addr: "cx1234123412341234123412341234123412341234",
      event: "BTPEvent()",
      indexed: [],
      data: [],
      logs: "0x1",
    });
  });
  it('progressInterval', () => {
    const spec: EventMonitorSpec = new EventMonitorSpec(
      Converter.toBigNumber(12),
      new EventFilter("BTPEvent()", "cx1234123412341234123412341234123412341234", [], []),
      false,
      10,
    )
    assert.deepEqual(spec.getParam(), {
      height: "0xc",
      addr: "cx1234123412341234123412341234123412341234",
      event: "BTPEvent()",
      indexed: [],
      data: [],
      progressInterval: "0xa"
    });
  });
});
