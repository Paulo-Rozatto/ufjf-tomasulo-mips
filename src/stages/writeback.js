let adder, stations, registers, regStats;

function init(_adder, _stations, _registers, _regStats) {
    adder = _adder;
    stations = _stations;
    registers = _registers;
    regStats = _regStats;
}

let isReady, station, result;
function read() {
    isReady = adder.ready;
    result = adder.result;
    station = {...adder.station}; // copy object
}

function write(uiCallback) {
    const uiStations = new Set();
    const uiRegisters = new Set();

    if (isReady) {
        regStats.forEach((stat, i) => {
            if (stat == station.id) {
                registers[i] = result;
                regStats[i] = 0;
                uiRegisters.add({ id: i, value: result });
            }
        })

        stations[1].forEach(station => {
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

        uiStations.add(station);
    }

    uiCallback(uiStations, uiRegisters);
}

export const writeBack = {
    init,
    read,
    write,
}