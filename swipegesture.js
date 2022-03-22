class SwipeGesture{
    constructor(bgColor='#ddd',rightCb,leftCb){
        this.touchArea = document.querySelector(".toucharea[data-touch^='swipe']")
        this.touchArea.style.width = "100%"
        this.touchArea.style.height = "100vh"
        this.touchArea.style.background = bgColor
        // Define the following: startX, startY, distX, thresholdX, allowedTime, startTime, elapsedTime
        this.startX = 0
        this.startY = 0
        this.distX = 0
        this.distY = 0
        this.thresholdX = 150 // Min distance to be traveled on the X axis to be considered as a swipe
        this.thresholdY = 100 // Max distance to be traveled on the Y axis to be considered as a swipe
        this.allowedTime = 250 // Max time for distXance travelled
        this.startTime = 0
        this.elaspedTime = 0
        
        this.touchArea.addEventListener('touchstart',(ev)=>this.touchStart(ev))
        this.touchArea.addEventListener('touchmove',(ev)=>this.touchMove(ev))
        this.touchArea.addEventListener('touchend',(ev)=>this.touchEnd(ev,rightCb,leftCb))
    }
    touchStart(ev){
        ev.preventDefault();
        ev.stopPropagation()

        this.startX = ev.changedTouches[0].pageX 
        this.startY = ev.changedTouches[0].pageY 
        this.startTime = new Date().getTime()

    }
    touchMove(ev){
        ev.preventDefault();
        ev.stopPropagation()
    }
    touchEnd(ev,rightCb,leftCb){
        ev.preventDefault();
        ev.stopPropagation()

        this.distX = this.startX - ev.changedTouches[0].pageX
        this.distY = Math.abs(this.startY - ev.changedTouches[0].pageY)
        this.elaspedTime = Math.abs(new Date().getTime() - this.startTime)

        
        let rightSwipeBool = (this.distX <= -this.thresholdX && this.distY <= this.thresholdY && this.elaspedTime <= this.allowedTime)
        
        let leftSwipeBool = (this.distX >= this.thresholdX && this.distY <= this.thresholdY && this.elaspedTime <= this.allowedTime)

        if(rightSwipeBool)
            rightCb()
        if(leftSwipeBool)
            leftCb()
    }
}

