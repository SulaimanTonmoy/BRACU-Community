// time consuming function
const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// test function
const test = async () => {
    console.log("start");
    console.log("wait 2 seconds");
    await wait(2000);
    console.log("end");
};
test();