import React, { Component } from 'react';
import Square from './squares'

class Grid extends Component {
    state = { 
        ImageUrl :  'jai_Ganesh_Deva.jpeg',
        squares:[
            { id:0 , value:"" },
            { id:1 , value:"" },
            { id:2 , value:"" },
            { id:3 , value:"" },
            { id:4 , value:"" },
            { id:5 , value:"" },
            { id:6 , value:"" },
            { id:7 , value:"" },
            { id:8 , value:"" },

        ],
        turn:1,
        winner:'-',
        winX:0,
        winO:0,
        doneSquares:[],
    }

    styleImg1 = {
        display : 'inline-block',
        float:'left',
        margin:5,
        width:300,
        height:200,
    };

    styleImg2 = {
        display : 'inline-block',
        float:'right',
        margin:5,
        width:300,
        height:200,
    };

    styleHeadingText = {
        textAlign:'center',
        height:75,
        padding: 75,
        margin:'auto',
        width : '50%',
    }

    styleTurn = {
        textAlign:'center'
    }

    styleResetButton = {
        display:'inline-block',
        backgroundColor:' #ff33cc',
        width : 100,
        height:50,
        marginLeft:100,
    }

    getWinner(){
        const sq=this.state.squares;
        if( (sq[0].value===sq[1].value) && (sq[2].value===sq[1].value) && (sq[0].value!=='')) return sq[0].value;
        if( (sq[3].value===sq[4].value) && (sq[5].value===sq[4].value) && (sq[3].value!=='')) return sq[3].value;
        if( (sq[6].value===sq[7].value) && (sq[8].value===sq[7].value) && (sq[6].value!=='')) return sq[6].value;
        if( (sq[0].value===sq[3].value) && (sq[6].value===sq[3].value) && (sq[0].value!=='')) return sq[0].value;
        if( (sq[1].value===sq[4].value) && (sq[7].value===sq[1].value) && (sq[1].value!=='')) return sq[1].value;
        if( (sq[8].value===sq[2].value) && (sq[5].value===sq[2].value) && (sq[2].value!=='')) return sq[2].value;
        if( (sq[0].value===sq[4].value) && (sq[4].value===sq[8].value) && (sq[0].value!=='')) return sq[0].value;
        if( (sq[2].value===sq[4].value) && (sq[2].value===sq[6].value) && (sq[2].value!=='')) return sq[2].value;
        
        return this.state.winner;
    };


    handleOnClick = (squareID) => {
        let z=0;
        const squares = this.state.squares.map(sq=>{
            if(this.state.winner === '-')
            {    
                if(sq.id === squareID)
                {
                    if(sq.value === '')
                    {
                        if(this.state.turn%2 === 1)
                        {
                            sq.value='X';
                        }
                        else sq.value='O';
                        z=1;
                    }
                }
            }
            return sq;
        })
        let doneSquares = this.state.doneSquares;
        if(z === 1) doneSquares.push(squareID)
        let winner;
        if(this.state.turn===9) winner='Draw'; 
        
         winner = this.getWinner();
        let winX=this.state.winX;
        let winO = this.state.winO;
        
        if(z===1 )
        {
            if(winner==='X') winX+=1;
            else if(winner==='O') winO+=1; 
        } 
        
        this.setState({squares , turn:this.state.turn+z,winner,winO,winX,doneSquares });
        
        console.log('square with id' ,squareID , "clicked");
    }

    handleReset = () => {
        console.log("Reset function called");
        const squares = this.state.squares.map(sq=>{
            
            sq.value = '';

            return sq;
        })
        let winner='-';

        this.setState({squares , turn:1,winner});
    }
    handleRestart = () => {
        this.handleReset();
        this.setState({winX:0, winO:0})
    }

    handleUndo = () => {
        if(this.state.turn >1)
        {
            let doneSquares = this.state.doneSquares;
            let squareID = doneSquares.pop();
            const squares = this.state.squares.map(sq=>{                
                if(sq.id === squareID)
                {
                    sq.value='';
                }
                return sq;
            })
            let winX = this.state.winX;
            let winO = this.state.winO;
            if(this.state.winner === 'X' ) winX-=1;
            if(this.state.winner === 'O' ) winO-=1;
            this.setState({turn:this.state.turn-1,squares,doneSquares,winner:'-'
                ,winX,winO
            });  
        }
    }
    render() { 
        return (  
            <React.Fragment>
            <img src={this.state.ImageUrl} style={this.styleImg1}/>
            <img src={this.state.ImageUrl} style={this.styleImg2}/>
            <h1 style = {this.styleHeadingText} > Jai Ganesh Deva</h1>
            <button style={this.styleResetButton} onClick={this.handleRestart}> Restart </button>
            <button style={this.styleResetButton} onClick={this.handleReset}> Reset </button>
            <button style={this.styleResetButton} onClick={this.handleUndo}> Undo </button>
            
            <h3 style={this.styleTurn}>  Winner : {this.state.winner} </h3>
            
            <h3 style={this.styleTurn}> Player's Turn : {this.getTurn()} </h3>
            {this.state.squares.map(square =>
                <Square   
                    key={square.id}
                    square={square}
                    handleOnClick = {this.handleOnClick}
                > 
                </Square> 
            )}           
            <h3 style={this.styleTurn}> Player X's Score : {this.state.winX} </h3>
            <h3 style={this.styleTurn}> Player O's Score : {this.state.winO} </h3>
            
            <br/><br/><br/><br/>
            {/* Note - If you press <b>ctrl + R </b> the game will restart. */}
            </React.Fragment>
        );
    }

    getTurn(){
        const a = this.state.turn;
        if(a%2 === 0) return 'O';
        return 'X';
    }
}
 
export default Grid;
