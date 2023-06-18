import { setInstructions, issue, execute, writeBack, clearActive } from "./interface-handlers.js";
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

// conde entry
let code = `00000000010100001001000110000001`; // fadd $3, $1, $5
code = `00000000100001000000000000000010` + "\n" + code; // lw $1 2($3)

// cpu setup
cpu.setUICallbacks({ issue, execute, writeBack });

foward.onclick = () => {
    clearActive();
    cpu.step();
}

// handle menu visibility
menuBtn.onclick = () => {
    menu.classList.toggle("menu-visible");
    menu.classList.toggle("menu-hidden");
}

// handle code input
textInput.onkeydown = (event) => { // dont allow typing keys other than 0, 1, newline and backspace
    if (event.key != "0" && event.key != "1" && event.key != "Enter" && event.key != "Backspace") {
        event.preventDefault();
    }
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
    code = textInput.innerHTML.toString();
    const commands = code.split('\n');
    setInstructions(commands)
    cpu.setInstructions(commands)
}

upModal.addEventListener("show.bs.modal", () => { // clear input when modal is opened
    fileInput.value = "";
    textInput.innerHTML = code;
})

// handle output
downModal.addEventListener("show.bs.modal", () => textOutput.innerHTML = code) // put code in output when modal is opened

downloadButton.onclick = (event) => {
    let blob = new Blob([code], { type: 'text/plain' });
    event.target.download = "resultado.txt";
    event.target.href = window.URL.createObjectURL(blob);
}