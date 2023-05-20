import variables from './variables.js'

variables.startBtn.addEventListener('click', () => start())

variables.rightBtn.addEventListener('click', () => {
    const findLeft = variables.words.indexOf(variables.leftBox.innerText)
    const findRight = variables.colors.indexOf(variables.rightBox.style.color)

    if(variables.gameTimerCounter === 0) {
        gameOver()
    }
    if(findLeft === findRight) {
        winHandler()
    } else {
        loseHandler()
    }
    // почему то работает через раз :(
    // cards.classList.remove('cards__anim')
    // cards.classList.add('cards__anim')
})

variables.leftBtn.addEventListener('click', () => {
    const findLeft = variables.words.indexOf(variables.leftBox.innerText)
    const findRight = variables.colors.indexOf(variables.rightBox.style.color)

    if(variables.gameTimerCounter === 0) {
        gameOver()
    }
    if(findLeft !== findRight) {
        winHandler()
    } else {
        loseHandler()
    }
})

variables.againBtn.addEventListener('click', () => {
    variables.gameTimer.innerText = '00:59';
    start()
})

const winHandler = () => {
    countGame()
    counterWin()
    upGameBonus(1)
    upGameLvl()
    variables.yesAnim.style.display = 'block'
    setTimeout(() => {
        variables.yesAnim.style.display = 'none'
    }, 500)
}

const loseHandler = () => {
    countGame()
    counterLose()
    upGameBonus(-1)
    variables.noAnim.style.display = 'block'
    setTimeout(() => {
        variables.noAnim.style.display = 'none'
    }, 500)
}

const start = () => {
    let second = 3;
    updatingVariables(second)
    const interval = setInterval(() => {
        second--
        variables.timerCounter.innerText = second
        if(second === 0) {
            clearInterval(interval)
            variables.main.style.display = 'flex'
            variables.timer.style.display ='none'
            counterOfGameTime()
        }
    }, 1000)

    variables.counterId.innerText = 0
    countGame()
}

const countRandomIndex = () => {
    const randomColorIndex = Math.floor(Math.random() * (variables.colors.length))
    const randomWordIndex = Math.floor(Math.random() * (variables.words.length))
    return {
        randomWordIndex,
        randomColorIndex
    }
}

const countGame = () => {
    const randomMain = countRandomIndex()
    const randomSide = countRandomIndex()

    const indexWordLeft = randomMain.randomWordIndex
    const indexColorRight = randomMain.randomColorIndex
    const indexWordRight = randomSide.randomWordIndex
    const indexColorLeft = randomSide.randomColorIndex

    variables.leftBox.innerText = variables.words[indexWordLeft]
    variables.rightBox.style.color = variables.colors[indexColorRight]
    variables.rightBox.innerText = variables.words[indexWordRight]
    variables.leftBox.style.color = variables.colors[indexColorLeft]

    return {
        indexWordLeft, indexColorRight
    }
}

const counterWin = () => {
    variables.counter += 200 * (Math.floor(variables.gameBonusCounter / 3 ) + 1)
    variables.counterId.innerText = variables.counter
    variables.answers += 1
}

const counterLose = () => {
    variables.counter -= 400
    variables.counterId.innerText = variables.counter
}

const counterOfGameTime = () => {
     const interval = setInterval(() => {
         variables.gameTimerCounter--

         if (variables.gameTimerCounter === 0) {
             variables.gameTimer.innerText = '00:00'
             clearInterval(interval)
         } else if (variables.gameTimerCounter < 10) {
             variables.gameTimer.innerText = '00:0' + variables.gameTimerCounter
         } else if (variables.gameTimerCounter > 10) {
             variables.gameTimer.innerText = '00:' + variables.gameTimerCounter
         }
     }, 1000)
}

const upGameLvl = () => {
    variables.lvl = variables.gameLvl.innerText
    variables.gameLvl.innerText = parseInt(variables.lvl) + 1
}

const upGameBonus = (point) => {
    if( point === -1 && variables.gameBonusCounter >= 3) {
        variables.gameBonusCounter -= 2
    } else if(point === -1 && variables.gameBonusCounter < 3) {
        variables.gameBonusCounter = 1
    }
    variables.gameBonusCounter += point
    variables.gameBonus.innerText = 'x' + (Math.floor(variables.gameBonusCounter / 3 ) + 1);
}

const gameOver = () => {
    variables.finalResult.innerText = variables.counter
    variables.finalCountAnswers.innerText = variables.answers
    variables.finalLevel.innerText =  parseInt(variables.lvl) + 1
    variables.main.style.display = 'none'
    variables.final.style.display ='flex'
}

const updatingVariables = (second) => {
    variables.gameTimerCounter = 59;
    variables.counter = 0
    variables.gameBonusCounter = 0
    variables.lvl = variables.gameLvl.innerText
    variables.answers = 0;

    variables.final.style.display ='none'
    variables.timerCounter.innerText = second
    variables.gameBonus.innerText = 'x1';
    variables.gameLvl.innerText = 1
    variables.timer.style.display = 'flex'
    variables.startBtn.classList.add('disable')
    variables.timer.classList.add('timer-on')
    variables.timerCounter.classList.remove('disable')
}








