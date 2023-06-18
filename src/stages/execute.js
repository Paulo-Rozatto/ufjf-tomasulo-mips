import { ADD_RS, FLD_RS } from "../components";

let adder, stations, registers, memory, cdb;

function init(_adder, _stations, _registers, _memory, _cdb) {
    adder = _adder;
    stations = _stations;
    registers = _registers;
    memory = _memory;
    cdb = _cdb;
}

let updateUi = false, adderStation, fldStation;
function read() {
    adderStation = stations[ADD_RS].find(station => station.busy && station.qj == 0 && station.qk == 0);
    fldStation = stations[FLD_RS].find(station => station.busy && station.qj == 0);
}

let adderUi, stationUi; // referefences to adder and station if they are to be updated in the ui
function write(uiCall) {
    adderUi = null;
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

    if (fldStation) {
        if (!fldStation.ready) {
            fldStation.cicles--;

            if (fldStation.cicles === 0) {
                fldStation.ready = true;
                fldStation.vj = fldStation.op(fldStation.vj, fldStation.vk, registers, memory);
            }
        }

        if (fldStation.ready && cdb.busy == false) {
            cdb.busy = true;
            cdb.result = fldStation.vj;
            cdb.station = fldStation;
            fldStation.busy = false;
            fldStation.ready = false;
            stationUi = fldStation;
        }
    }

    uiCall(adderUi, stationUi);
}

export const execute = {
    init,
    read,
    write,
}