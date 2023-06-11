let adder, stations;

function init(_adder, _stations) {
    adder = _adder;
    stations = _stations;
}

let updateUi = false, adderStation;
function read() {
    adderStation = stations[1].find(station => station.busy && station.qj == 0 && station.qk == 0);
}

function write(uiCallback) {
    if (adder.busy) {
        adder.station.cicles--;
        updateUi = true;

        if (adder.station.cicles == 0) {
            adder.busy = false;
            adder.ready = true;
            adder.station.busy = false;
            adder.result = adder.station.op(adder.station.vj, adder.station.vk);
        }
        updateUi = true;
    } else if (adderStation) {
        adder.busy = true;
        adder.ready = false;
        adder.station = adderStation;
        updateUi = true;
    }

    if (updateUi) {
        uiCallback(adder);
    }
}

export const execute = {
    init,
    read,
    write,
}