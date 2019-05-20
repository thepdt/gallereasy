import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import DashboardService from './DashboardService'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DateTimePicker from 'react-datetime-picker';
import Notifications from './../../components/Notifications'

import constant from './../../Constant'

function addDays(date, amount) {
    var tzOff = date.getTimezoneOffset() * 60 * 1000,
        t = date.getTime(),
        d = new Date(),
        tzOff2;

    t += (1000 * 60 * 60 * 24) * amount;
    d.setTime(t);

    tzOff2 = d.getTimezoneOffset() * 60 * 1000;
    if (tzOff !== tzOff2) {
        var diff = tzOff2 - tzOff;
        t += diff;
        d.setTime(t);
    }

    return d;
}

class Dashboard extends Component {
    _dashboardService = new DashboardService();

    constructor(props) {
        super(props);

        this.state = {
            fromDatePicked: addDays(new Date(), -1),
            heightChart: 0,
            publishersStatistic: [],
            downloadHTMLErrorStatusStatistic: [],
            downloadHTMLCompletedStatusStatistic: [],
            etlErrorStatusStatistic: [],
            etlCompletedStatusStatistic: [],
            downloadMediaErrorStatusStatistic: [],
            allCompleteStatusStatistic: [],

            orderOptions: [
                { value: 1, text: "Sắp xếp theo tên đầu báo" },
                { value: 2, text: "Sắp xếp theo Download HTML Error" },
                { value: 3, text: "Sắp xếp theo Download HTML Completed" },
                { value: 4, text: "Sắp xếp theo ETL Error" },
                { value: 5, text: "Sắp xếp theo ETL Completed" },
                { value: 6, text: "Sắp xếp theo All Completed" }
            ],
            orderOptionOpen: false,
            orderOption: 4,
            orderOptionValue: "Sắp xếp theo ETL Error"
        };

        this.orderOptionToggle = this.orderOptionToggle.bind(this);
    }

    componentWillMount() {
        this.getCrawlStatusStatistic(this.state.fromDatePicked)
    }

