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
            station: 1,
        },
        0b010: {
            name: 'fsub',
            op: (rs1, rs2) => rs1 - rs2,
            cicles: 1,
            station: 1,
        },
        0b011: {
            name: 'fmul',
            op: (rs1, rs2) => rs1 * rs2,
            cicles: 10,
            station: 2,
        },
        0b100: {
            name: 'fdiv',
            op: (rs1, rs2) => rs1 / rs2,
            cicles: 40,
            station: 2,
        },
        getParams: (instruction) => {
            const rs1 = (instruction >> 15) & 0b11111;
            const rs2 = (instruction >> 20) & 0b11111;
            const rd = (instruction >> 7) & 0b11111;
            return { rs1, rs2, rd };
        }
    }
}

export const stations = {
    1: [
        {
            id: 1,
            busy: 0,
            op: 0,
            opName: "",
            vj: 0,
            vk: 0,
            qj: 0,
            qk: 0,
            cicles: 0,
        },
        {
            id: 2,
            busy: 0,
            op: 0,
            opName: "",
            vj: 0,
            vk: 0,
            qj: 0,
            qk: 0,
            cicles: 0,
        },
        {
            id: 3,
            busy: 0,
            op: 0,
            opName: "",
            vj: 0,
            vk: 0,
            qj: 0,
            qk: 0,
            cicles: 0,
        },
    ],
}

export const adder = {
    busy: false,
    ready: true,
    station: null,
    result: 0
}