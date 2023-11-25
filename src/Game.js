import React, { Component } from 'react';
import './Game.css';
import CardView from './CardView';
import MemoryCards from './MemoryCards';



class Game extends Component {
    state = { timer: 0,  isGameFinished: false,};
    
    constructor(props) {
        super(props);
        this.onCardClicked = this.onCardClicked.bind(this);
        this.memoryCards = new MemoryCards();
    }

    componentDidMount() {
        this.initGame();
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
      }

    initGame() {
        this.memoryCards.generateCardSet();
        this.setState({
            turnNo: 1,
            pairsFound: 0,
            numClicksWithinTurn: 0,
            firstId: undefined,
            secondId: undefined,
            

        });
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
          this.setState((prevState) => ({
            timer: prevState.timer + 1,
          }));
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.setState({
          isGameFinished: true,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.pairsFound === this.memoryCards.NUM_IMAGES && !this.state.isGameFinished) {
          this.stopTimer();
        }
      }
    

    getCardViews() {
        const cardViews = this.memoryCards.cards.map(c =>
            <CardView key={c.id}
            id={c.id}
            image={c.image}
            imageUp={c.imageUp}
            matched={c.matched}
            onClick={this.onCardClicked} />
        );
        return cardViews;
    }

    clearCards(id1, id2) {
        if (this.state.numClicksWithinTurn !== 2) {
            return;
        }
        this.memoryCards.flipCard(this.state.firstId, false);
        this.memoryCards.flipCard(this.state.secondId, false);
        this.setState({
            firstId: undefined,
            secondId: undefined,
            numClicksWithinTurn: 0,
            turnNo: this.state.turnNo + 1
            
        });
        clearTimeout(this.timeout);
    }

    onCardClicked(id, image) {
        if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
            if (this.state.numClicksWithinTurn === 2) {
                clearTimeout(this.timeout);
                this.clearCards(this.state.firstId, this.state.secondId);
            }
            this.memoryCards.flipCard(id, true);
            this.setState({
                firstId: id,
                numClicksWithinTurn: 1
            });
        } else if (this.state.numClicksWithinTurn === 1) {
            this.memoryCards.flipCard(id, true);
            this.setState({
                secondId: id,
                numClicksWithinTurn: 2
            });

            if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
                this.memoryCards.setCardAsMatched(this.state.firstId, true);
                this.memoryCards.setCardAsMatched(id, true);
                this.setState({
                    pairsFound: this.state.pairsFound + 1,
                    firstId: undefined,
                    secondId: undefined,
                    turnNo: this.state.turnNo + 1,
                    numClicksWithinTurn: 0
                });

            } else {
                this.timeout = setTimeout(() => {
                    this.clearCards(this.state.firstId, this.state.secondId);
                }, 5000);
            }
        }
    }


    render() {
        const { userName } = this.props;
        const cardViews = this.getCardViews();
        let gameStatus = (<div className='Game-status'>
            <div>Score: {this.state.pairsFound}</div>
            <div> Time:{formatTime(this.state.timer)}</div>
        </div>);

        if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
            gameStatus = (
              <div className='Game-status'>
                <div>Score: {this.state.pairsFound}</div>
                <div>Time: {formatTime(this.state.timer)}</div>
              </div>
            );
            return (
                
                <div className='Game'>
                    <header className='Game-header'>
                        <div className='Game-title'>React Tiles</div>
                    </header>
                    <div>
                        {gameStatus}
                    </div>
                    <div  className='CardContainer'>
                    <p>Welcome {userName} 👍👍
                    </p>
                        <div className='fin'>Game Finished!</div>
                        <div className='score'>Score: {this.state.pairsFound} </div>
                        <div className='time'> Time Taken: {formatTime(this.state.timer)}</div> 
                        <div className='time'> Total turns: {this.state.turnNo}</div> 
                    </div>
                </div>
              );
        }

        return (
            <div className='Game'>
                <header className='Game-header'>
                    <div className='Game-title'>Mahajong Game</div>
                </header>
                <div>
                    {gameStatus}
                </div>
                <div className='CardContainer'>
                    <p>
                        Welcome {userName} 👍👍
                    </p>
                    {cardViews}
                </div>
            </div>
        );
    }
}

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

export default Game;
