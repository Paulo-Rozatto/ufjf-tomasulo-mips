import { binToAssembly } from "./translator";
import { ADD_RS, MUL_RS } from "./components";

const instructions = document.querySelector("#instructions-list");
const memory = document.querySelector("#memory-list");
const registers = document.querySelector("#registers-list");
const storeBuffer = document.querySelector("#store-buffer-list");
const loadBuffer = document.querySelector("#load-buffer-list");
const rsAdd = document.querySelector("#rs-fadd");
const rsMult = document.querySelector("#rs-fmult");
const adder = document.querySelector("#adder");
const pc = document.querySelector("#pc");
const clock = document.querySelector("#clock");
const output = document.querySelector("#output");

const activeList = new Set();

function newSingleCell(id, instruction) {
    const li = document.createElement("li");
    li.id = id;
    li.classList = "list-group-item text-center";
    li.innerText = instruction;
    li.title = binToAssembly(instruction);
    return li;
}

function newDoubleCell(id, val1, val2) {
    const li = document.createElement("li");
    li.id = id;
    li.classList.add("list-group-item");
    li.innerHTML = `
    <strong class="float-start">${val1}:</strong>
    <span class="float-end">${val2}</span>`;
    return li;
}

function newStationCell(id) {
    const li = document.createElement("li");
    li.classList = "list-group-item d-inline-flex justify-content-between";
    li.id = id;
    li.innerHTML = `
    <strong title="status">free</strong>
    <span title="command">oooo</span>
    <span title="Vj">0.00</span>
    <span title="Vk">0.00</span>
    <span title="Qj">0.00</span>
    <span title="Qk">0.00</span>`;
    return li;
}

export function init() {
    instructions.innerHTML = "";
    memory.innerHTML = "";
    registers.innerHTML = "";
    storeBuffer.innerHTML = "";
    loadBuffer.innerHTML = "";
    rsAdd.innerHTML = "";
    rsMult.innerHTML = "";

    pc.innerText = "00";
    clock.innerText = "00";

    const zero32 = "0".repeat(32);
    const address = (i) => "0x" + (i * 8).toString(16).padStart(3, "0");
    const reg = (i) => "$" + i.toString(10).padStart(2, "0");

    for (let i = 0; i < 64; i++) {
        const li = newDoubleCell(`mem-${i}`, address(i), zero32);
        memory.appendChild(li);
    }

    for (let i = 0; i < 32; i++) {
        const li = newDoubleCell(`reg-${i}`, reg(i), zero32);
        registers.appendChild(li);
    }

    for (let i = 1; i <= 3; i++) {
        const li = newStationCell(`rs-${i}`);
        rsAdd.appendChild(li);
    }

    for (let i = 4; i <= 5; i++) {
        const li = newStationCell(`rs-${i}`);
        rsMult.appendChild(li);
    }

    for (let i = 6; i <= 9; i++) {
        const li = newSingleCell(`fld-${i}`, zero32);
        loadBuffer.appendChild(li);
    }

    for (let i = 10; i <= 14; i++) {
        const li = newDoubleCell(`fsd-${i}`, address(0), zero32);
        storeBuffer.appendChild(li);
    }

    for (let i = 1; i <= 3; i++) {
        const li = newSingleCell(`ins-${i}`, zero32);
        instructions.appendChild(li);
    }
}

function setActive(li, offset = -1) {
    li.classList.add("active");
    if (offset < 0) {
        offset = li.id.split("-")[1]
        offset = parseInt(offset) - 1;
    };
    li.parentElement.scrollTo({ top: li.clientHeight * offset, behavior: "smooth" })
    activeList.add(li);
}

export function clearActive() {
    activeList.forEach(li => li.classList.remove("active"));
    activeList.clear();
}

export function setInstructions(commands) {
    const fragment = document.createDocumentFragment();
    instructions.innerHTML = "";
    for (let i = 0; i < commands.length; i++) {
        const instruction = commands[i];
        const id = `ins-${i + 1}`;
        const li = newSingleCell(id, instruction);
        fragment.appendChild(li);
    }
    instructions.appendChild(fragment);
}

function updateLoadBuffer(station) {
    const id = `fld-${station.id}`;
    const li = document.getElementById(id);
    li.innerText = station.vk.toString(2).padStart(32, "0");
    setActive(li);
}

