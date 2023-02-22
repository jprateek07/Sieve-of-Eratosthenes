let soe = document.getElementById("soe");
let start = document.getElementById("solve_soe");
let result = document.getElementById("result");
let stop = document.getElementById("clear");

function displayNumbers() {
    let count = 1;
    for (let i = 1; i <= 10; i++) {
        let soeRow = document.createElement("tr");
        soe.appendChild(soeRow);
        for (let j = 1; j <= 10; j++) {
            let soeCell = document.createElement("td");
            soeRow.appendChild(soeCell);
            soeCell.id = `cell-${count}`;
            if (count == 1) {
                soeCell.classList.add("one");
            }
            soeCell.innerText = count;
            count++;
        }
    }
}

let ms = 100;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function notPrime(num) {
    for (i = 0; i < num.length; i++) {
        let cell = document.getElementById(`cell-${num[i]}`);
        cell.classList.add("notPrime");
        await sleep(ms);
    }
}

async function primeSieveAlgo() {
    let arr = new Array(101).fill(false);
    arr[0] = true;
    let num = [];
    for (let i = 2; i < arr.length; i++) {
        await sleep(ms);
        if (arr[i] == false) {
            result.innerHTML += i + ",&nbsp;&nbsp;";
            let cell = document.getElementById(`cell-${i}`);
            cell.classList.add("currentCell");
            await sleep(ms * 10);
            for (let j = 2; i * j <= 100; j++) {
                let multi = document.getElementById(`cell-${i*j}`);
                console.log(i * j)
                arr[i * j] = true;
                multi.classList.add("notPrime");
                num.push(i * j);
                await sleep(ms);
            }
            await sleep(ms);
            cell.classList.remove("currentCell");
            cell.classList.add("prime");
            await sleep(ms);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayNumbers();
    result.innerHTML = "";
});

start.addEventListener("click", function () {
    start.disabled = true
    primeSieveAlgo();
});

stop.addEventListener("click", function () {
    window.location.reload()
})