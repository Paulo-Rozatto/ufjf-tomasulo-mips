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

function write(uiCall) {
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
        allStations.forEach(rs => {
            if (rs.qj == station.id) {
                console.log(1)
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

    uiCall(uiStations, uiRegisters);
}

export const writeBack = {
    init,
    read,
    write,
}