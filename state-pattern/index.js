const packet1 = {
  packetType: 18,
  uart: {
    time: 17378526000,
    dataType: 151,
    raw: "CQEQMDAwNDAxMDAwMDAwMDANCmxJlcSyqcL6GgAAAAAAAAAAAAAAAAAAAAA=",
    rawLength: 44,
    adapter: {
      type: 1,
      gid: "01:fc:01:48:dc:2e:65",
      adType: "scan_adv_noconn_ind",
      seq: 557,
      rssi: -60,
      rssiCh: 39,
      originalRssiCh: 2478,
      macAddr: 558557424266853,
      blufiTime: 452641449,
    },
    macAddress: 558557424266853,
  },
};

const packet2 = {
  packetType: 18,
  uart: {
    time: 17378526000,
    dataType: 151,
    raw: "CQEgMDA0MDAwRTNENDM5QzENChryBcWyi+36GgAAAAAAAAAAAAAAAAAAAAA=",
    rawLength: 44,
    adapter: {
      type: 1,
      gid: "01:fc:01:48:dc:2e:65",
      adType: "scan_adv_noconn_ind",
      seq: 558,
      rssi: -59,
      rssiCh: 39,
      originalRssiCh: 2478,
      macAddr: 558557424266853,
      blufiTime: 452652427,
    },
    macAddress: 558557424266853,
  },
};

const packet3 = {
  packetType: 18,
  uart: {
    time: 17378526000,
    dataType: 151,
    raw: "CQEwMDA0MTAwM0IwMTAwMDENCqUbLcaydhj7GgAAAAAAAAAAAAAAAAAAAAA=",
    rawLength: 44,
    adapter: {
      type: 1,
      gid: "01:fc:01:48:dc:2e:65",
      adType: "scan_adv_noconn_ind",
      seq: 559,
      rssi: -58,
      rssiCh: 39,
      originalRssiCh: 2478,
      macAddr: 558557424266853,
      blufiTime: 452663414,
    },
    macAddress: 558557424266853,
  },
};

// Define different states for processing packets
/**
 *
 */
class State {
  processPacket(context) {
    throw new Error("This method must be overridden");
  }
}

/**
 *
 */
class Packet1State extends State {
  processPacket(context) {
    console.log("Processing Packet 1");

    // Process Packet 1 logic here
    // await this.cache.setNs( `dispenser.${gid}`, { packet: 2 }, { expires : 120 } )
    context.setState(new Packet2State(context));
  }
}

/**
 *
 */
class Packet2State extends State {
  processPacket(context) {
    console.log("Processing Packet 2");
    // Process Packet 2 logic here
    // await this.cache.setNs( `dispenser.${gid}`, { packet: 3 }, { expires : 120 } )
    context.setState(new Packet3State());
  }
}

/**
 *
 */
class Packet3State extends State {
  processPacket(context) {
    console.log("Processing Packet 3");
    // Process Packet 3 logic here
    context.setState(new Packet1State());
    // delete gid from redis
    // await this.cache.removeNs( `dispenser.${gid}` )
  }
}

// Context class to maintain the current state
/**
 *
 */
class PacketProcessor {
  constructor(data) {
    // assign a corresponding state depending on what is in redis
    // const { gid } = data?.adapter
    // const { packet } = await this.cache.getNs( `dispenser.${gid}` )
    // if packet is undefined Packet1State(data)
    // if packet is 2 Packet2State(data)
    // if packet is 3 Packet3State(data)
    this.state = new Packet1State(data);
  }

  setState(newState) {
    this.state = newState;
  }

  processNextPacket() {
    this.state.processPacket(this);
  }
}

const packets = [packet1, packet2, packet3];

packets.forEach((packet) => {
  const processor = new PacketProcessor(packet.uart);
  processor.processNextPacket();
  // processor.processNextPacket();
  // processor.processNextPacket();
});
