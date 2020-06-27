import React, { Component } from 'react';
import _ from 'lodash';
import randomcolor from 'randomcolor';
import {Line} from 'react-chartjs-2';

class Rows extends Component{

    chartOptions = {
        showScale: true,
        pointDot: true,
        showLines: true,
        responsive: true,
        maintainAspectRatio: true,
    
        title: {
            display: true,
            text: 'Metrics Line Chart'
        },
    
        legend: {
            position: 'right',
            display: true,
            labels: {
                boxWidth: 20,
                fontSize: 10,
                fontColor: '#000',
                padding: 15,
            }
        },
    
        scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                min: 0,
                max: 1500,
                stepSize: 100
            }
            }]
        },
        tooltips: {
            enable: true
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            plotAll: {}, //multi-line chart
            plotLine: {}, //specific line chart
            chartOptions: {}, 
            showGraph: false,
            selected: null
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.filteredItems !== this.props.filteredItems) {
            
            this.setState({ plotAll: this.getData() });        
            this.setState({ chartOptions: this.chartOptions });        
        }
    }
    //Data for multi-line chart
    getData = () => {
        const set = new Set();
        const data_sets = []; 
        for (let index in this.props.filteredItems) {
            const times = this.props.filteredItems[index].times;
            const values = this.props.filteredItems[index].values;

            const key = index;
            times.forEach(item => set.add(item))

            const data_set = {
                label : key,
                borderColor : randomcolor(),
                data : values,
                lineTension: 0,
                fill: false
            }
            data_sets.push(data_set);
        }

        const plotAll = {
            labels : Array.from(set), 
            datasets : data_sets 
        }

        this.setState({ showGraph: true })        
        return plotAll;
    } 
    
    //Data for specific line chart
    plotThisLine = (key, val) => {
        const data_set = {
            label : key,
            borderColor : randomcolor(),
            data : val.values,
            lineTension: 0,
            fill: false
        }
        const data_sets = [];
        data_sets.push(data_set);
        
        const plotLine = {
            labels : val.times,
            datasets : data_sets
        }
        this.setState({ showGraph: false })
        this.setState({ selected: key })
        
        this.setState({plotLine: plotLine})
    } 

    render() {  
        const { showGraph } = this.state
        return (
            
            <React.Fragment>
                <div className="container">
                    <table className="table w-100">
                        <thead>
                            <tr className="d-flex">
                                <th className="col-5">Metrics</th>
                                <th className="col-4">Values</th>
                                <th className="col-3">Round Figures</th>
                            </tr>
                        </thead>
                        {
                            _.map(this.props.filteredItems, (value, key) => (
                                <tbody key={Math.random()}>       
                                    <tr
                                        style={{
                                            fontWeight: this.state.selected === key ? 'bold' : 'normal',
                                            cursor: 'pointer',
                                            fontSize: '11px'
                                        }}
                                        className="d-flex"
                                        onClick={() => this.plotThisLine(key, value)}>
                                        <td className="col-5">{key}</td>
                                        <td className="col-4">{value.values[value.values.length - 1]}</td>
                                        <td className="col-3">{parseFloat(Math.round(value.values[value.values.length - 1])).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            ))     
                        }
                    </table> 
                    {/* Line Graph */}
                    {
                        showGraph ?
                            <Line
                                data={this.state.plotAll}
                                options={this.state.chartOptions}
                            />
                                    :
                            <Line
                                data={this.state.plotLine}
                                options={this.state.chartOptions}
                            />
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default Rows;
