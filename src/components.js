export const TYPES = {
    R: 0b0000001,
    I: 0b0000010,
    S: 0b0000011,
}

export const ADD_RS = 0b01;
export const MUL_RS = 0b00;
export const FLD_RS = 0b10;
export const FSD_RS = 0b11;

export const cdb = {
    busy: false,
    result: 0,
    station: null,
}

export const pc = {
    value: 0,
    next() {
        this.value += 4;
    },
    reset() {
        this.value = 0;
    },
    get() {
        return this.value;
    }
}

export const clock = {
    value: 0,
    next() {
        this.value += 1;
    },
    reset() {
        this.value = 0;
    },
    get() {
        return this.value;
    }
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
    },
    0b0000011: { // s type
        name: 'fsd',
        op: (rs1, rs2, imm, reg, mem) => (reg[rs1] + imm) >> 3,
        cicles: 1,
        station: FSD_RS,
        getParams: (instruction) => {
            const rs1 = (instruction >> 15) & 0b11111;
            const rs2 = (instruction >> 20) & 0b11111;
            const imm = ((instruction >> 7) & 0b11111) | ((instruction >> 20) & 0b11111111111100000);
            return { rs1, rs2, imm };
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
    [MUL_RS]: [],
    [FLD_RS]: [],
    [FSD_RS]: [],
}

export const resetStations = () => {
    for(const stationg of Object.values(stations)) {
        stationg.forEach(rs => {
            rs.busy = false;
            rs.vj = 0;
            rs.vk = 0;
            rs.qj = 0;
            rs.qk = 0;
            rs.cicles = 0;
        });
    }
}

for (let i = 1; i <= 3; i++) {
    let rs = { ...station };
    rs.id = i;
    rs.opName = "fadd";
    stations[ADD_RS].push(rs);
}

for (let i = 4; i <= 5; i++) {
    let rs = { ...station };
    rs.id = i;
    rs.opName = "fmul";
    stations[MUL_RS].push(rs);
}

for (let i = 6; i <= 9; i++) {
    let rs = { ...station };
    rs.id = i;
    rs.opName = "fld";
    stations[FLD_RS].push(rs);
}

for (let i = 10; i <= 14; i++) {
    let rs = { ...station };
    rs.id = i;
    rs.opName = "fsd";
    stations[FSD_RS].push(rs);
}

export const adder = {
    busy: false,
    ready: false,
    station: null,
    result: 0
}

export const multiplier = {
    busy: false,
    ready: false,
    station: null,
    result: 0
}

export const loadStoreQueue = {
    _data: new Array(9).fill(0),
    _head: 0,
    _tail: 0,
    push(value) {
        this._data[this._tail] = value;
        this._tail = (this._tail + 1) % this._data.length;
    },
    pop() {
        const value = this._data[this._head];
        this._head = (this._head + 1) % this._data.length;
        return value;
    },
    head() {
        return this._data[this._head];
    },
    reset() {
        this._data.fill(0);
        this._head = 0;
        this._tail = 0;
    }
}
