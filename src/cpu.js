import { instructions, operations, stations, adder} from './components.js'

const memory = new ArrayBuffer(512); // memory size in bytes
const memView = new Float64Array(memory); // view memory as 64-bit floats as we are working only with doubles

const registers = new Float64Array(32); // 16 registers, each one 64-bit float
const regStats = new Uint8Array(32); // 16 registers, each one 8-bit unsigned integer

let pc = 0; // program counter

let uiCallbacks = {
    issue: () => { },
    writeBack: () => { },
}

export function setInstructions(commands, callbacks) {
    const binaryInstructions = commands.map(command => parseInt(command, 2));
    instructions.set(binaryInstructions);
    uiCallbacks = { ...uiCallbacks, ...callbacks };
}

export function step() {
    writeBack();
    execute()
    issue();
}


registers[1] = 1.1;
registers[5] = 5;
function issue() {
    const instruction = instructions.get(pc);
    const opcode = instruction & 0b1111111; // [6-0]
    const funct = (instruction >> 12) & 0b11 // [14-12]

    const operation = !!operations[opcode] ? operations[opcode][funct] : 0;
    if (!operation) {
        console.warn('operation not found')
        return;
    }
    const params = operations[opcode].getParams(instruction);
    const station = stations[operation.station].find(station => !station.busy);

    if (!station) {
        console.warn('stall')
        return;
    }

    const { rs1, rs2, rd } = params;
    if (regStats[rs1] != 0) {
        station.qj = regStats[rs1];
    } else {
        station.vj = registers[rs1]
        station.qj = 0;
    }

    if (regStats[rs2] != 0) {
        station.qk = regStats[rs2];
    } else {
        station.vk = registers[rs2];
        station.qk = 0;
    }
    station.busy = true;
    station.op = operation.op;
    station.opName = operation.name;
    regStats[rd] = station.id;


    pc += 4;
    uiCallbacks.issue(station);
}

function execute() {
    if (!adder.busy) {
        const adderStation = stations[1].find(station => !station.busy && station.qj == 0 && station.qk == 0);
        if (adderStation) {
            adder.busy = true;
            adder.ready = 0;
            adder.station = adderStation;
        }
    } else if (adder.station.cicles == 0) {
        adder.result = adder.station.op(adder.station.vj, adder.station.vk);
        adder.ready = 1;
    } else {
        adder.cicles--;
    }


}

function writeBack() {
    const uiStations = new Set();
    const uiRegisters = new Set();

    if (adder.ready && adder.busy) {
        regStats.forEach((stat, i) => {
            if (stat == adder.station.id) {
                registers[i] = adder.result;
                regStats[i] = 0;
                uiRegisters.add({ id: i, value: adder.result });
            }
        })

        stations[1].forEach(station => {
            if (station.qj == adder.station.id) {
                station.qj = 0;
                station.vj = adder.result;
                uiStations.add(station);;
            }
            if (station.qk == adder.station.id) {
                station.qk = 0;
                station.vk = adder.result;
                uiStations.add(station);
            }
        });

        adder.busy = false;
        adder.station.busy = false;
        uiStations.add(adder.station);
    }

    uiCallbacks.writeBack(uiStations, uiRegisters);
}