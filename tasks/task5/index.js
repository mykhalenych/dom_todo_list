// === Callbacks ===
// Звичайний Callback
function fetchData(callback) {
    setTimeout(() => {
        callback("Дані отримано через Callback!");
    }, 2000);
}

document.getElementById("callbackBtn").addEventListener("click", () => {
    const output = document.getElementById("callbackOutput");
    output.textContent = "Завантаження...";

    fetchData((result) => {
        output.textContent = result;
    });
});

// === Callback Hell ===
function step1Callback(callback) {
    setTimeout(() => {
        console.log("Крок 1");
        callback("Результат 1");
    }, 1000);
}

function step2Callback(prevResult, callback) {
    setTimeout(() => {
        console.log("Крок 2");
        callback(prevResult + " → Результат 2");
    }, 1000);
}

function step3Callback(prevResult, callback) {
    setTimeout(() => {
        console.log("Крок 3");
        callback(prevResult + " → Результат 3");
    }, 1000);
}

document.getElementById("chainBtn").addEventListener("click", () => {
    const output = document.getElementById("chainOutput");
    output.textContent = "Початок...";

    step1Callback((res1) => {
        if (res1) {
            step2Callback(res1, (res2) => {
                if (res2) {
                    step3Callback(res2, (res3) => {
                        output.textContent = res3;
                    });
                } else {
                    console.log()
                }
            });
        } else {
            console.log()
        }

    });
});

// === Promises ===
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.3 ? resolve("Дані отримано через Promise!") : reject("Помилка!");
        }, 2000);
    });
}

document.getElementById("promiseBtn").addEventListener("click", () => {
    const output = document.getElementById("promiseOutput");
    output.textContent = "Завантаження...";
    console.log(fetchDataPromise());
    fetchDataPromise()
        .then((result) => {
            console.log('позитивний сценарій');
            output.textContent = result
        })
        .catch((error) => {
            console.log('негативний сценарій');
            output.textContent = error
        })
        .finally(() => {
            console.log('finally')
        })
});


// === Async/Await ===
function fetchDataAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Дані отримано через Async/Await!");
        }, 2000);
    });
}

document.getElementById("asyncBtn").addEventListener("click", async () => {
    const output = document.getElementById("asyncOutput");
    output.textContent = "Завантаження...";

    try {
        const result = await fetchDataAsync();

        output.textContent = result;
    } catch (error) {
        output.textContent = "Помилка!";
    }
});

// === Чистий чейнінг з промісами ===
function step1() {
    return new Promise((resolve) => setTimeout(() => resolve("Крок 1 виконано"), 1000));
}

function step2(prevResult) {
    return new Promise((resolve) => setTimeout(() => resolve(prevResult + " → Крок 2 виконано"), 1000));
}

function step3(prevResult) {
    return new Promise((resolve) => setTimeout(() => resolve(prevResult + " → Крок 3 виконано"), 1000));
}

document.getElementById("chainBtn").addEventListener("click", () => {
    const output = document.getElementById("chainOutput");
    output.textContent = "Початок...";

    step1()
        .then((res1) => step2(res1))
        .then((res2) => step3(res2))
        .then((finalResult) => output.textContent = finalResult)
        .catch((error) => output.textContent = "Помилка: " + error);
});
