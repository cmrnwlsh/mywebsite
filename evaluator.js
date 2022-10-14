(async function () {
    for (let i = 0; i < 60; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(i)
    }
})().then(_ => console.log("1 minute elapsed"));