import { ADD_RS, MUL_RS } from "../components";

let adder, multiplier, stations, registers, memory, cdb, loadStoreQueue;

function init(_adder, _multiplier, _stations, _registers, _loadStoreQueue, _memory, _cdb) {
    adder = _adder;
    multiplier = _multiplier;
    stations = _stations;
    registers = _registers;
    loadStoreQueue = _loadStoreQueue;
    memory = _memory;
    cdb = _cdb;
}

let adderStation, multiplierStation, buffer;
function read() {
    adderStation = stations[ADD_RS].find(station => station.busy && station.qj == 0 && station.qk == 0);
    multiplierStation = stations[MUL_RS].find(station => station.busy && station.qj == 0 && station.qk == 0);
    const head = loadStoreQueue.head();
    buffer = head.busy && head.qj == 0 && head.qk == 0 ? head : null;
}

let adderUi, multiplierUi, stationUi; // referefences to adder and station if they are to be updated in the ui
function write(uiCall) {
    adderUi = null;
    multiplierUi = null;
    stationUi = null;

    if (adder.busy) {
        if (!adder.ready) {
            adder.station.cicles--;
            adderUi = adder;

            if (adder.station.cicles == 0) {
                adder.ready = true;
                adder.result = adder.station.op(adder.station.vj, adder.station.vk);
            }
        }

        if (adder.ready && cdb.busy == false) {
            cdb.busy = true;
            cdb.result = adder.result;
            cdb.station = adder.station;
            adder.busy = false;
            adder.ready = false;
            adder.station.busy = false;
        }
    } else if (adderStation) {
        adder.busy = true;
        adder.ready = false;
        adder.station = adderStation;
        adderUi = adder;
    }

    if (multiplier.busy) {
        if (!multiplier.ready) {
            multiplier.station.cicles--;
            multiplierUi = multiplier;

            if (multiplier.station.cicles == 0) {
                multiplier.ready = true;
                multiplier.result = multiplier.station.op(multiplier.station.vj, multiplier.station.vk);
            }
        }

        if (multiplier.ready && cdb.busy == false) {
            cdb.busy = true;
            cdb.result = multiplier.result;
            cdb.station = multiplier.station;
            multiplier.busy = false;
            multiplier.ready = false;
            multiplier.station.busy = false;
        }
    } else if (multiplierStation) {
        multiplier.busy = true;
        multiplier.ready = false;
        multiplier.station = multiplierStation;
        multiplierUi = multiplier;
    }

    if (buffer) {
        if (!buffer.ready) {
            buffer.cicles--;
            if (buffer.cicles === 0) {
                buffer.ready = true;
                buffer.vk = buffer.op(buffer.vj, buffer.vk, registers, memory);
            }
        }

        if (buffer.opName === 'fld') {
            if (buffer.ready && cdb.busy == false) {
                cdb.busy = true;
                cdb.result = buffer.vk;
                cdb.station = buffer;
                buffer.busy = false;
                buffer.ready = false;
                stationUi = buffer;
                loadStoreQueue.pop();
            }
        } else if (buffer.ready) {
            stationUi = buffer;
        }
    }

    uiCall(adderUi, multiplierUi, stationUi);
}

export const execute = {
    init,
    read,
    write,
}