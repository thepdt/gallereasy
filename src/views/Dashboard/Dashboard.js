import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Table, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import DashboardService from './DashboardService'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DateTimePicker from 'react-datetime-picker';
import PaginationComponent from "react-reactstrap-pagination";
import Notifications from './../../components/Notifications'
import Widget04 from './../Widgets/Widget04';

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
            //////////////////////////////////////////////////
            //For statistic user
            onDatePickedUserStatistic: addDays(new Date(), -1),
            activeUserCount: 0,
            inactiveUserCount: 0,

            //////////////////////////////////////////////////
            // For  Statistic  Post
            activeTab: ['1', '2'],

            hotPosts: [],
            topReadNews: [],
            topCommentNews: [],
            topViewVideos: [],
            topCommentVideos: [],

            hotPostModeOptions: [{ value: 20, text: "Top 20 bài" }, { value: 50, text: "Top 50 bài" }],
            topReadNewsMode: 20,
            topCommentNewsMode: 20,
            topViewVideosMode: 20,
            topCommentVideosMode: 20,

            topReadNewsOptionText: "Top 20 bài",
            topCommentNewsOptionText: "Top 20 bài",
            topViewVideosOptionText: "Top 20 bài",
            topCommentVideosOptionText: "Top 20 bài",

            topReadNewsOptionOpen: false,
            topCommentNewsOptionOpen: false,
            topViewVideosOptionOpen: false,
            topCommentVideosOptionOpen: false,

            //////////////////////////////////////////////////
            //For Status Statistic
            statisticByStatusData: [],
            fromDatePickedByStatus: addDays(new Date(), -1),
            heightChartByStatus: 0,
            publishersStatisticByStatus: [],

            downloadHTMLCompletedStatusStatistic: [],
            etlErrorStatusStatistic: [],
            etlCompletedStatusStatistic: [],
            cmsInsertPostErrorStatusStatistic: [],
            cmsInsertPostCompletedStatusStatistic: [],
            downloadMediaErrorStatusStatistic: [],
            downloadMediaCompletedStatusStatistic: [],
            genThumImageErrorStatusStatistic: [],
            genThumImageCompletedStatusStatistic: [],
            updateMediaLinkErrorStatusStatistic: [],
            updateMediaLinkCompletedStatusStatistic: [],
            checkDuplicateErrorStatusStatistic: [],
            inreviewStatusStatistic: [],
            checkNoDuplicatedStatusStatistic: [],
            updateWeightErrorStatusStatistic: [],
            updateWeightCompletedStatusStatistic: [],
            cmsUpdateCouchbaseErrorStatusStatistic: [],
            publishStatusStatistic: [],
            inTrashStatusStatistic: [],

            orderByStatusOptions: [
                { value: 1, text: "Sắp xếp theo tên đầu báo" },
                { value: 2, text: "Sắp xếp theo Download HTML Completed" },
                { value: 3, text: "Sắp xếp theo ETL Error" },
                { value: 4, text: "Sắp xếp theo ETL Completed" },
                { value: 5, text: "Sắp xếp theo CMS Insert Post Error" },
                { value: 6, text: "Sắp xếp theo CMS Insert Post Completed" },
                { value: 7, text: "Sắp xếp theo Download Media Error" },
                { value: 8, text: "Sắp xếp theo Download Media Completed" },
                { value: 9, text: "Sắp xếp theo Gen Thumb Image Error" },
                { value: 10, text: "Sắp xếp theo Gen Thumb Image Completed" },
                { value: 11, text: "Sắp xếp theo Update Media Link Error" },
                { value: 12, text: "Sắp xếp theo Update Media Link Completed" },
                { value: 13, text: "Sắp xếp theo Check Duplicate Error" },
                { value: 14, text: "Sắp xếp theo Inreview" },
                { value: 15, text: "Sắp xếp theo Check No Duplicated" },
                { value: 16, text: "Sắp xếp theo Update Weight Error" },
                { value: 17, text: "Sắp xếp theo Update Weight Completed" },
                { value: 18, text: "Sắp xếp theo CMS Update Couchbase Error" },
                { value: 19, text: "Sắp xếp theo Publish" },
                { value: 20, text: "Sắp xếp theo In Trash" },
            ],
            orderByStatusOptionOpen: false,
            orderByStatusOption: 4,
            orderByStatusOptionValue: "Sắp xếp theo ETL Error",

            //////////////////////////////////////////////////
            //For ErrorCode Statistic
            statisticByErrorCodeData: [],
            fromDatePickedByErrorCode: addDays(new Date(), -1),
            heightChartByErrorCode: 0,
            publishersStatisticByErrorCode: [],
            successErrorCodeStatistic: [],
            downloadHtmlS3ExceptionErrorCodeStatistic: [],
            etlExceptionErrorCodeStatistic: [],
            aiTaggingApiExceptionErrorCodeStatistic: [],
            // crawlDownloadImageApiExceptionErrorCodeStatistic: [],
            // crawlDownloadVideoApiExceptionErrorCodeStatistic: [],
            cmsApiDuplicateArticleIdExceptionErrorCodeStatistic: [],
            cmsApiExceptionErrorCodeStatistic: [],
            crawlDownloadMediaApiExceptionErrorCodeStatistic: [],

            orderByErrorCodeOptions: [
                { value: 1, text: "Sắp xếp theo tên đầu báo" },
                { value: 2, text: "Sắp xếp theo SUCCESS" },
                { value: 3, text: "Sắp xếp theo DOWNLOAD_HTML_S3_EXCEPTION" },
                { value: 4, text: "Sắp xếp theo ETL_EXCEPTION" },
                { value: 5, text: "Sắp xếp theo AI_TAGGING_API_EXCEPTION" },
                // { value: 6, text: "Sắp xếp theo CRAWL_DOWMLOAD_IMAGE_API_EXCEPTION" },
                // { value: 7, text: "Sắp xếp theo CRAWL_DOWMLOAD_VIDEO_API_EXCEPTION" },
                { value: 8, text: "Sắp xếp theo CMS_API_DUPLICATE_ARTICLE_ID_EXCEPTION" },
                { value: 9, text: "Sắp xếp theo CMS_API_EXCEPTION" },
                { value: 10, text: "Sắp xếp theo CRAWL_DOWMLOAD_MEDIA_API_EXCEPTION" },
            ],
            orderByErrorCodeOptionOpen: false,
            orderByErrorCodeOption: 1,
            orderByErrorCodeOptionValue: "Sắp xếp theo tên đầu báo"
        };
        this.orderByStatusOptionToggle = this.orderByStatusOptionToggle.bind(this);
        this.orderByErrorCodeOptionToggle = this.orderByErrorCodeOptionToggle.bind(this);

    }

    componentDidMount() {
        this.getCrawlStatusStatistic(this.state.fromDatePickedByStatus)
        this.getHotPostStatistic()
    }

    getHotPostStatistic() {
        this._dashboardService.getHotPostStatistic()
            .then((result) => {
                if (result.Message === "Success" && result.Data !== null) {
                    this.setState({
                        hotPosts: result.Data[0],
                        activeUserCount: result.Data[0].ActiveUsersCount,
                        inactiveUserCount: result.Data[0].UnActiveUsersCount,
                        topReadNews: result.Data[0].Top20MostReadNews === "null" ? [] : JSON.parse(result.Data[0].Top20MostReadNews).slice(0, 10),
                        topCommentNews: result.Data[0].Top20MostCommentNews === "null" ? [] : JSON.parse(result.Data[0].Top20MostCommentNews).slice(0, 10),
                        topViewVideos: result.Data[0].Top20MostViewVideo === "null" ? [] : JSON.parse(result.Data[0].Top20MostViewVideo).slice(0, 10),
                        topCommentVideos: result.Data[0].Top20MostCommentVideo === "null" ? [] : JSON.parse(result.Data[0].Top20MostCommentVideo).slice(0, 10),
                    })
                } else if (result.Message === "Success" && result.Data === null) {
                    this.addNoti.addNotification("danger", "Không tìm thấy dữ liệu thống kê người dùng và các bài đăng Hot");
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }
    /////////////////////////////////////////////////////////
    //Build Statistic User & Hot Posts

    onDateUserStatisticChange = date => {
        console.log(date);
        if (date !== null) {
            // this.getUserStatistic(date)
            this.setState({
                onDatePickedUserStatistic: date,
            })
        }
    }

    //Top Read News
    selecteTopReadNewsPage(selectedPage) {
        if (this.state.topReadNewsMode === 20) {
            this.setState({
                topReadNews: this.state.hotPosts.Top20MostReadNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostReadNews).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        } else if (this.state.topReadNewsMode === 50) {
            this.setState({
                topReadNews: this.state.hotPosts.Top50MostReadNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostReadNews).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        }
    }

    changeTopReadNewsMode(value, text) {
        if (value === 20) {
            this.setState({
                topReadNews: this.state.hotPosts.Top20MostReadNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostReadNews).slice(0, 10),
                topReadNewsMode: value,
                topReadNewsOptionText: text
            })
        } else if (value === 50) {
            this.setState({
                topReadNews: this.state.hotPosts.Top50MostReadNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostReadNews).slice(0, 10),
                topReadNewsMode: value,
                topReadNewsOptionText: text
            })
        }
    }

    topReadNewsOptionToggle() {
        this.setState({
            topReadNewsOptionOpen: !this.state.topReadNewsOptionOpen
        })
    }

    //Top Comment News
    selecteTopCommentNewsPage(selectedPage) {
        if (this.state.topCommentNewsMode === 20) {
            this.setState({
                topCommentNews: this.state.hotPosts.Top20MostCommentNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostCommentNews).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        } else if (this.state.topCommentNewsMode === 50) {
            this.setState({
                topCommentNews: this.state.hotPosts.Top50MostCommentNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostCommentNews).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        }
    }

    changeTopCommentNewsMode(value, text) {
        if (value === 20) {
            this.setState({
                topCommentNews: this.state.hotPosts.Top20MostCommentNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostCommentNews).slice(0, 10),
                topCommentNewsMode: value,
                topCommentNewsOptionText: text
            })
        } else if (value === 50) {
            this.setState({
                topCommentNews: this.state.hotPosts.Top50MostCommentNews === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostCommentNews).slice(0, 10),
                topCommentNewsMode: value,
                topCommentNewsOptionText: text
            })
        }
    }

    topCommentNewsOptionToggle() {
        this.setState({
            topCommentNewsOptionOpen: !this.state.topCommentNewsOptionOpen
        })
    }

    //Top View Videos
    selecteTopViewVideosPage(selectedPage) {
        if (this.state.topViewVideosMode === 20) {
            this.setState({
                topViewVideos: this.state.hotPosts.Top20MostViewVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostViewVideo).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        } else if (this.state.topViewVideosMode === 50) {
            this.setState({
                topViewVideos: this.state.hotPosts.Top50MostViewVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostViewVideo).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        }
    }

    changeTopViewVideosMode(value, text) {
        if (value === 20) {
            this.setState({
                topViewVideos: this.state.hotPosts.Top20MostViewVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostViewVideo).slice(0, 10),
                topViewVideosMode: value,
                topViewVideosOptionText: text
            })
        } else if (value === 50) {
            this.setState({
                topViewVideos: this.state.hotPosts.Top50MostViewVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostViewVideo).slice(0, 10),
                topViewVideosMode: value,
                topViewVideosOptionText: text
            })
        }
    }

    topViewVideosOptionToggle() {
        this.setState({
            topViewVideosOptionOpen: !this.state.topViewVideosOptionOpen
        })
    }

    //Top Comment Videos
    selecteTopCommentVideosPage(selectedPage) {
        if (this.state.topCommentVideosMode === 20) {
            this.setState({
                topCommentVideos: this.state.hotPosts.Top20MostCommentVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostCommentVideo).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        } else if (this.state.topCommentVideosMode === 50) {
            this.setState({
                topCommentVideos: this.state.hotPosts.Top50MostCommentVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostCommentVideo).slice((selectedPage - 1) * 10, (selectedPage - 1) * 10 + 10)
            });
        }
    }

    changeTopCommentVideosMode(value, text) {
        if (value === 20) {
            this.setState({
                topCommentVideos: this.state.hotPosts.Top20MostCommentVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top20MostCommentVideo).slice(0, 10),
                topCommentVideosMode: value,
                topCommentVideosOptionText: text
            })
        } else if (value === 50) {
            this.setState({
                topCommentVideos: this.state.hotPosts.Top50MostCommentVideo === "null" ? [] : JSON.parse(this.state.hotPosts.Top50MostCommentVideo).slice(0, 10),
                topCommentVideosMode: value,
                topCommentVideosOptionText: text
            })
        }
    }

    topCommentVideosOptionToggle() {
        this.setState({
            topCommentVideosOptionOpen: !this.state.topCommentVideosOptionOpen
        })
    }

    // END Statistic User
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    //Build Statistic by Status Chart

    getCrawlStatusStatistic(fromDatePickedByStatus) {
        let fromDate = fromDatePickedByStatus.getFullYear() + "-" + (fromDatePickedByStatus.getMonth() + 1) + "-" + fromDatePickedByStatus.getDate() + " " + fromDatePickedByStatus.getHours() + ":" + fromDatePickedByStatus.getMinutes() + ":00";
        this._dashboardService.getCrawlStatusStatistic(fromDate)
            .then((result) => {
                if (result.Message === "Success" && result.Data !== null) {
                    this.createStatusStatisticChart(result.Data)
                    this.setState({
                        statisticByStatusData: result.Data
                    })
                } else if (result.Message === "Success" && result.Data === null) {
                    this.addNoti.addNotification("danger", "Không tìm thấy dữ liệu thống kê các trạng thái quá trình Crawl");
                    this.setState({
                        heightChartByStatus: 0,
                        publishersStatisticByStatus: [],

                        downloadHTMLCompletedStatusStatistic: [],
                        etlErrorStatusStatistic: [],
                        etlCompletedStatusStatistic: [],
                        cmsInsertPostErrorStatusStatistic: [],
                        cmsInsertPostCompletedStatusStatistic: [],
                        downloadMediaErrorStatusStatistic: [],
                        downloadMediaCompletedStatusStatistic: [],
                        genThumImageErrorStatusStatistic: [],
                        genThumImageCompletedStatusStatistic: [],
                        updateMediaLinkErrorStatusStatistic: [],
                        updateMediaLinkCompletedStatusStatistic: [],
                        checkDuplicateErrorStatusStatistic: [],
                        inreviewStatusStatistic: [],
                        checkNoDuplicatedStatusStatistic: [],
                        updateWeightErrorStatusStatistic: [],
                        updateWeightCompletedStatusStatistic: [],
                        cmsUpdateCouchbaseErrorStatusStatistic: [],
                        publishStatusStatistic: [],
                        inTrashStatusStatistic: [],
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    createStatusStatisticChart(data) {
        const dataSorted = this.sortStatusStatisticData(data, this.state.orderByStatusOption)
        const publishers = []
        const downloadHTMLCompletedStatus = []
        const etlErrorStatus = []
        const etlCompletedStatus = []
        const cmsInsertPostErrorStatus = []
        const cmsInsertPostCompletedStatus = []
        const downloadMediaErrorStatus = []
        const downloadMediaCompletedStatus = []
        const genThumImageErrorStatus = []
        const genThumImageCompletedStatus = []
        const updateMediaLinkErrorStatus = []
        const updateMediaLinkCompletedStatus = []
        const checkDuplicateErrorStatus = []
        const inreviewStatus = []
        const checkNoDuplicatedStatus = []
        const updateWeightErrorStatus = []
        const updateWeightCompletedStatus = []
        const cmsUpdateCouchbaseErrorStatus = []
        const publishStatus = []
        const inTrashStatus = []
        dataSorted.forEach(element => {
            publishers.push(element.Publisher)
            downloadHTMLCompletedStatus.push(element.TotalByStatus[0])
            etlErrorStatus.push(element.TotalByStatus[1])
            etlCompletedStatus.push(element.TotalByStatus[2])
            cmsInsertPostErrorStatus.push(element.TotalByStatus[3])
            cmsInsertPostCompletedStatus.push(element.TotalByStatus[4])
            downloadMediaErrorStatus.push(element.TotalByStatus[5])
            downloadMediaCompletedStatus.push(element.TotalByStatus[6])
            genThumImageErrorStatus.push(element.TotalByStatus[7])
            genThumImageCompletedStatus.push(element.TotalByStatus[8])
            updateMediaLinkErrorStatus.push(element.TotalByStatus[9])
            updateMediaLinkCompletedStatus.push(element.TotalByStatus[10])
            checkDuplicateErrorStatus.push(element.TotalByStatus[11])
            inreviewStatus.push(element.TotalByStatus[12])
            checkNoDuplicatedStatus.push(element.TotalByStatus[13])
            updateWeightErrorStatus.push(element.TotalByStatus[14])
            updateWeightCompletedStatus.push(element.TotalByStatus[15])
            cmsUpdateCouchbaseErrorStatus.push(element.TotalByStatus[16])
            publishStatus.push(element.TotalByStatus[17])
            inTrashStatus.push(element.TotalByStatus[18])
        });

        this.setState({
            heightChartByStatus: 1200,
            publishersStatisticByStatus: publishers,
            downloadHTMLCompletedStatusStatistic: downloadHTMLCompletedStatus,
            etlErrorStatusStatistic: etlErrorStatus,
            etlCompletedStatusStatistic: etlCompletedStatus,
            cmsInsertPostErrorStatusStatistic: cmsInsertPostErrorStatus,
            cmsInsertPostCompletedStatusStatistic: cmsInsertPostCompletedStatus,
            downloadMediaErrorStatusStatistic: downloadMediaErrorStatus,
            downloadMediaCompletedStatusStatistic: downloadMediaCompletedStatus,
            genThumImageErrorStatusStatistic: genThumImageErrorStatus,
            genThumImageCompletedStatusStatistic: genThumImageCompletedStatus,
            updateMediaLinkErrorStatusStatistic: updateMediaLinkErrorStatus,
            updateMediaLinkCompletedStatusStatistic: updateMediaLinkCompletedStatus,
            checkDuplicateErrorStatusStatistic: checkDuplicateErrorStatus,
            inreviewStatusStatistic: inreviewStatus,
            checkNoDuplicatedStatusStatistic: checkNoDuplicatedStatus,
            updateWeightErrorStatusStatistic: updateWeightErrorStatus,
            updateWeightCompletedStatusStatistic: updateWeightCompletedStatus,
            cmsUpdateCouchbaseErrorStatusStatistic: cmsUpdateCouchbaseErrorStatus,
            publishStatusStatistic: publishStatus,
            inTrashStatusStatistic: inTrashStatus,
        })
    }

    fromDateStatusChange = date => {
        this.setState({
            fromDatePickedByStatus: date,
        }, () => {
            if (date !== null) {
                this.getCrawlStatusStatistic(date)
            }
        })
    }

    showCrawlStatusStatisticChart() {
        const statusStatisticChartcoptions = {
            chart: {
                type: 'bar',
                height: this.state.heightChartByStatus,

            },
            title: {
                text: 'Thống kê bài báo theo trạng thái của quá trình crawl'
            },
            xAxis: {
                categories: this.state.publishersStatisticByStatus
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
            // colors: ['#ff0000', '#ff006a', '#ff00bd', '#e300ff', '#9d00ff', '#4a00ff', '#002cff', '#007eff', '#00b9ff', '#00ffe7', '#00ff95', '#57ff00', '#d8ff00', '#ffdf00', '#ff9900', '#ff5e00', '#616161', '#000000', '#b1b1b1'],
            colors: ['#ff0000', '#ff006a', '#ff00bd', '#ff5e00', '#ff9900', '#ffdf00', '#d8ff00', '#57ff00', '#00ff95', '#00ffe7', '#00b9ff', '#007eff', '#002cff','#4a00ff', '#e300ff', '#9d00ff', '#4a2d2d', '#616161', '#000000'],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'In trash',
                data: this.state.inTrashStatusStatistic
            }, {
                name: 'Published',
                data: this.state.publishStatusStatistic
            }, {
                name: 'Cms update couchbase error',
                data: this.state.cmsUpdateCouchbaseErrorStatusStatistic
            }, {
                name: 'Update weight complete',
                data: this.state.updateWeightCompletedStatusStatistic
            }, {
                name: 'Update weight error',
                data: this.state.updateWeightErrorStatusStatistic
            }, {
                name: 'Check no duplicated',
                data: this.state.checkNoDuplicatedStatusStatistic
            }, {
                name: 'In review',
                data: this.state.inreviewStatusStatistic
            }, {
                name: 'Check duplicate error',
                data: this.state.checkDuplicateErrorStatusStatistic
            }, {
                name: 'Update media link completed',
                data: this.state.updateMediaLinkCompletedStatusStatistic
            }, {
                name: 'Update media link error',
                data: this.state.updateMediaLinkErrorStatusStatistic
            }, {
                name: 'Gen thumb image completed',
                data: this.state.genThumImageCompletedStatusStatistic
            }, {
                name: 'Gen thumb image error',
                data: this.state.genThumImageErrorStatusStatistic
            }, {
                name: 'Download media completed',
                data: this.state.downloadMediaCompletedStatusStatistic
            }, {
                name: 'Download media error',
                data: this.state.downloadMediaErrorStatusStatistic
            }, {
                name: 'Cms insert post completed',
                data: this.state.cmsInsertPostCompletedStatusStatistic
            }, {
                name: 'Cms insert post error',
                data: this.state.cmsInsertPostErrorStatusStatistic
            }, {
                name: 'ETL completed',
                data: this.state.etlCompletedStatusStatistic
            }, {
                name: 'ETL error',
                data: this.state.etlErrorStatusStatistic
            }, {
                name: 'Download HTML completed',
                data: this.state.downloadHTMLCompletedStatusStatistic
            }]
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={statusStatisticChartcoptions}
            />
        )
    }

    orderByStatusOptionToggle() {
        this.setState({
            orderByStatusOptionOpen: !this.state.orderByStatusOptionOpen
        });
    }

    changeOrderByStatusOptionValue(value, text) {
        this.setState({
            orderByStatusOptionOpen: !this.state.orderByStatusOptionOpen,
            orderByStatusOptionValue: text,
            orderByStatusOption: value
        }, () => {
            this.createStatusStatisticChart(this.state.statisticByStatusData)
        });
    }

    sortStatusStatisticData(data, orderOpt) {
        if (orderOpt === 1) {
            return data.sort(this.compareByPublisher)
        } else if (orderOpt === 2) {
            return data.sort(this.compareByStatusCrawlCompleted)
        } else if (orderOpt === 3) {
            return data.sort(this.compareByStatusETLError)
        } else if (orderOpt === 4) {
            return data.sort(this.compareByStatusETLCompleted)
        } else if (orderOpt === 5) {
            return data.sort(this.compareByStatusCmsInsertPostError)
        } else if (orderOpt === 6) {
            return data.sort(this.compareByStatusCmsInsertPostCompleted)
        } else if (orderOpt === 7) {
            return data.sort(this.compareByStatusDownloadMediaError)
        } else if (orderOpt === 8) {
            return data.sort(this.compareByStatusDownloadMediaCompleted)
        } else if (orderOpt === 9) {
            return data.sort(this.compareByStatusGenThumImageError)
        } else if (orderOpt === 10) {
            return data.sort(this.compareByStatusGenThumImageCompleted)
        } else if (orderOpt === 11) {
            return data.sort(this.compareByStatusUpdateMediaLinkError)
        } else if (orderOpt === 12) {
            return data.sort(this.compareByStatusUpdateMediaLinkCompleted)
        } else if (orderOpt === 13) {
            return data.sort(this.compareByStatusCheckDuplicateError)
        } else if (orderOpt === 14) {
            return data.sort(this.compareByStatusInreview)
        } else if (orderOpt === 15) {
            return data.sort(this.compareByStatusCheckNoDuplicated)
        } else if (orderOpt === 16) {
            return data.sort(this.compareByStatusUpdateWeightError)
        } else if (orderOpt === 17) {
            return data.sort(this.compareByStatusUpdateWeightCompleted)
        } else if (orderOpt === 18) {
            return data.sort(this.compareByStatusCmsUpdateCouchbaseError)
        } else if (orderOpt === 19) {
            return data.sort(this.compareByStatusPublish)
        } else if (orderOpt === 20) {
            return data.sort(this.compareByStatusInTrash)
        }
    }

    compareByPublisher(a, b) {
        const A = a.Publisher
        const B = b.Publisher
        if (A < B) {
            return -1;
        } else if (A > B) {
            return 1;
        }
    }

    compareByStatusCrawlCompleted(a, b) {
        const A = a.TotalByStatus[0]
        const B = b.TotalByStatus[0]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusETLError(a, b) {
        const A = a.TotalByStatus[1]
        const B = b.TotalByStatus[1]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusETLCompleted(a, b) {
        const A = a.TotalByStatus[2]
        const B = b.TotalByStatus[2]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCmsInsertPostError(a, b) {
        const A = a.TotalByStatus[3]
        const B = b.TotalByStatus[3]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCmsInsertPostCompleted(a, b) {
        const A = a.TotalByStatus[4]
        const B = b.TotalByStatus[4]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusDownloadMediaError(a, b) {
        const A = a.TotalByStatus[4]
        const B = b.TotalByStatus[4]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusDownloadMediaCompleted(a, b) {
        const A = a.TotalByStatus[6]
        const B = b.TotalByStatus[6]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusGenThumImageError(a, b) {
        const A = a.TotalByStatus[7]
        const B = b.TotalByStatus[7]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusGenThumImageCompleted(a, b) {
        const A = a.TotalByStatus[8]
        const B = b.TotalByStatus[8]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateMediaLinkError(a, b) {
        const A = a.TotalByStatus[9]
        const B = b.TotalByStatus[9]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateMediaLinkCompleted(a, b) {
        const A = a.TotalByStatus[10]
        const B = b.TotalByStatus[10]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCheckDuplicateError(a, b) {
        const A = a.TotalByStatus[11]
        const B = b.TotalByStatus[11]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }


    compareByStatusInreview(a, b) {
        const A = a.TotalByStatus[12]
        const B = b.TotalByStatus[12]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCheckNoDuplicated(a, b) {
        const A = a.TotalByStatus[13]
        const B = b.TotalByStatus[13]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateWeightError(a, b) {
        const A = a.TotalByStatus[14]
        const B = b.TotalByStatus[14]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateWeightCompleted(a, b) {
        const A = a.TotalByStatus[15]
        const B = b.TotalByStatus[15]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCmsUpdateCouchbaseError(a, b) {
        const A = a.TotalByStatus[16]
        const B = b.TotalByStatus[16]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusPublish(a, b) {
        const A = a.TotalByStatus[17]
        const B = b.TotalByStatus[17]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusInTrash(a, b) {
        const A = a.TotalByStatus[18]
        const B = b.TotalByStatus[18]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }
    // END Build Status Statistic Chart 
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    // Build ErrorCode Statistic Chart 
    getPostErrorCodeStatistic(fromDatePickedByErrorCode) {
        let fromDate = fromDatePickedByErrorCode.getFullYear() + "-" + (fromDatePickedByErrorCode.getMonth() + 1) + "-" + fromDatePickedByErrorCode.getDate() + " " + fromDatePickedByErrorCode.getHours() + ":" + fromDatePickedByErrorCode.getMinutes() + ":00";
        this._dashboardService.getPostErrorCodeStatistic(fromDate)
            .then((result) => {
                if (result.Message === "Success" && result.Data !== null) {
                    this.createErrorCodeStatisticChart(result.Data)
                    this.setState({
                        statisticByErrorCodeData: result.Data
                    })
                } else if (result.Message === "Success" && result.Data === null) {
                    this.addNoti.addNotification("danger", "Không tìm thấy dữ liệu thống kê các Error Code");
                    this.setState({
                        heightChartByErrorCode: 0,
                        publishersStatisticByErrorCode: [],
                        successErrorCodeStatistic: [],
                        downloadHtmlS3ExceptionErrorCodeStatistic: [],
                        etlExceptionErrorCodeStatistic: [],
                        aiTaggingApiExceptionErrorCodeStatistic: [],
                        // crawlDownloadImageApiExceptionErrorCodeStatistic: [],
                        // crawlDownloadVideoApiExceptionErrorCodeStatistic: [],
                        cmsApiDuplicateArticleIdExceptionErrorCodeStatistic: [],
                        cmsApiExceptionErrorCodeStatistic: [],
                        crawlDownloadMediaApiExceptionErrorCodeStatistic: [],
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    createErrorCodeStatisticChart(data) {
        const dataSorted = this.sortErrorCodeStatisticData(data, this.state.orderByErrorCodeOption)
        const publishers = []
        const successErrorCode = []
        const downloadHtmlS3ExceptionErrorCode = []
        const etlExceptionErrorCode = []
        const aiTaggingApiExceptionErrorCode = []
        // const crawlDownloadImageApiExceptionErrorCode = []
        // const crawlDownloadVideoApiExceptionErrorCode = []
        const cmsApiDuplicateArticleIdExceptionErrorCode = []
        const cmsApiExceptionErrorCode = []
        const crawlDownloadMediaApiExceptionErrorCode = []

        dataSorted.forEach(element => {
            publishers.push(element.Publisher)
            successErrorCode.push(element.TotalByErrorCode[0])
            downloadHtmlS3ExceptionErrorCode.push(element.TotalByErrorCode[1])
            etlExceptionErrorCode.push(element.TotalByErrorCode[2])
            aiTaggingApiExceptionErrorCode.push(element.TotalByErrorCode[3])
            // crawlDownloadImageApiExceptionErrorCode.push(element.TotalByErrorCode[4])
            // crawlDownloadVideoApiExceptionErrorCode.push(element.TotalByErrorCode[5])
            cmsApiDuplicateArticleIdExceptionErrorCode.push(element.TotalByErrorCode[6])
            cmsApiExceptionErrorCode.push(element.TotalByErrorCode[7])
            crawlDownloadMediaApiExceptionErrorCode.push(element.TotalByErrorCode[8])
        });

        this.setState({
            heightChartByErrorCode: 1200,
            publishersStatisticByErrorCode: publishers,
            successErrorCodeStatistic: successErrorCode,
            downloadHtmlS3ExceptionErrorCodeStatistic: downloadHtmlS3ExceptionErrorCode,
            etlExceptionErrorCodeStatistic: etlExceptionErrorCode,
            aiTaggingApiExceptionErrorCodeStatistic: aiTaggingApiExceptionErrorCode,
            // crawlDownloadImageApiExceptionErrorCodeStatistic: crawlDownloadImageApiExceptionErrorCode,
            // crawlDownloadVideoApiExceptionErrorCodeStatistic: crawlDownloadVideoApiExceptionErrorCode,
            cmsApiDuplicateArticleIdExceptionErrorCodeStatistic: cmsApiDuplicateArticleIdExceptionErrorCode,
            cmsApiExceptionErrorCodeStatistic: cmsApiExceptionErrorCode,
            crawlDownloadMediaApiExceptionErrorCodeStatistic: crawlDownloadMediaApiExceptionErrorCode,
        })
    }

    fromDateErrorCodeChange = date => {
        this.setState({
            fromDatePickedByErrorCode: date,
        }, () => {
            if (date !== null) {
                this.getPostErrorCodeStatistic(date)
            }
        })
    }

    showErrorCodeStatisticChart() {
        const errorCodeStatisticChartcoptions = {
            chart: {
                type: 'bar',
                height: this.state.heightChartByErrorCode,
            },
            title: {
                text: 'Thống kê bài báo theo Error Code của quá trình crawl'
            },
            xAxis: {
                categories: this.state.publishersStatisticByErrorCode
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Tổng bài báo theo Error code'
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
            colors: ['#4dbd74', '#00c6ff', '#6610f2', '#2f353', '#73818f', '#0900ff', '#00ff59', '#ffc107'],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [
                {
                    name: 'CRAWL_DOWMLOAD_MEDIA_API_EXCEPTION',
                    data: this.state.crawlDownloadMediaApiExceptionErrorCodeStatistic
                },
                {
                    name: 'CMS_API_EXCEPTION',
                    data: this.state.cmsApiExceptionErrorCodeStatistic
                },
                {
                    name: 'CMS_API_DUPLICATE_ARTICLE_ID_EXCEPTION',
                    data: this.state.cmsApiDuplicateArticleIdExceptionErrorCodeStatistic
                },
                // {
                //     name: 'CRAWL_DOWMLOAD_VIDEO_API_EXCEPTION',
                //     data: this.state.crawlDownloadVideoApiExceptionErrorCodeStatistic
                // },
                // {
                //     name: 'CRAWL_DOWMLOAD_IMAGE_API_EXCEPTION',
                //     data: this.state.crawlDownloadImageApiExceptionErrorCodeStatistic
                // },
                {
                    name: 'AI_TAGGING_API_EXCEPTION',
                    data: this.state.aiTaggingApiExceptionErrorCodeStatistic
                },
                {
                    name: 'ETL_EXCEPTION',
                    data: this.state.etlExceptionErrorCodeStatistic
                },
                {
                    name: 'DOWNLOAD_HTML_S3_EXCEPTION',
                    data: this.state.downloadHtmlS3ExceptionErrorCodeStatistic
                },
                {
                    name: 'SUCCESS',
                    data: this.state.successErrorCodeStatistic
                }
            ]
        }
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={errorCodeStatisticChartcoptions}
            />
        )
    }

    orderByErrorCodeOptionToggle() {
        this.setState({
            orderByErrorCodeOptionOpen: !this.state.orderByErrorCodeOptionOpen
        });
    }

    changeOrderByErrorCodeOptionValue(value, text) {
        this.setState({
            orderByErrorCodeOptionOpen: !this.state.orderByErrorCodeOptionOpen,
            orderByErrorCodeOptionValue: text,
            orderByErrorCodeOption: value
        }, () => {
            this.createErrorCodeStatisticChart(this.state.statisticByErrorCodeData)
        });
    }

    sortErrorCodeStatisticData(data, orderOpt) {
        if (orderOpt === 1) {
            return data.sort(this.compareByPublisher)
        } else if (orderOpt === 2) {
            return data.sort(this.compareByErrorCodeSuccess)
        } else if (orderOpt === 3) {
            return data.sort(this.compareByErrorCodeDownloadHtmlS3Exception)
        } else if (orderOpt === 4) {
            return data.sort(this.compareByErrorCodeEtlException)
        } else if (orderOpt === 5) {
            return data.sort(this.compareByErrorCodeAiTaggingApiException)
            // } else if (orderOpt === 6) {
            //     return data.sort(this.compareByErrorCodeCrawlDownloadImageApiException)
            // } else if (orderOpt === 7) {
            //     return data.sort(this.compareByErrorCodeCrawlDownloadVideoApiException)
        } else if (orderOpt === 8) {
            return data.sort(this.compareByErrorCodeCmsApiDuplicateArticleIdException)
        } else if (orderOpt === 9) {
            return data.sort(this.compareByErrorCodeCmsApiException)
        } else if (orderOpt === 10) {
            return data.sort(this.compareByErrorCodeCrawlDownloadMediaApiException)
        }
    }

    compareByErrorCodeSuccess(a, b) {
        const A = a.TotalByErrorCode[constant.SUCCESS - 810]
        const B = b.TotalByErrorCode[constant.SUCCESS - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeDownloadHtmlS3Exception(a, b) {
        const A = a.TotalByErrorCode[constant.DOWNLOAD_HTML_S3_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.DOWNLOAD_HTML_S3_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeEtlException(a, b) {
        const A = a.TotalByErrorCode[constant.ETL_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.ETL_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeAiTaggingApiException(a, b) {
        const A = a.TotalByErrorCode[constant.AI_TAGGING_API_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.AI_TAGGING_API_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlDownloadImageApiException(a, b) {
        const A = a.TotalByErrorCode[constant.CRAWL_DOWMLOAD_IMAGE_API_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.CRAWL_DOWMLOAD_IMAGE_API_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlDownloadVideoApiException(a, b) {
        const A = a.TotalByErrorCode[constant.CRAWL_DOWMLOAD_VIDEO_API_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.CRAWL_DOWMLOAD_VIDEO_API_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCmsApiDuplicateArticleIdException(a, b) {
        const A = a.TotalByErrorCode[constant.CMS_API_DUPLICATE_ARTICLE_ID_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.CMS_API_DUPLICATE_ARTICLE_ID_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCmsApiException(a, b) {
        const A = a.TotalByErrorCode[constant.CMS_API_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.CMS_API_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlDownloadMediaApiException(a, b) {
        const A = a.TotalByErrorCode[constant.CRAWL_DOWMLOAD_MEDIA_API_EXCEPTION - 810]
        const B = b.TotalByErrorCode[constant.CRAWL_DOWMLOAD_MEDIA_API_EXCEPTION - 810]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }
    // END Build ErrorCode Statistic Chart 
    /////////////////////////////////////////////////////////

    showPostPreview(postId) {
        console.log(postId);
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    selectedTab(tabPane, tab) {

        const _temp = this.state.activeTab.slice()
        _temp[tabPane] = tab
        this.setState({
            activeTab: _temp,
        }, () => {
            if (tab === '1') {
                this.getCrawlStatusStatistic(this.state.fromDatePickedByStatus)
            } else if (tab === '2') {
                this.getPostErrorCodeStatistic(this.state.fromDatePickedByErrorCode)
            }
        });
    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    {
                        <div>
                            <DateTimePicker className="left-emerged" onChange={this.fromDateStatusChange} value={this.state.fromDatePickedByStatus} />
                            <ButtonDropdown className="right-emerged" isOpen={this.state.orderByStatusOptionOpen} toggle={this.orderByStatusOptionToggle}>
                                <DropdownToggle caret>{this.state.orderByStatusOptionValue}</DropdownToggle>
                                <DropdownMenu>
                                    {this.state.orderByStatusOptions.map(option =>
                                        <DropdownItem id={option.value} key={option.value} onClick={() => this.changeOrderByStatusOptionValue(option.value, option.text)}>{option.text}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </ButtonDropdown>
                            {this.showCrawlStatusStatisticChart()}
                        </div>
                    }
                </TabPane>
                <TabPane tabId="2">
                    {
                        <div>
                            <DateTimePicker className="left-emerged" onChange={this.fromDateErrorCodeChange} value={this.state.fromDatePickedByErrorCode} />
                            <ButtonDropdown className="right-emerged" isOpen={this.state.orderByErrorCodeOptionOpen} toggle={this.orderByErrorCodeOptionToggle}>
                                <DropdownToggle caret>{this.state.orderByErrorCodeOptionValue}</DropdownToggle>
                                <DropdownMenu>
                                    {this.state.orderByErrorCodeOptions.map(option =>
                                        <DropdownItem id={option.value} key={option.value} onClick={() => this.changeOrderByErrorCodeOptionValue(option.value, option.text)}>{option.text}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </ButtonDropdown>
                            {this.showErrorCodeStatisticChart()}
                        </div>
                    }
                </TabPane>

            </>
        );
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Notifications onAddNoti={e => this.addNoti = e}></Notifications>
                <Card>
                    <CardHeader style={{ backgroundColor: '#d7efff' }}>
                        <i className="fa fa-user-o"></i> Thống kê nguời dùng
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={{ size: 4, offset: 2 }}>
                                <DateTimePicker className="" onChange={this.onDateUserStatisticChange} value={this.state.onDatePickedUserStatistic} />
                            </Col>
                        </Row>
                        <FormGroup row>
                            <Col md={{ size: 4, offset: 2 }}>
                                <Widget04 icon="icon-people" color="primary" header={this.state.activeUserCount.toString()} value="100" invert>ACTIVE USERS</Widget04>
                            </Col>
                            <Col md={{ size: 4 }}>
                                <Widget04 icon="icon-user-follow" color="info" header={this.state.inactiveUserCount.toString()} value="100" invert>INACTIVE USERS</Widget04>
                            </Col>
                        </FormGroup>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader style={{ backgroundColor: '#d7efff' }}>
                        <i className="fa fa-newspaper-o"></i> Thống kê quá trình Crawl
                    </CardHeader>
                    <CardBody>
                        <Nav tabs>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === '1'} onClick={() => { this.selectedTab(0, '1'); }}>
                                    <i className="fa fa-tasks"></i> &nbsp;Thống kê theo Status
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === '2'} onClick={() => { this.selectedTab(0, '2'); }}>
                                    <i className="icon-book-open"></i>&nbsp;Thống kê theo Error Code
                        </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                    </CardBody>
                </Card>
                <Row>
                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }}>
                                <i className="fa fa-newspaper-o"></i> Thống kê bài đăng nhiều lượt đọc nhất
                        </CardHeader>
                            <CardBody>
                                <ButtonDropdown className="left-emerged" isOpen={this.state.topReadNewsOptionOpen} toggle={this.topReadNewsOptionToggle.bind(this)}>
                                    <DropdownToggle caret>{this.state.topReadNewsOptionText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.hotPostModeOptions.map(option =>
                                            <DropdownItem id={option} key={option.value} onClick={() => this.changeTopReadNewsMode(option.value, option.text)}>{option.text}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Row className="right">
                                    <PaginationComponent totalItems={this.state.topReadNewsMode} pageSize={10} onSelect={this.selecteTopReadNewsPage.bind(this)} />
                                </Row>
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" width="5%" className="centered">Stt</th>
                                            <th scope="col" width="95%" className="centered">Tiêu đề</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.topReadNews.map((post, index) =>
                                            (< tr key={post.Id.toString()} >
                                                <td className="centered">
                                                    {index}
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostPreview(post.Id)}>{post.Title}</span>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }}>
                                <i className="fa fa-newspaper-o"></i> Thống kê bài đăng nhiều lượt comment nhất
                        </CardHeader>
                            <CardBody>
                                <ButtonDropdown className="left-emerged" isOpen={this.state.topCommentNewsOptionOpen} toggle={this.topCommentNewsOptionToggle.bind(this)}>
                                    <DropdownToggle caret>{this.state.topCommentNewsOptionText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.hotPostModeOptions.map(option =>
                                            <DropdownItem id={option} key={option.value} onClick={() => this.changeTopCommentNewsMode(option.value, option.text)}>{option.text}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Row className="right">
                                    <PaginationComponent totalItems={this.state.topCommentNewsMode} pageSize={10} onSelect={this.selecteTopCommentNewsPage.bind(this)} />
                                </Row>
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" width="5%" className="centered">Stt</th>
                                            <th scope="col" width="95%" className="centered">Tiêu đề</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.topCommentNews.map((post, index) =>
                                            (< tr key={post.Id.toString()} >
                                                <td className="centered">
                                                    {index}
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostPreview(post.Id)}>{post.Title}</span>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }}>
                                <i className="fa fa-file-video-o"></i> Thống kê video nhiều lượt xem nhất
                        </CardHeader>
                            <CardBody>
                                <ButtonDropdown className="left-emerged" isOpen={this.state.topViewVideosOptionOpen} toggle={this.topViewVideosOptionToggle.bind(this)}>
                                    <DropdownToggle caret>{this.state.topViewVideosOptionText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.hotPostModeOptions.map(option =>
                                            <DropdownItem id={option} key={option.value} onClick={() => this.changeTopViewVideosMode(option.value, option.text)}>{option.text}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Row className="right">
                                    <PaginationComponent totalItems={this.state.topViewVideosMode} pageSize={10} onSelect={this.selecteTopViewVideosPage.bind(this)} />
                                </Row>
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" width="5%" className="centered">Stt</th>
                                            <th scope="col" width="95%" className="centered">Tiêu đề</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.topViewVideos.map((post, index) =>
                                            (< tr key={post.Id.toString()} >
                                                <td className="centered">
                                                    {index}
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostPreview(post.Id)}>{post.Title}</span>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }}>
                                <i className="fa fa-file-video-o"></i> Thống kê video nhiều lượt comment nhất
                        </CardHeader>
                            <CardBody>
                                <ButtonDropdown className="left-emerged" isOpen={this.state.topCommentVideosOptionOpen} toggle={this.topCommentVideosOptionToggle.bind(this)}>
                                    <DropdownToggle caret>{this.state.topCommentVideosOptionText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.hotPostModeOptions.map(option =>
                                            <DropdownItem id={option} key={option.value} onClick={() => this.changeTopCommentVideosMode(option.value, option.text)}>{option.text}</DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Row className="right">
                                    <PaginationComponent totalItems={this.state.topCommentVideosMode} pageSize={10} onSelect={this.selecteTopCommentVideosPage.bind(this)} />
                                </Row>
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" width="5%" className="centered">Stt</th>
                                            <th scope="col" width="95%" className="centered">Tiêu đề</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.topCommentVideos.map((post, index) =>
                                            (< tr key={post.Id.toString()} >
                                                <td className="centered">
                                                    {index}
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostPreview(post.Id)}>{post.Title}</span>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