    getCrawlStatusStatistic(fromDatePicked) {
        let fromDate = fromDatePicked.getFullYear() + "-" + (fromDatePicked.getMonth() + 1) + "-" + fromDatePicked.getDate();
        this._dashboardService.getCrawlStatusStatistic(fromDate)
            .then((result) => {
                console.log(result);
                if (result.Message === "Success" && result.Data !== null) {
                    console.log(this.state.orderOption);
                    result.Data.sort(this.compare);
                    console.log(result.Data);
                    const publishers = []
                    const downloadHTMLErrorStatus = []
                    const downloadHTMLCompletedStatus = []
                    const etlErrorStatus = []
                    const etlCompletedStatus = []
                    const allCompleteStatus = []

                    result.Data.forEach(element => {
                        publishers.push(element.Publisher)
                        downloadHTMLErrorStatus.push(element.TotalByStatus[2])
                        downloadHTMLCompletedStatus.push(element.TotalByStatus[4])
                        etlErrorStatus.push(element.TotalByStatus[6])
                        etlCompletedStatus.push(element.TotalByStatus[7])
                        allCompleteStatus.push(element.TotalByStatus[12])
                    });

                    this.setState({
                        heightChart: 900,
                        publishersStatistic: publishers,
                        downloadHTMLErrorStatusStatistic: downloadHTMLErrorStatus,
                        downloadHTMLCompletedStatusStatistic: downloadHTMLCompletedStatus,
                        etlErrorStatusStatistic: etlErrorStatus,
                        etlCompletedStatusStatistic: etlCompletedStatus,
                        allCompleteStatusStatistic: allCompleteStatus
                    })
                } else if (result.Message === "Success" && result.Data === null) {
                    this.addNoti.addNotification("danger", "Không có dữ liệu được tìm thấy");
                    this.setState({
                        heightChart: 0,
                        publishersStatistic: [],
                        downloadHTMLErrorStatusStatistic: [],
                        downloadHTMLCompletedStatusStatistic: [],
                        etlErrorStatusStatistic: [],
                        etlCompletedStatusStatistic: [],
                        allCompleteStatus: []

                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    fromDateChange = date => {
        if (date !== null) {
            this.getCrawlStatusStatistic(date)
            this.setState({
                fromDatePicked: date,
            })
        }
    }

    showCrawlStatusStatisticChart() {
        const statisticChartcoptions = {
            chart: {
                type: 'bar',
                height: this.state.heightChart
            },
            title: {
                text: 'Thống kê bài báo theo trạng thái của quá trình crawl'
            },
            xAxis: {
                categories: this.state.publishersStatistic
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Tổng bài báo theo trạng thái'
                }
            },
            legend: {
                reversed: true,
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 0,
                y: 100,
                floating: true,
                itemStyle: {
                    fontSize: "15px"
                },
                itemMarginBottom: 5
            },
            colors: ['#0900ff', '#00ff59', '#ff0300', '#00c6ff', '#ffbf00'],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'All completed',
                data: this.state.allCompleteStatusStatistic
            }, {
                name: 'ETL completed',
                data: this.state.etlCompletedStatusStatistic
            }, {
                name: 'ETL error',
                data: this.state.etlErrorStatusStatistic
            }, {
                name: 'Download HTML completed',
                data: this.state.downloadHTMLCompletedStatusStatistic
            }, {
                name: 'Download HTML error',
                data: this.state.downloadHTMLErrorStatusStatistic
            }]
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={statisticChartcoptions}
            />
        )
    }

    orderOptionToggle() {
        this.setState({
            orderOptionOpen: !this.state.orderOptionOpen
        });
    }

    changeOrderOptionValue(value, text) {
        this.setState({
            orderOptionOpen: !this.state.searchOptionOpen,
            orderOptionValue: text,
            orderOption: value
        });
    }

    compare(a, b) {
        // const orderOpt = this.state.orderOption
        const orderOpt = 4

        var A, B

        if (orderOpt === 1) {

        } else if (orderOpt === 2) {
            A = a.TotalByStatus[constant.StatusCrawlError]
            B = b.TotalByStatus[constant.StatusCrawlError]
        } else if (orderOpt === 3) {
            A = a.TotalByStatus[constant.StatusCrawlCompleted - 5]
            B = b.TotalByStatus[constant.StatusCrawlCompleted - 5]
        } else if (orderOpt === 4) {
            A = a.TotalByStatus[constant.StatusETLError - 5]
            B = b.TotalByStatus[constant.StatusETLError - 5]
        } else if (orderOpt === 5) {
            A = a.TotalByStatus[constant.StatusETLCompleted - 12]
            B = b.TotalByStatus[constant.StatusETLCompleted - 12]
        } else if (orderOpt === 6) {
            A = a.TotalByStatus[constant.StatusAllCompleted - 18]
            B = b.TotalByStatus[constant.StatusAllCompleted - 18]
        }

        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        return (
            <div className="animated fadeIn">
                <Notifications onAddNoti={e => this.addNoti = e}></Notifications>
                <DateTimePicker className="left-emerged" onChange={this.fromDateChange} value={this.state.fromDatePicked} />
                <ButtonDropdown className="right-emerged" isOpen={this.state.orderOptionOpen} toggle={this.orderOptionToggle}>
                    <DropdownToggle caret>{this.state.orderOptionValue}</DropdownToggle>
                    <DropdownMenu>
                        {this.state.orderOptions.map(option =>
                            <DropdownItem id={option.value} key={option.value} onClick={() => this.changeOrderOptionValue(option.value, option.text)}>{option.text}</DropdownItem>
                        )}
                    </DropdownMenu>
                </ButtonDropdown>
                {this.showCrawlStatusStatisticChart()}
            </div>
        );
    }
}

export default Dashboard;
