let instructions, operations, stations, regStats, registers, pc;

function init(_instructions, _operations, _stations, _regStats, _registers, _pc) {
    instructions = _instructions;
    operations = _operations;
    stations = _stations;
    regStats = _regStats;
    registers = _registers;
    pc = _pc;
}

let instruction, opcode, funct, operation, station, params;

function read() {
    instruction = instructions.get(pc);
    opcode = instruction & 0b1111111; // [6-0]
    funct = (instruction >> 12) & 0b11 // [14-12]

    operation = operations[opcode];

    if (!operation) {
        console.warn('operation not found')
        return;
    }

    if (opcode == 0b0000001) {
        operation = operation[funct];
    }

    station = stations[operation.station].find(station => !station.busy);
    params = operations[opcode].getParams(instruction);
}

function write(uiCall) {
    if (!operation) {
        console.warn('stall')
        return;
    }

    switch (opcode) {
        case 0b0000001: // r type
            writeR();
            break;
        case 0b0000010: // i type
            writeI();
            break;
    }

    pc += 4;
    uiCall(station);
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

function writeI() {
    if (!station) {
        console.warn('stall')
        return;
    }

    const { rs1, rd, imm } = params;

    if (regStats[rs1] != 0) {
        station.qj = regStats[rs1];
    } else {
        station.vj = registers[rs1]
        station.qj = 0;
    }
    regStats[rd] = station.id;
    station.busy = true;
    station.op = operation.op;
    station.opName = operation.name;
    station.cicles = operation.cicles;
    station.vk = imm;

}

export const issue = {
    init,
    read,
    write,
}