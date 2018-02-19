/*jshint esversion:6 */
/*global console, requestAnimationFrame, setInterval, clearInterval, cancelAnimationFrame*/

function stopWatch(length) {
    let startTime = Date.now();
    let endTime = startTime + (length * 60 * 1000);
    let watchSwitch = false;
    let i;

    function start() {
        watchSwitch = true;
        i = requestAnimationFrame(showTime);
    }

    function stop() {
        watchSwitch = false;
        cancelAnimationFrame(i);
        return true;
    }
    
    function reset() {
        if (!watchSwitch)
            endTime = startTime + (length * 60 * 1000);
        else
            throw Error("Please stop the timer first");
    }

    function getRemainingTime() {
        endTime -= (1000 / 60);
        return endTime - startTime;
    }

    function showTime() {
       // if (watchSwitch) {
            const remainingTime = getRemainingTime();

            if (remainingTime < 1000) {
                console.log('Time is up Fam');
                return;
            }

            const secs = Math.floor((remainingTime / 1000) % 60);
            const mins = Math.floor((remainingTime / (60 * 1000)) % 60);
            console.log(`${mins} : ${secs}`);
            i = requestAnimationFrame(showTime);
        //}
    }

    return {
        start,
        stop,
        reset
    };
}
window.stopWatch = stopWatch;