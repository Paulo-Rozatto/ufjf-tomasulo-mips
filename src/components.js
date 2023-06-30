export const TYPES = {
    R: 0b0000001,
    I: 0b0000010,
}

export const ADD_RS = 0b01;
const MUL_RS = 0b00;
export const FLD_RS = 0b10;
const FSD_RS = 0b11;

export const cdb = {
    busy: false,
    result: 0,
    station: null,
}

export const instructions = {
    _data: [],
    set(data) {
        this._data = data;
    },
    get(byte) {
        return this._data[byte / 4];
    }
}

export const operations = {
    0b0000001: { // r type
        0b001: {
            name: 'fadd',
            op: (rs1, rs2) => rs1 + rs2,
            cicles: 1,
            station: ADD_RS,
        },
        0b010: {
            name: 'fsub',
            op: (rs1, rs2) => rs1 - rs2,
            cicles: 1,
            station: ADD_RS,
        },
        0b011: {
            name: 'fmul',
            op: (rs1, rs2) => rs1 * rs2,
            cicles: 10,
            station: MUL_RS,
        },
        0b100: {
            name: 'fdiv',
            op: (rs1, rs2) => rs1 / rs2,
            cicles: 40,
            station: MUL_RS,
        },
        getParams: (instruction) => {
            const rs1 = (instruction >> 15) & 0b11111;
            const rs2 = (instruction >> 20) & 0b11111;
            const rd = (instruction >> 7) & 0b11111;
            return { rs1, rs2, rd };
        }
    },
    0b0000010: { // i type
        name: 'fld',
        op: (rs1, imm, reg, mem) => mem[(reg[rs1] + imm) >> 3],
        cicles: 1,
        station: FLD_RS,
        getParams: (instruction) => {
            const rs1 = (instruction >> 15) & 0b11111;
            const rd = (instruction >> 7) & 0b11111;
            const imm = (instruction >> 20) & 0b111111111111;
            return { rs1, rd, imm };
        }
    }
}

const station = {
    id: 0,
    busy: 0,
    op: 0,
    opName: "",
    vj: 0,
    vk: 0,
    qj: 0,
    qk: 0,
    cicles: 0,
}

export const stations = {
    [ADD_RS]: [],
    [FLD_RS]: [],
}

for (let i = 1; i <= 3; i++) {
    let rs = { ...station };
    rs.id = i;
    rs.opName = "fadd";
    stations[ADD_RS].push(rs);
}

for (let i = 6; i <= 9; i++) {
    let rs = { ...station };
    rs.id = i;
    rs.opName = "fld";
    stations[FLD_RS].push(rs);
}

export const adder = {
    busy: false,
    ready: false,
    station: null,
    result: 0
}