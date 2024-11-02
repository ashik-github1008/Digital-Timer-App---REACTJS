// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    isRunning: false,
    runningTime: 25 * 60,
  }

  componentDidMount() {
    this.setState({displayTime: this.formatTime(this.state.runningTime)})
  }

  formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  startPauseClick = () => {
    this.setState(prevState => {
      // Toggle isRunning state
      const newIsRunning = !prevState.isRunning

      if (newIsRunning) {
        clearInterval(this.timerID)
        this.timerID = setInterval(this.tick, 1000)
      } else if (newIsRunning === false) {
        clearInterval(this.timerID)
      }

      return {isRunning: newIsRunning}
    })
  }

  tick = () => {
    this.setState(prevState => {
      if (prevState.runningTime <= 0) {
        clearInterval(this.timerID)
        return {isRunning: false, runningTime: 0}
      } else {
        return {
          runningTime: prevState.runningTime - 1,
        }
      }
    })
  }

  onClickAdjustMinusBtn = () => {
    const {isRunning} = this.state;
    if (!isRunning) {
      this.setState(prevState => {
        const newTimerLimit = Math.max(0, prevState.timerLimit - 1)
        return {
          timerLimit: newTimerLimit, // Prevent timer limit from going negative
          runningTime: Math.max(0, newTimerLimit * 60),
        }
      })
    }
  }

  onClickAdjustPlusBtn = () => {
    const {isRunning} = this.state;
    if (!isRunning) {
      this.setState(prevState => {
        const newTimerLimit = prevState.timerLimit + 1
        return {
          timerLimit: newTimerLimit, // Increment timer limit by 1 minute
          runningTime: newTimerLimit * 60,
        }
      })
    }
  }

  onClickResetBtn = () => {
    clearInterval(this.timerID)
    this.setState({
      timerLimit: 25,
      isRunning: false,
      runningTime: 25 * 60,
    })
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    const {runningTime, isRunning, timerLimit} = this.state
    const startOrPauseText = isRunning ? 'Pause' : 'Start'
    const runningOrPassed = isRunning ? 'Running' : 'Paused'
    const displayTime = this.formatTime(runningTime)
    const isDisabled = isRunning || displayTime === '00:00'

    console.log(isRunning)

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="whole-timer-container">
          <div className="timer-container">
            <div className="time-running-container">
              <h1 className="time-display mb-0">{displayTime}</h1>
              <p className="status-display">{runningOrPassed}</p>
            </div>
          </div>
          <div className="timer-buttons-container">
            <div className="start-pause-reset-btn-container mb-4">
              <div className="start-pause-container mr-5">
                <button
                  className="startReset-btn d-flex flex-row"
                  onClick={this.startPauseClick}
                >
                  <img
                    src={
                      isRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isRunning ? 'pause icon' : 'play icon'}
                    className="icon"
                  />
                  <p className="startReset-btn button-text">{startOrPauseText}</p>
                </button>
              </div>
              <div className="reset-container">
                <button
                  className="startReset-btn d-flex flex-row"
                  onClick={this.onClickResetBtn}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                  <p className="startReset-btn button-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="timer-limit-text">Set Timer limit</p>
            <div className="plus-minus-container">
              <button
                className="adjust-button"
                onClick={this.onClickAdjustMinusBtn}
                disabled={isDisabled}
              >
                -
              </button>
              <p className="time-limit">{timerLimit}</p>
              <button
                className="adjust-button"
                onClick={this.onClickAdjustPlusBtn}
                disabled={isDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
