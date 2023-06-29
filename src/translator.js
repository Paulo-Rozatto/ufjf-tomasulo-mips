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

    let x = parts.map(e => regToBin(e))

    let opcode, funct, rs1, rs2, rd, imm;
    switch (command) {
        case 'fadd':
            opcode = TYPES.R.toString(2).padStart(7,"0");
            funct = "001";
            rd = x[0];
            rs1 = x[1];
            rs2 = x[2];
            return `0000000${rs2}${rs1}${funct}${rd}${opcode}`;
        case 'fld':
            opcode = TYPES.I.toString(2).padStart(7,"0");
            rs1 = x[2];
            rd = x[0];
            imm = x[1].toString(2).padStart(12,"0");
            return `${imm}${rs1}000${rd}${opcode}`;
    }

    return "whatf"
}