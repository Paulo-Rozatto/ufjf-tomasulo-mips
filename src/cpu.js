import { instructions, operations, stations, adder, multiplier, loadStoreQueue, cdb, pc, clock, resetStations } from './components.js'
import { issue } from './stages/issue.js'
import { execute } from './stages/execute.js';
import { writeBack } from './stages/writeback.js';
import { updateMemory, updateOutput, updateRegisters } from './interface-handlers.js';

const memory = new ArrayBuffer(512); // memory size in bytes
const memView = new Float64Array(memory); // view memory as 64-bit floats as we are working only with doubles

const registers = new Float64Array(32); // 16 registers, each one 64-bit float
const regStats = new Uint8Array(32); // 16 registers, each one 8-bit unsigned integer

let commands = [];

let ui = {
    issue: () => { },
    execute: () => { },
    writeBack: () => { },
}

issue.init(instructions, operations, stations, regStats, registers, loadStoreQueue, pc, clock);
execute.init(adder, multiplier, stations, registers, loadStoreQueue, memView, cdb);
writeBack.init(stations, registers, regStats, memView, loadStoreQueue, cdb);

export function setInstructions(_commands) {
    commands = _commands;
    const binaryInstructions = _commands.map(command => parseInt(command, 2));
    instructions.set(binaryInstructions);
}

export function setUICallbacks(callbacks) {
    ui = { ...ui, ...callbacks };
}

export function step() {
    let outPC = pc.get();
    let outClock = clock.get();

    issue.read();
    execute.read();
    writeBack.read();

    issue.write(ui.issue);
    execute.write(ui.execute);
    writeBack.write(ui.writeBack);

    updateOutput(outPC, outClock, instructions.get(outPC), stations, registers, memView);
}

export function reset() {
    pc.reset();
    clock.reset();
    setInstructions(commands);
    loadStoreQueue.reset();

    memView[2] = 2;
    updateMemory(2, 2);

    registers[1] = 1.1;
    registers[5] = 5.5;
    updateRegisters([{ id: 1, value: 1.1 }, { id: 5, value: 5 }]);

    resetStations();
}

memView[2] = 2;
updateMemory(2, 2);

registers[1] = 1.1;
registers[5] = 5.5;
updateRegisters([{ id: 1, value: 1.1 }, { id: 5, value: 5 }]);
