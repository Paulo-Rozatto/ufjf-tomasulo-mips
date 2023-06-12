import * as cpu from './cpu.js'

let code = `00000000010100001001000110000001`; // fadd $3, $1, $5

// lw $1 2($3)
code = `00000000100001000000000000000010` + "\n" + code;

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-button")
menuBtn.onclick = () => {
    menu.classList.toggle("menu-visible");
    menu.classList.toggle("menu-hidden");
}

const textInput = document.querySelector("#codeTextInput");
const textOutput = document.querySelector("#codeTextOutput");
const fileInput = document.querySelector("#codeFileInput");
fileInput.onchange = () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const result = event.target.result;
        textInput.innerHTML = result;
    }

    reader.readAsText(file);
}

const upModal = document.querySelector("#uploadModal");
upModal.addEventListener("show.bs.modal", () => {
    fileInput.value = "";
    textInput.innerHTML = code;
})

const downModal = document.querySelector("#downloadModal");
downModal.addEventListener("show.bs.modal", () => {
    textOutput.innerHTML = code;
})

const saveButton = document.querySelector("#saveButton");
saveButton.onclick = () => {
    code = textInput.innerHTML.toString();
    const commands = code.split('\n');
    const instructions = document.querySelector("#instructions-list");
    instructions.innerText = "";

    const fragment = document.createDocumentFragment();
    for (const command of commands) {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerText = command;
        fragment.appendChild(li);
    }
    fragment.firstChild.classList.add("active");
    instructions.appendChild(fragment);
    cpu.setInstructions(commands, uiCallbacks)
}

const downloadButton = document.querySelector("#downloadButton");
downloadButton.onclick = (event) => {
    let blob = new Blob([code], { type: 'text/plain' });
    event.target.download = "resultado.txt";
    event.target.href = window.URL.createObjectURL(blob);
}

const reset = document.querySelector("#reset");
const run = document.querySelector("#run");
const pause = document.querySelector("#pause");
const foward = document.querySelector("#foward");

foward.onclick = cpu.step;

const rtypeCallback = (station) => {
    const id = station.opName + station.id;
    const li = document.querySelector(`#${id}`);
    li.children[0].innerText = station.busy ? "busy" : "free";
    li.children[1].innerText = station.opName;
    li.children[2].innerText = station.vj.toFixed(2);
    li.children[3].innerText = station.vk.toFixed(2);
    li.title = `Qj: ${station.qj}\nQk: ${station.qk}`;
    li.classList.add("active");
    setTimeout(() => {
        li.classList.remove("active");
    }, 950);
}

const loadStoreCallback = (station) => {
    const id = station.opName + station.id;
    const li = document.querySelector(`#${id}`);
    const bufferList = li.parentElement;
    li.children[0].title = station.vk;
    li.children[0].innerText = "0x" + station.vk.toString(16).padStart(3, "0")
    li.children[1].innerText = station.vj;
    li.classList.add("active");
    setTimeout(() => {
        li.classList.remove("active");
    }, 950);
    bufferList.scrollTo({ top: li.clientHeight * station.id, behavior: "smooth" })
}

const issueCallback = ({ station, buffer }) => {
    if (station) {
        rtypeCallback(station);
    } else if (buffer) {
        loadStoreCallback(buffer);
    }
}

const exCallback = ({ adder, mult, station: fldStation }) => {
    if (adder) {
        const li = document.querySelector("#adder");
        const stationId = adder.station ? String(adder.station.id).padStart(2, "0") : "--";
        li.children[0].innerText = adder.busy ? "busy" : "free";
        li.children[1].innerText = `rs#${stationId}`;
        li.children[2].innerText = String(adder.station.cicles).padStart(2, "0");
        li.classList.add("active");
        setTimeout(() => {
            li.classList.remove("active");
        }, 950);
    }

    if (fldStation) {
        const id = fldStation.opName + fldStation.id;
        const li = document.querySelector(`#${id}`);
        const bufferList = li.parentElement;
        li.children[0].title = fldStation.vk;
        li.children[0].innerText = "0x" + fldStation.vk.toString(16).padStart(3, "0")
        li.children[1].innerText = fldStation.vj;
        li.classList.add("active");
        setTimeout(() => {
            li.classList.remove("active");
        }, 950);
        bufferList.scrollTo({ top: li.clientHeight * fldStation.id, behavior: "smooth" })
    }

    // const li2 = document.querySelector("#mult");
    // li2.children[0].innerText = mult.busy ? "busy" : "free";
    // li2.children[1].innerText = mult.station ? mult.station.opName : "";
    // li2.children[2].innerText = mult.result.toFixed(2);
    // li2.classList.add("active");
    // setTimeout(() => {
    //     li2.classList.remove("active");
    // }, 950);
}

const wbCallback = (stations, registers) => {
    stations.forEach(stationg => {
        const id = stationg.opName + stationg.id;
        const li = document.querySelector(`#${id}`);
        // li.children[0].innerText = stationg.busy ? "busy" : "free";
        // li.children[1].innerText = stationg.opName;
        // li.children[2].innerText = stationg.vj.toFixed(2);
        // li.children[3].innerText = stationg.vk.toFixed(2);
        // li.title = `Qj: ${stationg.qj}\nQk: ${stationg.qk}`;
        li.classList.add("active");
        setTimeout(() => {
            li.classList.remove("active");
        }, 950);
    });

    registers.forEach(reg => {
        const li = document.querySelector(`#f${reg.id}`);
        li.children[1].innerText = reg.value.toString(2).slice(0, 31) + "...";
        li.title = reg.value;
        li.classList.add("active");
        registersList.scrollTo({ top: li.clientHeight * reg.id, behavior: "smooth" })
        setTimeout(() => {
            li.classList.remove("active");
        }, 950);
    })
}

const uiCallbacks = {
    issue: issueCallback,
    execute: exCallback,
    writeBack: wbCallback,
}

const registersList = document.querySelector("#registers-list");
let fragment = document.createDocumentFragment();
for (let i = 0; i < 32; i++) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.id = `f${i}`
    li.innerHTML = `<strong class="float-start">f${i}</strong>
                            <span class="float-end">00000000000000000000000000000000</span>`;
    fragment.appendChild(li);
}
registersList.appendChild(fragment);