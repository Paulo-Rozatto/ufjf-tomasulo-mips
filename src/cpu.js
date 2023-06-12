import { instructions, operations, stations, adder, cdb } from './components.js'
import { issue } from './stages/issue.js'
import { execute } from './stages/execute.js';
import { writeBack } from './stages/writeback.js';

const memory = new ArrayBuffer(512); // memory size in bytes
const memView = new Float64Array(memory); // view memory as 64-bit floats as we are working only with doubles

const registers = new Float64Array(32); // 16 registers, each one 64-bit float
const regStats = new Uint8Array(32); // 16 registers, each one 8-bit unsigned integer

let pc = 0; // program counter

let uiCallbacks = {
    issue: () => { },
    execute: () => { },
    writeBack: () => { },
}

issue.init(instructions, operations, stations, regStats, registers, pc);
execute.init(adder, stations, registers, memView, cdb);
writeBack.init(stations, registers, regStats, cdb);

export function setInstructions(commands, callbacks) {
    const binaryInstructions = commands.map(command => parseInt(command, 2));
    instructions.set(binaryInstructions);
    uiCallbacks = { ...uiCallbacks, ...callbacks };
}

let opcode, operation, station, params;
export function step() {
    issue.read();
    execute.read(opcode, operation, station, params);
    writeBack.read();

    issue.write(uiCallbacks.issue);
    execute.write(uiCallbacks.execute);
    writeBack.write(uiCallbacks.writeBack);
}

registers[1] = 1.1;
registers[5] = 5;