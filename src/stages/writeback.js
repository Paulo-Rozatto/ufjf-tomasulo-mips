let stations, registers, regStats, cdb;

function init(_stations, _registers, _regStats, _cdb) {
    stations = _stations;
    registers = _registers;
    regStats = _regStats;
    cdb = _cdb;
}

let station, result, busy;
function read() {
    busy = cdb.busy;
    result = cdb.result;
    station = { ...cdb.station }; // copy object
}

function write(uiCallback) {
    const uiStations = new Set();
    const uiRegisters = new Set();

    if (busy) {
        regStats.forEach((stat, i) => {
            if (stat == station.id) {
                registers[i] = result;
                regStats[i] = 0;
                uiRegisters.add({ id: i, value: result });
            }
        })

        const allStations = Object.values(stations).flatMap(e => e);
        allStations.forEach(station => {
            if (station.qj == station.id) {
                station.qj = 0;
                station.vj = result;
                uiStations.add(station);;
            }
            if (station.qk == station.id) {
                station.qk = 0;
                station.vk = result;
                uiStations.add(station);
            }
        });

        cdb.result = 0;
        cdb.station = null;
        cdb.busy = false;
        uiStations.add(station);
    }

    uiCallback(uiStations, uiRegisters);
}

export const writeBack = {
    init,
    read,
    write,
}