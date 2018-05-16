import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function ControlButton (props) {
    return (
        <button className="control" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          nextX: true,
        };
      }

      handleClick(i) {
        const squares = this.state.squares.slice();
        if (hasWon(squares) || squares[i]) {
          return;
        }
        if (this.state.nextX) {
            squares[i] = 'X';
        }
        else {
            squares[i] = 'O';
        }
        this.setState({
            squares: squares,
            nextX: !this.state.nextX,
        });
      }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = hasWon(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else{
            status = 'Next player: ';
            if (this.state.nextX) {
                status += 'X';
            }
            else {
                status += 'O';
            }
        }

        return (
        <div>
            <div className="status">
                {status}
            </div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          playing: false,
          gameControl: "Play",
          message: "Click Play to Start Game!",
        };
      }

    renderButton() {
        return(
            <ControlButton 
                value={this.state.gameControl}
                onClick={() => this.handleClick()}
            />
        );
    }
    handleClick() {
        if (!this.state.playing){
            this.setState({
                playing: true,
                gameControl: "Stop"
            });
        }
        else {
            this.setState({
                playing: false,
                gameControl: "Play"
            })
        }
    }

    renderGame() {
        if (this.state.playing) {
            return (
                <div>
                    <div className="game-board">
                        <Board />
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="game">
                <div>{this.renderGame()}</div>
                <div className="game-control">
                    <div>{this.renderButton()}</div>
                </div>
            </div>
        );
    }
}

function hasWon (squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);