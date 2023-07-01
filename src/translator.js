import { operations, TYPES } from "./components";

function regToBin(register, size = 5) {
    let number = parseInt(register.replace("$", ""));
    return number.toString(2).padStart(size, "0");
}

export function binToAssembly(instruction) {
    instruction = parseInt(instruction, 2);
    const opcode = instruction & 0b1111111; // [6-0]
    const funct = (instruction >> 12) & 0b11 // [14-12]

    if (opcode === 0) {
        return "nop";
    }

    let op = operations[opcode];
    const params = op.getParams(instruction);

    switch (opcode) {
        case TYPES.R:
            op = op[funct];
            return `${op.name} $${params.rd}, $${params.rs1}, $${params.rs2}`;
        case TYPES.I:
            return `${op.name} $${params.rd}, ${params.imm}($${params.rs1})`;
        case TYPES.S:
            return `${op.name} $${params.rs2}, ${params.imm}($${params.rs1})`;
    }

    if (opcode === TYPES.R) {
        op = op[funct];
        return `${op.name} $${params.rd}, $${params.rs1}, $${params.rs2}`;
    }

    return `${op.name} $${params.rd}, ${params.imm}($${params.rs1})`;
}

export function assemblyToBin(assembly) {
    const parts = assembly.split(/\s|\(/).map(e => e.replace(",", ""));
    const command = parts[0];
    parts.shift();

    let binParts = parts.map(e => regToBin(e))

    let opcode, funct, rs1, rs2, rd, imm;
    switch (command) {
        case 'fadd':
            opcode = TYPES.R.toString(2).padStart(7,"0");
            funct = "001";
            rd = binParts[0];
            rs1 = binParts[1];
            rs2 = binParts[2];
            return `0000000${rs2}${rs1}${funct}${rd}${opcode}`;
        case 'fld':
            opcode = TYPES.I.toString(2).padStart(7,"0");
            rs1 = binParts[2];
            rd = binParts[0];
            imm = binParts[1].toString(2).padStart(12,"0");
            return `${imm}${rs1}000${rd}${opcode}`;
        case 'fsd':
            opcode = TYPES.S.toString(2).padStart(7,"0");
            rs1 = binParts[2];
            rs2 = binParts[0];
            imm = binParts[1].padStart(12,"0");
            return `${imm.slice(0,7)}${rs2}${rs1}000${imm.slice(7)}${opcode}`;
    }

    return "whatf"
}