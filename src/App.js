import { Component } from "react";


class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            numberOfStates:'',
            states:{
                s0:{ a:'s3', b:'s0', c: 's1'},
                s1: {a:'s2', b:'s3', c: 's2'},
                s2:{a:'s2', b:'s2', c: 's1'},
                s3: {a:'s0', b:'s2', c: 's0'}
            },
            accStates:['s0','s1'],
            // accStates:[],
            string:'caabc',
            // string:'',
            InitialState:'s0',
            // InitialState:'',
            result:''
        }
    }

    handleChange(value, event) {
        this.setState({[value]: event.target.value});
    }

    onChange(value, event) {
        event.preventDefault();
        let {states} = this.state;
        let arr = this.state[value].split(':');
        let stateName = event.target.innerHTML;
        console.log('arr', arr)
        console.log('stateName', stateName)
        states[stateName][arr[0]] = arr[1];
        this.setState({
            [value]: event,
            [stateName]: '',
        });
        this.myFormRef.reset();
    }

    renderRow(rows, i, len) {
        let obj = {};
        while (i <= len)  {
            obj[`s${i-1}`] = {};
            rows.push(
                <div>
                    <input
                        value={this.state[`s${i}`]}
                        onChange={this.handleChange.bind(this,`s${i}`)}

                    />
                    <button onClick={this.onChange.bind(this,`s${i}`)}>
                        {`s${i-1}`}
                    </button>
                </div>
            );
            i++;
        }
        this.setState({
            rows,
            states:obj,
        });
    }

    testDFA(transitions, initial, accepting, s) {
        console.log('transitions', transitions)
        console.log('initial', initial)
        console.log('accepting', accepting)
        console.log('s', s)
        let state = initial;
        for(let i = 0; i < s.length; i++) {
            state = transitions[state][s[i]];
            console.log("state: ", state)
        }
        if(accepting.includes(state)) {
            console.log('ACCEPTED')
            this.setState({result:'ACCEPTED'})
            return 'ACCEPTED'
        }
        console.log('REJECTED')
        this.setState({result:'REJECTED'})
        return 'REJECTED'
        // return state in accepting;
    }

    acceptingState(s){
        this.setState({accStates: s.split(',')})
    }

    render() {
        let {numberOfStates, states, rows, acceptingState, accStates, InitialState, string, result} = this.state;
        console.log('states', states)

        return (
            <div style={{textAlign:'center'}}>
                <h3>Number of State</h3>
                <input type='number' value={numberOfStates} onChange={(e)=>{this.handleChange('numberOfStates',e)}}/>
                <button onClick={this.renderRow.bind(this,[], 1, numberOfStates)}>
                    Set number of States
                </button>
                <h3>Accepting State</h3>
                <input value={acceptingState} onChange={(e)=>{this.handleChange('acceptingState',e)}}/>
                <button onClick={()=>{this.acceptingState(acceptingState)}}>
                    Set accepting States
                </button>
                <h3>Initial State</h3>
                <input value={InitialState} onChange={(e)=>{this.handleChange('InitialState',e)}}/>
                <form ref={(el) => this.myFormRef = el}>
                {rows}
                </form>
                <h3>Enter String</h3>
                <input value={string} onChange={(e)=>{this.handleChange('string',e)}}/>
                <button onClick={()=>{this.testDFA(states, InitialState, accStates, string)}}>
                    Test DFA
                </button>
                <h1>{`String ${result}`}</h1>
            </div>
        );
    }
}

export default App;
