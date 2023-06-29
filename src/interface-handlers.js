import { binToAssembly } from "./translator";

const instructions = document.querySelector("#instructions-list");
const memory = document.querySelector("#memory-list");
const registers = document.querySelector("#registers-list");
const storeBuffer = document.querySelector("#store-buffer-list");
const loadBuffer = document.querySelector("#load-buffer-list");
const rsAdd = document.querySelector("#rs-fadd");
const rsMult = document.querySelector("#rs-fmult");
const adder = document.querySelector("#adder");

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

function init() {
    instructions.innerHTML = "";
    memory.innerHTML = "";
    registers.innerHTML = "";
    storeBuffer.innerHTML = "";
    loadBuffer.innerHTML = "";
    rsAdd.innerHTML = "";
    rsMult.innerHTML = "";

    const zero32 = "0".repeat(32);
    const address = (i) => "0x" + i.toString(16).padStart(2, "0");
    const reg  = (i) => "$" + i.toString(10).padStart(2, "0");

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
        const li = newDoubleCell(`fsd-${i}`, address(i), zero32);
        storeBuffer.appendChild(li);
    }

    for (let i = 1; i <= 3; i++) {
        const li = newSingleCell(`ins-${i}`, zero32);
        instructions.appendChild(li);
    }
}

function setActive(li) {
    li.classList.add("active");
    let offset = li.id.split("-")[1];
    if (offset) {
        offset = parseInt(offset) - 1;
        li.parentElement.scrollTo({ top: li.clientHeight * offset, behavior: "smooth" })
    }
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
    setActive(instructions.firstChild);
}

function updateLoadBuffer(station) {
    const id = `fld-${station.id}`;
    const li = document.getElementById(id);
    li.innerText = station.vk.toString(2).padStart(32, "0");
    setActive(li);
}

function updateStation(station) {
    if (station.opName === 'fld') {
        updateLoadBuffer(station);
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


export function issue(station) {
    updateStation(station);
}

export function execute(adder, station) {
    if (adder) {
        updateAdder(adder);
    }

    if (station) {
        updateStation(station);
    }
}

export function writeBack(stations, registers) {
    stations.forEach(station => updateStation(station));
    updateRegisters(registers);
}

init();