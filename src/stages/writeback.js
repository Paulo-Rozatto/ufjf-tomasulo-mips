import { updateMemory } from "../interface-handlers";

let stations, registers, regStats, memory, loadStoreQueue, cdb;

function init(_stations, _registers, _regStats, _memory, _loadStoreQueue, _cdb) {
    stations = _stations;
    registers = _registers;
    regStats = _regStats;
    memory = _memory;
    loadStoreQueue = _loadStoreQueue;
    cdb = _cdb;
}

let station, result, busy, stats, head;
function read() {
    busy = cdb.busy;
    result = cdb.result;
    station = { ...cdb.station }; // copy object
    stats = [...regStats];
    head = {...loadStoreQueue.head()};
}

function write(uiCall) {
    const uiStations = new Set();
    const uiRegisters = new Set();

    if (busy) {
        stats.forEach((stat, i) => {
            if (stat == station.id) {
                registers[i] = result;
                regStats[i] = 0;
                uiRegisters.add({ id: i, value: result });
            }
        })

        const allStations = Object.values(stations).flatMap(e => e);
        allStations.forEach(rs => {
            if (rs.qj == station.id) {
                rs.qj = 0;
                rs.vj = result;
                uiStations.add(rs);
            }
            if (rs.qk == station.id) {
                rs.qk = 0;
                rs.vk = result;
                uiStations.add(rs);
            }
        });

        cdb.result = 0;
        cdb.station = null;
        cdb.busy = false;
        uiStations.add(station);
    }

    if (head && head.ready && head.opName === 'fsd') {
        const address = head.vk;
        memory[address] = head.vj;
        head.busy = false;
        head.ready = false;
        loadStoreQueue.pop();
        uiStations.add(head);
        updateMemory(address, head.vj);
    }

    uiCall(uiStations, uiRegisters);
}

export const writeBack = {
    init,
    read,
    write,
}