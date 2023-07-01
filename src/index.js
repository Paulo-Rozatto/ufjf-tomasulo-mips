import { setInstructions, issue, execute, writeBack, clearActive, init } from "./interface-handlers.js";
import { assemblyToBin, binToAssembly } from "./translator.js";
import * as cpu from "./cpu.js";

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-button")

const textInput = document.querySelector("#codeTextInput");
const fileInput = document.querySelector("#codeFileInput");
const textOutput = document.querySelector("#codeTextOutput");

const upModal = document.querySelector("#uploadModal");
const saveButton = document.querySelector("#saveButton");

const downModal = document.querySelector("#downloadModal");
const downloadButton = document.querySelector("#downloadButton");

const reset = document.querySelector("#reset");
const run = document.querySelector("#run");
const pause = document.querySelector("#pause");
const foward = document.querySelector("#foward");

const INTERVAL_TIME = 1000; // ms
let interval;

let code = `fld $1, 16($12)
fsd $1, 8($0)
fmul $6, $1, $5
fdiv $7, $5, $1
fadd $2, $1, $5
fsub $3, $2, $5
fadd $4, $3, $5
fadd $5, $4, $5`;
// code = "fdiv $6, $1, $5";

// cpu setup
cpu.setUICallbacks({ issue, execute, writeBack });

foward.onclick = () => {
    clearActive();
    cpu.step();
}

reset.onclick = () => {
    init();
    clearActive();
    cpu.reset();
}

run.onclick = () => {
    clearActive();
    cpu.step();
    interval = setInterval(() => {
        clearActive();
        cpu.step();
    }, INTERVAL_TIME);
}

pause.onclick = () => {
    clearInterval(interval);
}

// handle menu visibility
menuBtn.onclick = () => {
    menu.classList.toggle("menu-visible");
    menu.classList.toggle("menu-hidden");
}

fileInput.onchange = () => { // read file and put it in the text input
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const result = event.target.result;
        textInput.innerHTML = result;
    }

    reader.readAsText(file);
}

saveButton.onclick = () => { // save code from text input
    code = textInput.value.toString().trim();
    if (/[a-z]/.test(code)) { // if code is not binary
        code = code.split("\n").map(e => assemblyToBin(e))
    } else {
        code = code.split("\n");
    }

    setInstructions(code)
    cpu.setInstructions(code)
}

upModal.addEventListener("show.bs.modal", () => { // clear input when modal is opened
    fileInput.value = "";
    textInput.value = typeof code === "string" ? code : code.join("\n");
})

// handle output
downModal.addEventListener("show.bs.modal", () => textOutput.innerHTML = code) // put code in output when modal is opened

downloadButton.onclick = (event) => {
    let blob = new Blob([code], { type: 'text/plain' });
    event.target.download = "resultado.txt";
    event.target.href = window.URL.createObjectURL(blob);
}