function updateStoreBuffer(station) {
    const id = `fsd-${station.id}`;
    const li = document.getElementById(id);
    li.children[0].innerText = "0x" + station.vk.toString(16).padStart(3, "0");
    li.children[1].innerText = station.vj.toString(2).padStart(32, "0");
    li.children[1].title = station.vj.toFixed(2);
    setActive(li, station.id - 10);
}

function updateStation(station) {
    if (station.opName === 'fld') {
        updateLoadBuffer(station);
        return;
    }

    if (station.opName === 'fsd') {
        updateStoreBuffer(station);
        return;
    }

    const id = `rs-${station.id}`;
    const rs = document.getElementById(id);
    rs.innerHTML = `
    <strong title="status">${station.busy ? "busy" : "free"}</strong>
    <span title="command">${station.opName}</span>
    <span title="Vj">${station.vj.toFixed(2)}</span>
    <span title="Vk">${station.vk.toFixed(2)}</span>
    <span title="Qj">${station.qj.toFixed(2)}</span>
    <span title="Qk">${station.qk.toFixed(2)}</span>`;
    setActive(rs);
}

function updateAdder(_adder) {
    if (!_adder.station) return;

    const rsId = `rs#${_adder.station.id}`;
    const cycles = _adder.station.cicles.toString().padStart(2, "0");
    adder.innerHTML = `
    <strong title="status">${_adder.busy ? "busy" : "free"}</strong>
    <span title="id da station">${rsId}</span>
    <span title="Vk">${cycles} cycles</span>`;
    setActive(adder);
}

function updateMultiplier(_multiplier) {
    if (!_multiplier.station) return;

    const rsId = `rs#${_multiplier.station.id}`;
    const cycles = _multiplier.station.cicles.toString().padStart(2, "0");
    multiplier.innerHTML = `
    <strong title="status">${_multiplier.busy ? "busy" : "free"}</strong>
    <span title="id da station">${rsId}</span>
    <span title="Vk">${cycles} cycles</span>`;
    setActive(multiplier);
}

export function updateRegisters(registers) {
    registers.forEach(reg => {
        let { id, value } = reg;
        const li = document.getElementById(`reg-${id}`);
        li.title = value.toFixed(2);
        li.lastElementChild.innerText = value.toString(2).slice(0, 31).padStart(32, "0") + "...";
        setActive(li);
    });
}

export function updateMemory(address, value) {
    const li = document.getElementById(`mem-${address}`);
    li.title = value.toFixed(2);
    li.lastElementChild.innerText = value.toString(2).slice(0, 31).padStart(32, "0") + "...";
    setActive(li);
}


export function issue(station, _pc, _clock) {
    clock.innerText = _clock.get().toString().padStart(2, "0");
    if (_pc) {
        pc.innerText = _pc.get().toString().padStart(2, "0");
        let insIdx = (_pc.get() >> 2) - 1;
        setActive(instructions.children[insIdx])
    }

    if (station) {
        updateStation(station);
    }
}

export function execute(adder, multiplier, station) {
    if (adder) {
        updateAdder(adder);
    }

    if (multiplier) {
        updateMultiplier(multiplier);
    }

    if (station) {
        updateStation(station);
    }
}

export function writeBack(stations, registers) {
    stations.forEach(station => updateStation(station));
    updateRegisters(registers);
}

export function updateOutput(pc, clock, instruction, stations, registers, memory) {
    const ins = instruction ? instruction.toString(2).padStart(32, "0") : "-";
    const binary = instruction ? binToAssembly(ins) : "-";
    const adds = stations[ADD_RS].map(rs => `- ${rs.id.toString().padStart(2, "0")}: ${rs.busy ? rs.opName : "free"}`).join("\n");
    const mults = stations[MUL_RS].map(rs => `- ${rs.id.toString().padStart(2, "0")}: ${rs.busy ? rs.opName : "free"}`).join("\n");

    const outText = `___________________________

Ciclo: ${clock.toString().padStart(2, "0")}
PC: ${pc.toString().padStart(2, "0")}
Instrução: ${ins}
Assembly: ${binary}
Estações de Adição:
${adds}
Estações de Multiplicação:
${mults}
Registradores: 
${[...registers].map((r, i) => `- $${i.toString().padStart(2, "0")}: ${r.toFixed(2)}`).join("\n")}
Memória:
${[...memory].map((m, i) => `- 0x${(i * 8).toString(16).padStart(3, "0")}: ${m.toFixed(2)}`).join("\n")}

`
    let scrollHeight = output.scrollHeight;
    output.value += outText;
    if (clock > 0)
        output.scrollTo({ top: scrollHeight, behavior: "smooth" })
}

init();