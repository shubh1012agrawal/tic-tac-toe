import React, { Component } from 'react';

class Square extends Component {
    state = {  
    }
    
    styleButton = {
        backgroundColor:'#99ff99',
        width:100,
        height:100,
        margin:0,
        padding:0,
        verticalAlign:'middle',
    };

    styleMargin = {
         display:'inline-block',
        marginLeft:'40%',
        // padding:100
    }
    render() { 
        return (  
            <React.Fragment>
                {this.funcMargin()}
                <button style={this.styleButton} 
                    onClick = { () => this.props.handleOnClick(this.props.square.id)}>
                    {this.props.square.value}
                </button>
                {this.newLine()}
            </React.Fragment>
        );
    }

    funcMargin()
    {
        let a = this.props.square.id;
        if(a%3 === 0) 
            return <div style={this.styleMargin}></div> ; 
        return <span></span>;
    }

    newLine()
    {
        let b = this.props.square.id;
        if(b%3 === 2) return <br/>
        return <span></span> 
    }

}

 
export default Square;