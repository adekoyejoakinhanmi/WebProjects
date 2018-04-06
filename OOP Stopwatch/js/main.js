/*jshint esversion:6 */
/*global console, requestAnimationFrame, setInterval, clearInterval, cancelAnimationFrame, window*/


// define a class
class Observable {
    // each instance of the Observer class
    // starts with an empty array of things (observers)
    // that react to a state change
    constructor() {
      this.observers = [];
    }
  
    // add the ability to subscribe to a new object / DOM element
    // essentially, add something to the observers array
    subscribe(f) {
      this.observers.push(f);
    }
  
    // add the ability to unsubscribe from a particular object
    // essentially, remove something from the observers array
    unsubscribe(f) {
      this.observers = this.observers.filter(subscriber => subscriber !== f);
    }
  
    // update all subscribed objects / DOM elements
    // and pass some data to each of them
    notify(data) {
      this.observers.forEach(observer => observer(data));
    }
}
  
  




function Watch(length, el) {
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
        if (!watchSwitch) {
            endTime = startTime + (length * 60 * 1000);
            showTime();
        }
        else
            return; //throw Error("Please stop the timer first");
    }

    function getRemainingTime() {
        endTime -= (1000 / 60);
        return endTime - startTime;
    }

    function switchState() {
        return watchSwitch;
    }

    function showTime() {
       // if (watchSwitch) {
            const remainingTime = getRemainingTime();

            if (remainingTime < 1000) {
                el.textContent = `00:00:00`;
                return;
            }

            const secs = Math.floor((remainingTime / 1000) % 60);
            const mins = Math.floor((remainingTime / (60 * 1000)) % 60);
            el.textContent = (`${mins} : ${secs}`);
            i = requestAnimationFrame(showTime);
        //}
    }

    return {
        start,
        stop,
        reset,
        switchState
    };
}


function init() {
    var time = document.getElementById("time");
    var startBtn = document.getElementById("start");
    var resetBtn = document.getElementById("reset");

    var stopWatch = new Watch(2, time);

    startBtn.addEventListener("click", (e) => {
        if(!stopWatch.switchState()) {
            stopWatch.start();
            startBtn.textContent = `Stop`;
        } 
        else {
            stopWatch.stop();
            startBtn.textContent = `Start`;
        };
    });

    resetBtn.addEventListener("click", (e) => {
        if (stopWatch.switchState()) {
            stopWatch.reset();
        }
    })
}

init();