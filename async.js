function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 1000);
    })
}

async function getApple() {
    await delay();
    return "apple";
}

async function getBanana() {
    await delay();
    return "banana";
}

function getFruites() {
    getApple()
        .then((a) => { // 리턴값이 promise의 resolve()이므로 then 가능
            getBanana()
                .then((b) => console.log(`${a} and ${b}`));
        })
}

getFruites();