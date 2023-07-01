import { TYPES } from "../components";

let instructions, operations, stations, regStats, registers, pc, clock, loadStoreQueue;

function init(_instructions, _operations, _stations, _regStats, _registers, _loadStoreQueue, _pc, _clock) {
    instructions = _instructions;
    operations = _operations;
    stations = _stations;
    regStats = _regStats;
    registers = _registers;
    loadStoreQueue = _loadStoreQueue;
    pc = _pc;
    clock = _clock;
}

let instruction, opcode, funct, operation, station, params;

function read() {
    instruction = instructions.get(pc.get());
    opcode = instruction & 0b1111111; // [6-0]
    funct = (instruction >> 12) & 0b11 // [14-12]

    operation = operations[opcode];

    if (!operation) {
        console.warn('operation not found')
        return;
    }

    if (opcode == TYPES.R) {
        operation = operation[funct];
    }

    station = stations[operation.station].find(station => !station.busy);
    params = operations[opcode].getParams(instruction);
}

function write(uiCall) {
    clock.next();
    uiCall(null, null, clock);

    if (!operation) {
        return;
    }
    if (!station) {
        console.warn('stall')
        return;
    }

    if (opcode == TYPES.R) {
        writeR();
    } else {
        writeIS();
    }

    pc.next();
    uiCall(station, pc, clock);
}

function writeR() {
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
    station.cicles = operation.cicles;
    regStats[rd] = station.id;
}

function writeIS() {
    if (!station) {
        console.warn('stall')
        return;
    }

    const { rs1, rs2, rd, imm } = params;
    let rs, r;

    if (opcode == TYPES.I) {
        rs = rs1;
        r = rd;
    } else {
        rs = rs2;
        r = rs1;
    }

    if (regStats[rs] != 0) {
        station.qj = regStats[rs];
    } else {
        station.vj = registers[rs]
        station.qj = 0;
    }
    regStats[r] = station.id;
    station.busy = true;
    station.op = operation.op;
    station.opName = operation.name;
    station.cicles = operation.cicles;
    station.vk = imm;
    loadStoreQueue.push(station);
}

export const issue = {
    init,
    read,
    write,
}