import React, { Component } from 'react';
import DashboardService from './DashboardService'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DateTimePicker from 'react-datetime-picker';
import Notifications from './../../components/Notifications'

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
            downloadMediaCompleteStatusStatistic: [],
        };
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
                    result.Data.sort(this.compare);

                    const publishers = []
                    const downloadHTMLErrorStatus = []
                    const downloadHTMLCompletedStatus = []
                    const etlErrorStatus = []
                    const etlCompletedStatus = []
                    const downloadMediaErrorStatus = []
                    const downloadMediaCompleteStatus = []

                    result.Data.forEach(element => {
                        publishers.push(element.Publisher)
                        downloadHTMLErrorStatus.push(element.TotalByStatus[2])
                        downloadHTMLCompletedStatus.push(element.TotalByStatus[4])
                        etlErrorStatus.push(element.TotalByStatus[6])
                        etlCompletedStatus.push(element.TotalByStatus[7])
                        downloadMediaErrorStatus.push(element.TotalByStatus[9])
                        downloadMediaCompleteStatus.push(element.TotalByStatus[11])
                    });

                    this.setState({
                        heightChart: 900,
                        publishersStatistic: publishers,
                        downloadHTMLErrorStatusStatistic: downloadHTMLErrorStatus,
                        downloadHTMLCompletedStatusStatistic: downloadHTMLCompletedStatus,
                        etlErrorStatusStatistic: etlErrorStatus,
                        etlCompletedStatusStatistic: etlCompletedStatus,
                        downloadMediaErrorStatusStatistic: downloadMediaErrorStatus,
                        downloadMediaCompleteStatusStatistic: downloadMediaCompleteStatus
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
                        downloadMediaErrorStatus: [],
                        downloadMediaCompleteStatus: []

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
            colors: [ '#0900ff', '#000000', '#00ff59', '#ff0300', '#00c6ff', '#ffbf00'],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Download media completed',
                data: this.state.downloadMediaCompleteStatusStatistic
            },{
                name: 'Download media error',
                data: this.state.downloadMediaErrorStatusStatistic
            },{
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

    compare(a, b) {
        const A = a.TotalByStatus[5]
        const B = b.TotalByStatus[5]

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
                <DateTimePicker className="right-emerged" onChange={this.fromDateChange} value={this.state.fromDatePicked} />
                {this.showCrawlStatusStatisticChart()}
            </div>
        );
    }
}

export default Dashboard;
