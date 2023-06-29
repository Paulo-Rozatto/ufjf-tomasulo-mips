import { instructions, operations, stations, adder, cdb } from './components.js'
import { issue } from './stages/issue.js'
import { execute } from './stages/execute.js';
import { writeBack } from './stages/writeback.js';
import { updateMemory, updateRegisters } from './interface-handlers.js';

const memory = new ArrayBuffer(512); // memory size in bytes
const memView = new Float64Array(memory); // view memory as 64-bit floats as we are working only with doubles

const registers = new Float64Array(32); // 16 registers, each one 64-bit float
const regStats = new Uint8Array(32); // 16 registers, each one 8-bit unsigned integer

let pc = 0; // program counter

let ui = {
    issue: () => { },
    execute: () => { },
    writeBack: () => { },
}

issue.init(instructions, operations, stations, regStats, registers, pc);
execute.init(adder, stations, registers, memView, cdb);
writeBack.init(stations, registers, regStats, cdb);

export function setInstructions(commands) {
    const binaryInstructions = commands.map(command => parseInt(command, 2));
    instructions.set(binaryInstructions);
}

export function setUICallbacks(callbacks) {
    ui = { ...ui, ...callbacks };
}

export function step() {
    issue.read();
    execute.read();
    writeBack.read();

    issue.write(ui.issue);
    execute.write(ui.execute);
    writeBack.write(ui.writeBack);
}

memView[2] = 2.5;
updateMemory(2, 2.5);

registers[1] = 1.1;
registers[5] = 5;
updateRegisters([{id: 1, value: 1.1}, {id: 5, value: 5}]);
