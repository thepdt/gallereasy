import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Table, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import DashboardService from './DashboardService'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DateTimePicker from 'react-datetime-picker';
import PaginationComponent from "react-reactstrap-pagination";
import Notifications from './../../components/Notifications'
import Widget04 from './../Widgets/Widget04';


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
<<<<<<< HEAD

            //for percentage            



=======
>>>>>>> phuonganh
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
            cmsInsertPostCompletedStatusStatisticBlacklist: [],
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
                { value: 6, text: "Sắp xếp theo CMS Insert Post Completed Blacklist" },
                { value: 7, text: "Sắp xếp theo CMS Insert Post Completed" },
                { value: 8, text: "Sắp xếp theo Download Media Error" },
                { value: 9, text: "Sắp xếp theo Download Media Completed" },
                { value: 10, text: "Sắp xếp theo Gen Thumb Image Error" },
                { value: 11, text: "Sắp xếp theo Gen Thumb Image Completed" },
                { value: 12, text: "Sắp xếp theo Update Media Link Error" },
                { value: 13, text: "Sắp xếp theo Update Media Link Completed" },
                { value: 14, text: "Sắp xếp theo Check Duplicate Error" },
                { value: 15, text: "Sắp xếp theo Inreview" },
                { value: 16, text: "Sắp xếp theo Check No Duplicated" },
                { value: 17, text: "Sắp xếp theo Update Weight Error" },
                { value: 18, text: "Sắp xếp theo Update Weight Completed" },
                { value: 19, text: "Sắp xếp theo CMS Update Couchbase Error" },
                { value: 20, text: "Sắp xếp theo Publish" },
                { value: 21, text: "Sắp xếp theo In Trash" },
            ],
            orderByStatusOptionOpen: false,
            orderByStatusOption: 4,
            orderByStatusOptionValue: "Sắp xếp theo ETL Error",

            //// percentStatus
            percentageStatusStatistic: [],
            titlesStatus: ['Download HTML completed', 'ETL Error', 'ETL Copmleted', 'Cms insert post error', 'Cms insert post completed blacklist', 'Cms insert post completed', 'Download media error', 'Download media error Completed', 'Gen thumb image error', 'Gen thumb image completed', "Update link media error", "Update link media completed", "Check duplicate error", 'Duplicated Inreview', 'No duplicated ', 'Update weight error', 'Update weight completed', 'Cms update couchbase error', 'Published', 'In trash'],
            totalStatusStatistic:0,
            downloadHTMLCompleteStatusPercent: 0,
            etlErroStatusPercent: 0,
            etlCompleteStatusPercent: 0,
            cmsInsertPostErroStatusPercent: 0,
            cmsInsertPostCompletedStatusStStatusPercent: 0,
            cmsInsertPostCompleteStatusPercent: 0,
            downloadMediaErroStatusPercent: 0,
            downloadMediaCompleteStatusPercent: 0,
            genThumImageErroStatusPercent: 0,
            genThumImageCompleteStatusPercent: 0,
            updateMediaLinkErroStatusPercent: 0,
            updateMediaLinkCompleteStatusPercent: 0,
            checkDuplicateErroStatusPercent: 0,
            inrevieStatusPercent: 0,
            checkNoDuplicateStatusPercent: 0,
            updateWeightErroStatusPercent: 0,
            updateWeightCompleteStatusPercent: 0,
            cmsUpdateCouchbaseErroStatusPercent: 0,
            publisStatusPercent: 0,
            inTrasStatusPercent: 0,

            //percentErrorCode
            percentageErrorCode: [],
            titlesErrorCode: ['Crawler Download Failed', 'Crawler Url Not Found', 'Crawler Cannot Create File', 'Crawler Cannnot Copy File', ' Crawler Too Long Video', 'Crawler Ignor Download Media', 'Crawler Unkown', 'Crawler Upload Aws', 'ETL Parsing Crawler Message Expection', 'ETL Download HTML S3 Exception', 'ETL Exception', 'ETL AI Tagging API Exception', 'ETL Rabbi TMQ Post Data Exception', 'Thumb Download Images From S3 Exception', 'Thumb Upload To S3 Exception', 'Thumb Exception', 'Thumb Video Get Thumb Exception', 'Thumb lack Media Exception', 'Dupliacte Failure', 'Duplicate Invalid Data', 'Weight Update Faited ', 'Weight Invalid Status', 'CMS Insert Failed', 'CMS Unkown Category'],
            totalErrorCodeStatistic:0,
            crawlerDownloadFailedErrorCodepercent:0,
            crawlerUrlNotFoundErrorCodepercent:0,
            crawlerCannotCreateFileErrorCodepercent:0,
            crawlerCannotCopyFileErrorCodepercent: 0,
            crawlerTooLongVideoErrorCodepercent: 0,
            crawlerIgnoreDownloadMediaErrorCodepercent: 0,
            crawlerUnknownErrorCodepercent: 0,
            crawlerUploadAwsErrorCodepercent: 0,
            etlParsingCrawlMessageExceptionErrorpercent: 0,
            etlDownloadHtmlS3ExceptionErrorCodepercent: 0,
            etlExceptionErrorCodepercent: 0,
            etlAiTaggingApiExceptionErrorCodepercent: 0,
            etlRabbitmqPostDataExceptionErrorCodeStaticpercent: 0,
            thumbDownloadImagesFromS3ExceptionErrorCoodepercent: 0,
            thumbUploadToS3ExceptionErrorCode: 0,
            thumbExceptionErrorCodepercent: 0,
            thumbVideoGetThumbExceptionErrorCodepercent: 0,
            thumbLackMediaExceptionErrorCodepercent: 0,
            duplicateFailureErrorCodepercent: 0,
            duplicateInvalidDataErrorCodepercent: 0,
            weightUpdateFailedErrorCodepercent: 0,
            weightInvalidStatusErrorCodepercent: 0,
            cmsInsertFailedErrorCodepercent: 0,
            cmsUnknownCategoryErrorCodepercent: 0,
            //////////////////////////////////////////////////
            //For ErrorCode Statistic
            statisticByErrorCodeData: [],
            fromDatePickedByErrorCode: addDays(new Date(), -1),
            heightChartByErrorCode: 0,
            publishersStatisticByErrorCode: [],
            crawlerDownloadFailedErrorCodeStatistic: [],
            crawlerUrlNotFoundErrorCodeStatistic: [],
            crawlerCannotCreateFileErrorCodeStatistic: [],
            crawlerCannotCopyFileErrorCodeStatistic: [],
            crawlerTooLongVideoErrorCodeStatistic: [],
            crawlerIgnoreDownloadMediaErrorCodeStatistic: [],
            crawlerUnknownErrorCodeStatistic: [],
            crawlerUploadAwsErrorCodeStatistic: [],
            etlParsingCrawlMessageExceptionErrorCodeStatistic: [],
            etlDownloadHtmlS3ExceptionErrorCodeStatistic: [],
            etlExceptionErrorCodeStatistic: [],
            etlAiTaggingApiExceptionErrorCodeStatistic: [],
            etlRabbitmqPostDataExceptionErrorCodeStatistic: [],
            thumbDownloadImagesFromS3ExceptionErrorCodeStatistic: [],
            thumbUploadToS3ExceptionErrorCodeStatistic: [],
            thumbExceptionErrorCodeStatistic: [],
            thumbVideoGetThumbExceptionErrorCodeStatistic: [],
            thumbLackMediaExceptionErrorCodeStatistic: [],
            duplicateFailureErrorCodeStatistic: [],
            duplicateInvalidDataErrorCodeStatistic: [],
            weightUpdateFailedErrorCodeStatistic: [],
            weightInvalidStatusErrorCodeStatistic: [],
            cmsInsertFailedErrorCodeStatistic: [],
            cmsUnknownCategoryErrorCodeStatistic: [],

            orderByErrorCodeOptions: [
                { value: 1, text: "Sắp xếp theo tên đầu báo" },
                { value: 2, text: "Sắp xếp theo Crawler download failed" },
                { value: 3, text: "Sắp xếp theo Crawler url not found" },
                { value: 4, text: "Sắp xếp theo Crawler cannot create file" },
                { value: 5, text: "Sắp xếp theo Crawler cannot copy file" },
                { value: 6, text: "Sắp xếp theo Crawler too long video" },
                { value: 7, text: "Sắp xếp theo Crawler ignore download media" },
                { value: 8, text: "Sắp xếp theo Crawler unknow error" },
                { value: 9, text: "Sắp xếp theo Crawler upload AWS error" },
                { value: 10, text: "Sắp xếp theo Etl parsing crawl message exception" },
                { value: 11, text: "Sắp xếp theo Etl download HTML S3 exception" },
                { value: 12, text: "Sắp xếp theo Etl exception" },
                { value: 13, text: "Sắp xếp theo Etl AI tagging API exception" },
                { value: 14, text: "Sắp xếp theo Etl rabbitMQ post data exception" },
                { value: 15, text: "Sắp xếp theo Thumb download images from S3 exception" },
                { value: 16, text: "Sắp xếp theo Thumb uploadTo S3 exception" },
                { value: 17, text: "Sắp xếp theo Thumb exception" },
                { value: 18, text: "Sắp xếp theo Thumb video get thumb exception" },
                { value: 19, text: "Sắp xếp theo Thumb lack media exception" },
                { value: 20, text: "Sắp xếp theo Duplicate failure" },
                { value: 21, text: "Sắp xếp theo Duplicate invalid data" },
                { value: 22, text: "Sắp xếp theo Weight update failed" },
                { value: 23, text: "Sắp xếp theo Weight invalid" },
                { value: 24, text: "Sắp xếp theo Cms insert failed" },
                { value: 25, text: "Sắp xếp theo Cms unknown category" },
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
                    this.totalCrawlStatusStatistic(result.Data)
                    // this.totalCrawlStatusStatistic1(result.Data)
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
                        cmsInsertPostCompletedStatusStatisticBlacklist: [],
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
        const cmsInsertPostCompletedBlacklistStatus = []
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
            cmsInsertPostCompletedBlacklistStatus.push(element.TotalByStatus[4])
            cmsInsertPostCompletedStatus.push(element.TotalByStatus[5])
            downloadMediaErrorStatus.push(element.TotalByStatus[6])
            downloadMediaCompletedStatus.push(element.TotalByStatus[7])
            genThumImageErrorStatus.push(element.TotalByStatus[8])
            genThumImageCompletedStatus.push(element.TotalByStatus[9])
            updateMediaLinkErrorStatus.push(element.TotalByStatus[10])
            updateMediaLinkCompletedStatus.push(element.TotalByStatus[11])
            checkDuplicateErrorStatus.push(element.TotalByStatus[12])
            inreviewStatus.push(element.TotalByStatus[13])
            checkNoDuplicatedStatus.push(element.TotalByStatus[14])
            updateWeightErrorStatus.push(element.TotalByStatus[15])
            updateWeightCompletedStatus.push(element.TotalByStatus[16])
            cmsUpdateCouchbaseErrorStatus.push(element.TotalByStatus[17])
            publishStatus.push(element.TotalByStatus[18])
            inTrashStatus.push(element.TotalByStatus[19])
        });

        this.setState({
            heightChartByStatus: 1200,
            publishersStatisticByStatus: publishers,
            downloadHTMLCompletedStatusStatistic: downloadHTMLCompletedStatus,
            etlErrorStatusStatistic: etlErrorStatus,
            etlCompletedStatusStatistic: etlCompletedStatus,
            cmsInsertPostErrorStatusStatistic: cmsInsertPostErrorStatus,
            cmsInsertPostCompletedStatusStatisticBlacklist: cmsInsertPostCompletedBlacklistStatus,
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
            colors: ['#ff0000', '#8c0000', '#ff006a', '#ff00bd', '#ff5e00', '#ff9900', '#ffdf00', '#d8ff00', '#57ff00', '#00ff95', '#00ffe7', '#00b9ff', '#007eff', '#002cff', '#4a00ff', '#e300ff', '#9d00ff', '#4a2d2d', '#616161', '#000000'],
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
                name: 'Cms insert post completed blacklist',
                data: this.state.cmsInsertPostCompletedStatusStatisticBlacklist
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
            return data.sort(this.compareByStatusCmsInsertPostCompletedBlacklist)
        } else if (orderOpt === 7) {
            return data.sort(this.compareByStatusCmsInsertPostCompleted)
        } else if (orderOpt === 8) {
            return data.sort(this.compareByStatusDownloadMediaError)
        } else if (orderOpt === 9) {
            return data.sort(this.compareByStatusDownloadMediaCompleted)
        } else if (orderOpt === 10) {
            return data.sort(this.compareByStatusGenThumImageError)
        } else if (orderOpt === 11) {
            return data.sort(this.compareByStatusGenThumImageCompleted)
        } else if (orderOpt === 12) {
            return data.sort(this.compareByStatusUpdateMediaLinkError)
        } else if (orderOpt === 13) {
            return data.sort(this.compareByStatusUpdateMediaLinkCompleted)
        } else if (orderOpt === 14) {
            return data.sort(this.compareByStatusCheckDuplicateError)
        } else if (orderOpt === 15) {
            return data.sort(this.compareByStatusInreview)
        } else if (orderOpt === 16) {
            return data.sort(this.compareByStatusCheckNoDuplicated)
        } else if (orderOpt === 17) {
            return data.sort(this.compareByStatusUpdateWeightError)
        } else if (orderOpt === 18) {
            return data.sort(this.compareByStatusUpdateWeightCompleted)
        } else if (orderOpt === 19) {
            return data.sort(this.compareByStatusCmsUpdateCouchbaseError)
        } else if (orderOpt === 20) {
            return data.sort(this.compareByStatusPublish)
        } else if (orderOpt === 21) {
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

    compareByStatusCmsInsertPostCompletedBlacklist(a, b) {
        const A = a.TotalByStatus[4]
        const B = b.TotalByStatus[4]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }


    compareByStatusCmsInsertPostCompleted(a, b) {
        const A = a.TotalByStatus[5]
        const B = b.TotalByStatus[5]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusDownloadMediaError(a, b) {
        const A = a.TotalByStatus[6]
        const B = b.TotalByStatus[6]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusDownloadMediaCompleted(a, b) {
        const A = a.TotalByStatus[7]
        const B = b.TotalByStatus[7]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusGenThumImageError(a, b) {
        const A = a.TotalByStatus[8]
        const B = b.TotalByStatus[8]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusGenThumImageCompleted(a, b) {
        const A = a.TotalByStatus[9]
        const B = b.TotalByStatus[9]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateMediaLinkError(a, b) {
        const A = a.TotalByStatus[10]
        const B = b.TotalByStatus[10]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateMediaLinkCompleted(a, b) {
        const A = a.TotalByStatus[11]
        const B = b.TotalByStatus[11]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCheckDuplicateError(a, b) {
        const A = a.TotalByStatus[12]
        const B = b.TotalByStatus[12]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }


    compareByStatusInreview(a, b) {
        const A = a.TotalByStatus[13]
        const B = b.TotalByStatus[13]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCheckNoDuplicated(a, b) {
        const A = a.TotalByStatus[14]
        const B = b.TotalByStatus[14]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateWeightError(a, b) {
        const A = a.TotalByStatus[15]
        const B = b.TotalByStatus[15]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusUpdateWeightCompleted(a, b) {
        const A = a.TotalByStatus[16]
        const B = b.TotalByStatus[16]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusCmsUpdateCouchbaseError(a, b) {
        const A = a.TotalByStatus[17]
        const B = b.TotalByStatus[17]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusPublish(a, b) {
        const A = a.TotalByStatus[18]
        const B = b.TotalByStatus[18]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByStatusInTrash(a, b) {
        const A = a.TotalByStatus[19]
        const B = b.TotalByStatus[19]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }
    // END Build Status Statistic Chart 
    /////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////
    //Build Percentage Status
    totalCrawlStatusStatistic(data) {

        var totalStatus = 0
        var elementTotalData = []
        for (let j = 0; j < data[0].TotalByStatus.length; j++) {
            var totalElement = 0
            var obj = { titleStatus: "", total: 0, percentsStatus: 0 }
            for (let k = 0; k < data.length; k++) {
                totalElement += data[k].TotalByStatus[j]
            }
            totalStatus += totalElement
            obj.titleStatus = this.state.titlesStatus[j]
            obj.total = totalElement            
            elementTotalData[j] = obj

        };
        for (let i = 0; i < elementTotalData.length; i++) {
            elementTotalData[i].percentsStatus = (elementTotalData[i].total / totalStatus * 100).toFixed(2)
        }
        this.setState({
            percentageStatusStatistic: elementTotalData,
            totalStatusStatistic:totalStatus,
            downloadHTMLCompleteStatusPercent: elementTotalData[0].percentsStatus,
            etlErroStatusPercent: elementTotalData[1].percentsStatus,
            etlCompleteStatusPercent: elementTotalData[2].percentsStatus,
            cmsInsertPostErroStatusPercent: elementTotalData[3].percentsStatus,
            cmsInsertPostCompletedStatusStStatusPercent: elementTotalData[4].percentsStatus,
            cmsInsertPostCompleteStatusPercent: elementTotalData[5].percentsStatus,
            downloadMediaErroStatusPercent: elementTotalData[6].percentsStatus,
            downloadMediaCompleteStatusPercent: elementTotalData[7].percentsStatus,
            genThumImageErroStatusPercent: elementTotalData[8].percentsStatus,
            genThumImageCompleteStatusPercent: elementTotalData[9].percentsStatus,
            updateMediaLinkErroStatusPercent: elementTotalData[10].percentsStatus,
            updateMediaLinkCompleteStatusPercent: elementTotalData[11].percentsStatus,
            checkDuplicateErroStatusPercent: elementTotalData[12].percentsStatus,
            inrevieStatusPercent: elementTotalData[13].percentsStatus,
            checkNoDuplicateStatusPercent: elementTotalData[14].percentsStatus,
            updateWeightErroStatusPercent: elementTotalData[15].percentsStatus,
            updateWeightCompleteStatusPercent: elementTotalData[16].percentsStatus,
            cmsUpdateCouchbaseErroStatusPercent: elementTotalData[17].percentsStatus,
            publisStatusPercent: elementTotalData[18].percentsStatus,
            inTrasStatusPercent: elementTotalData[19].percentsStatus,
        })

    }

    showPercentStatusChart() {
        const showPercentStatus = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 600,
            },
            title: {
                text: 'Percenttage Status Statistic'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Download HTML completed',
                    y: Number(this.state.downloadHTMLCompleteStatusPercent),
                    sliced: true,
                    selected: true
                }, {
                    name: 'ETL Error',
                    y: Number(this.state.etlErroStatusPercent)
                }, {
                    name: 'ETL Completed',
                    y: Number(this.state.etlCompleteStatusPercent)
                }, {
                    name: 'Cms insert post error',
                    y: Number(this.state.cmsInsertPostErroStatusPercent)
                }, {
                    name: 'Cms insert post completed blacklist',
                    y: Number(this.state.cmsInsertPostCompletedStatusStStatusPercent)
                }, {
                    name: 'Cms insert post completed',
                    y: Number(this.state.cmsInsertPostCompleteStatusPercent)
                }, {
                    name: 'Download media error',
                    y: Number(this.state.downloadMediaErroStatusPercent)
                }, {
                    name: 'Download media error Completed',
                    y: Number(this.state.downloadMediaCompleteStatusPercent)
                }, {
                    name: 'Gen thumb image error',
                    y: Number(this.state.genThumImageErroStatusPercent)
                }, {
                    name: 'Gen thumb image completed',
                    y: Number(this.state.genThumImageCompleteStatusPercent)
                }, {
                    name: " Update link media error",
                    y: Number(this.state.updateMediaLinkErroStatusPercent)
                }, {
                    name: "Update link media completed",
                    y: Number(this.state.updateMediaLinkCompleteStatusPercent)
                }, {
                    name: "Check duplicate error",
                    y: Number(this.state.checkDuplicateErroStatusPercent)
                }, {
                    name: 'Duplicated Interiew',
                    y: Number(this.state.inrevieStatusPercent)
                }, {
                    name: 'No duplicated ',
                    y: Number(this.state.checkNoDuplicateStatusPercent)
                }, {
                    name: 'Update weight error',
                    y: Number(this.state.updateWeightErroStatusPercent)
                }, {
                    name: 'Update weight completed',
                    y: Number(this.state.updateWeightCompleteStatusPercent)
                }, {
                    name: 'Cms update couchbase error',
                    y: Number(this.state.cmsUpdateCouchbaseErroStatusPercent)
                }, {
                    name: 'Published',
                    y: Number(this.state.publisStatusPercent)
                }, {
                    name: 'In Trash',
                    y: Number(this.state.inTrasStatusPercent)
                }

                ],
            }]
        };
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={showPercentStatus}
            />
        )
    }

    /////////////////////////////////////////////////////////
    // Build ErrorCode Statistic Chart 
    getPostErrorCodeStatistic(fromDatePickedByErrorCode) {
        let fromDate = fromDatePickedByErrorCode.getFullYear() + "-" + (fromDatePickedByErrorCode.getMonth() + 1) + "-" + fromDatePickedByErrorCode.getDate() + " " + fromDatePickedByErrorCode.getHours() + ":" + fromDatePickedByErrorCode.getMinutes() + ":00";
        this._dashboardService.getPostErrorCodeStatistic(fromDate)
            .then((result) => {
                if (result.Message === "Success" && result.Data !== null) {
                    this.createErrorCodeStatisticChart(result.Data)
                    this.totalByErrorCode(result.Data)
                    this.setState({
                        statisticByErrorCodeData: result.Data
                    })
                } else if (result.Message === "Success" && result.Data === null) {
                    this.addNoti.addNotification("danger", "Không tìm thấy dữ liệu thống kê các Error Code");
                    this.setState({
                        heightChartByErrorCode: 0,
                        publishersStatisticByErrorCode: [],
                        crawlerDownloadFailedErrorCodeStatistic: [],
                        crawlerUrlNotFoundErrorCodeStatistic: [],
                        crawlerCannotCreateFileErrorCodeStatistic: [],
                        crawlerCannotCopyFileErrorCodeStatistic: [],
                        crawlerTooLongVideoErrorCodeStatistic: [],
                        crawlerIgnoreDownloadMediaErrorCodeStatistic: [],
                        crawlerUnknownErrorCodeStatistic: [],
                        crawlerUploadAwsErrorCodeStatistic: [],
                        etlParsingCrawlMessageExceptionErrorCodeStatistic: [],
                        etlDownloadHtmlS3ExceptionErrorCodeStatistic: [],
                        etlExceptionErrorCodeStatistic: [],
                        etlAiTaggingApiExceptionErrorCodeStatistic: [],
                        etlRabbitmqPostDataExceptionErrorCodeStatistic: [],
                        thumbDownloadImagesFromS3ExceptionErrorCodeStatistic: [],
                        thumbUploadToS3ExceptionErrorCodeStatistic: [],
                        thumbExceptionErrorCodeStatistic: [],
                        thumbVideoGetThumbExceptionErrorCodeStatistic: [],
                        thumbLackMediaExceptionErrorCodeStatistic: [],
                        duplicateFailureErrorCodeStatistic: [],
                        duplicateInvalidDataErrorCodeStatistic: [],
                        weightUpdateFailedErrorCodeStatistic: [],
                        weightInvalidStatusErrorCodeStatistic: [],
                        cmsInsertFailedErrorCodeStatistic: [],
                        cmsUnknownCategoryErrorCodeStatistic: [],
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    createErrorCodeStatisticChart(data) {
        const dataSorted = this.sortErrorCodeStatisticData(data, this.state.orderByErrorCodeOption)
        const publishers = []
        const crawlerDownloadFailedErrorCode = []
        const crawlerUrlNotFoundErrorCode = []
        const crawlerCannotCreateFileErrorCode = []
        const crawlerCannotCopyFileErrorCode = []
        const crawlerTooLongVideoErrorCode = []
        const crawlerIgnoreDownloadMediaErrorCode = []
        const crawlerUnknownErrorCode = []
        const crawlerUploadAwsErrorCode = []
        const etlParsingCrawlMessageExceptionErrorCode = []
        const etlDownloadHtmlS3ExceptionErrorCode = []
        const etlExceptionErrorCode = []
        const etlAiTaggingApiExceptionErrorCode = []
        const etlRabbitmqPostDataExceptionErrorCode = []
        const thumbDownloadImagesFromS3ExceptionErrorCode = []
        const thumbUploadToS3ExceptionErrorCode = []
        const thumbExceptionErrorCode = []
        const thumbVideoGetThumbExceptionErrorCode = []
        const thumbLackMediaExceptionErrorCode = []
        const duplicateFailureErrorCode = []
        const duplicateInvalidDataErrorCode = []
        const weightUpdateFailedErrorCode = []
        const weightInvalidStatusErrorCode = []
        const cmsInsertFailedErrorCode = []
        const cmsUnknownCategoryErrorCode = []

        dataSorted.forEach(element => {
            publishers.push(element.Publisher)
            crawlerDownloadFailedErrorCode.push(element.TotalByErrorCode[0])
            crawlerUrlNotFoundErrorCode.push(element.TotalByErrorCode[1])
            crawlerCannotCreateFileErrorCode.push(element.TotalByErrorCode[2])
            crawlerCannotCopyFileErrorCode.push(element.TotalByErrorCode[3])
            crawlerTooLongVideoErrorCode.push(element.TotalByErrorCode[4])
            crawlerIgnoreDownloadMediaErrorCode.push(element.TotalByErrorCode[5])
            crawlerUnknownErrorCode.push(element.TotalByErrorCode[6])
            crawlerUploadAwsErrorCode.push(element.TotalByErrorCode[7])
            etlParsingCrawlMessageExceptionErrorCode.push(element.TotalByErrorCode[8])
            etlDownloadHtmlS3ExceptionErrorCode.push(element.TotalByErrorCode[9])
            etlExceptionErrorCode.push(element.TotalByErrorCode[10])
            etlAiTaggingApiExceptionErrorCode.push(element.TotalByErrorCode[11])
            etlRabbitmqPostDataExceptionErrorCode.push(element.TotalByErrorCode[12])
            thumbDownloadImagesFromS3ExceptionErrorCode.push(element.TotalByErrorCode[13])
            thumbUploadToS3ExceptionErrorCode.push(element.TotalByErrorCode[14])
            thumbExceptionErrorCode.push(element.TotalByErrorCode[15])
            thumbVideoGetThumbExceptionErrorCode.push(element.TotalByErrorCode[16])
            thumbLackMediaExceptionErrorCode.push(element.TotalByErrorCode[17])
            duplicateFailureErrorCode.push(element.TotalByErrorCode[18])
            duplicateInvalidDataErrorCode.push(element.TotalByErrorCode[19])
            weightUpdateFailedErrorCode.push(element.TotalByErrorCode[20])
            weightInvalidStatusErrorCode.push(element.TotalByErrorCode[21])
            cmsInsertFailedErrorCode.push(element.TotalByErrorCode[22])
            cmsUnknownCategoryErrorCode.push(element.TotalByErrorCode[23])
        });

        this.setState({
            heightChartByErrorCode: 1200,
            publishersStatisticByErrorCode: publishers,
            crawlerDownloadFailedErrorCodeStatistic: crawlerDownloadFailedErrorCode,
            crawlerUrlNotFoundErrorCodeStatistic: crawlerUrlNotFoundErrorCode,
            crawlerCannotCreateFileErrorCodeStatistic: crawlerCannotCreateFileErrorCode,
            crawlerCannotCopyFileErrorCodeStatistic: crawlerCannotCopyFileErrorCode,
            crawlerTooLongVideoErrorCodeStatistic: crawlerTooLongVideoErrorCode,
            crawlerIgnoreDownloadMediaErrorCodeStatistic: crawlerIgnoreDownloadMediaErrorCode,
            crawlerUnknownErrorCodeStatistic: crawlerUnknownErrorCode,
            crawlerUploadAwsErrorCodeStatistic: crawlerUploadAwsErrorCode,
            etlParsingCrawlMessageExceptionErrorCodeStatistic: etlParsingCrawlMessageExceptionErrorCode,
            etlDownloadHtmlS3ExceptionErrorCodeStatistic: etlDownloadHtmlS3ExceptionErrorCode,
            etlExceptionErrorCodeStatistic: etlExceptionErrorCode,
            etlAiTaggingApiExceptionErrorCodeStatistic: etlAiTaggingApiExceptionErrorCode,
            etlRabbitmqPostDataExceptionErrorCodeStatistic: etlRabbitmqPostDataExceptionErrorCode,
            thumbDownloadImagesFromS3ExceptionErrorCodeStatistic: thumbDownloadImagesFromS3ExceptionErrorCode,
            thumbUploadToS3ExceptionErrorCodeStatistic: thumbUploadToS3ExceptionErrorCode,
            thumbExceptionErrorCodeStatistic: thumbExceptionErrorCode,
            thumbVideoGetThumbExceptionErrorCodeStatistic: thumbVideoGetThumbExceptionErrorCode,
            thumbLackMediaExceptionErrorCodeStatistic: thumbLackMediaExceptionErrorCode,
            duplicateFailureErrorCodeStatistic: duplicateFailureErrorCode,
            duplicateInvalidDataErrorCodeStatistic: duplicateInvalidDataErrorCode,
            weightUpdateFailedErrorCodeStatistic: weightUpdateFailedErrorCode,
            weightInvalidStatusErrorCodeStatistic: weightInvalidStatusErrorCode,
            cmsInsertFailedErrorCodeStatistic: cmsInsertFailedErrorCode,
            cmsUnknownCategoryErrorCodeStatistic: cmsUnknownCategoryErrorCode,
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
            colors: ['#ff0000', '#8c0000', '#ff006a', '#ff00bd', '#ff5e00', '#ff9900', '#ffdf00', '#d8ff00', '#57ff00', '#00ff95', '#00ffe7', '#00b9ff', '#007eff', '#002cff', '#4a00ff', '#e300ff', '#9d00ff', '#4a2d2d', '#616161', '#000000'],
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
                    name: 'Cms unknown category',
                    data: this.state.cmsUnknownCategoryErrorCodeStatistic
                }, {
                    name: 'Cms insert failed',
                    data: this.state.cmsInsertFailedErrorCodeStatistic
                }, {
                    name: 'Weight invalid',
                    data: this.state.weightInvalidStatusErrorCodeStatistic
                }, {
                    name: 'Weight update failed',
                    data: this.state.weightUpdateFailedErrorCodeStatistic
                }, {
                    name: 'Duplicate invalid data',
                    data: this.state.duplicateInvalidDataErrorCodeStatistic
                }, {
                    name: 'Duplicate failure',
                    data: this.state.duplicateFailureErrorCodeStatistic
                }, {
                    name: 'Thumb lack media exception',
                    data: this.state.thumbLackMediaExceptionErrorCodeStatistic
                }, {
                    name: 'Thumb video get thumb exception',
                    data: this.state.thumbVideoGetThumbExceptionErrorCodeStatistic
                }, {
                    name: 'Thumb exception',
                    data: this.state.thumbExceptionErrorCodeStatistic
                }, {
                    name: 'Thumb uploadTo S3 exception',
                    data: this.state.thumbUploadToS3ExceptionErrorCodeStatistic
                }, {
                    name: 'Thumb download images from S3 exception"',
                    data: this.state.thumbDownloadImagesFromS3ExceptionErrorCodeStatistic
                }, {
                    name: 'Etl rabbitMQ post data exception',
                    data: this.state.etlRabbitmqPostDataExceptionErrorCodeStatistic
                }, {
                    name: 'Etl AI tagging API exception',
                    data: this.state.etlAiTaggingApiExceptionErrorCodeStatistic
                }, {
                    name: 'Etl exception',
                    data: this.state.etlExceptionErrorCodeStatistic
                }, {
                    name: 'Etl download HTML S3 exception',
                    data: this.state.etlDownloadHtmlS3ExceptionErrorCodeStatistic
                }, {
                    name: 'Etl parsing crawl message exception',
                    data: this.state.etlParsingCrawlMessageExceptionErrorCodeStatistic
                }, {
                    name: 'Crawler upload AWS error',
                    data: this.state.crawlerUploadAwsErrorCodeStatistic
                }, {
                    name: 'Crawler unknow error',
                    data: this.state.crawlerUnknownErrorCodeStatistic
                }, {
                    name: 'Crawler ignore download media',
                    data: this.state.crawlerIgnoreDownloadMediaErrorCodeStatistic
                }, {
                    name: 'Crawler too long video',
                    data: this.state.crawlerTooLongVideoErrorCodeStatistic
                }, {
                    name: 'Crawler cannot copy file',
                    data: this.state.crawlerCannotCopyFileErrorCodeStatistic
                }, {
                    name: 'Crawler cannot create file',
                    data: this.state.crawlerCannotCreateFileErrorCodeStatistic
                }, {
                    name: 'Crawler url not found',
                    data: this.state.crawlerUrlNotFoundErrorCodeStatistic
                }, {
                    name: 'Crawler download failed',
                    data: this.state.crawlerDownloadFailedErrorCodeStatistic
                },

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
            return data.sort(this.compareByErrorCodeCrawlerDownloadFailed)
        } else if (orderOpt === 3) {
            return data.sort(this.compareByErrorCodeCrawlerUrlNotFound)
        } else if (orderOpt === 4) {
            return data.sort(this.compareByErrorCodeCrawlerCannotCreateFile)
        } else if (orderOpt === 5) {
            return data.sort(this.compareByErrorCodeCrawlerCannotCopyFile)
        } else if (orderOpt === 6) {
            return data.sort(this.compareByErrorCodeCrawlerTooLongVideo)
        } else if (orderOpt === 7) {
            return data.sort(this.compareByErrorCodeCrawlerIgnoreDownloadMedia)
        } else if (orderOpt === 8) {
            return data.sort(this.compareByErrorCodeCrawlerUnknown)
        } else if (orderOpt === 9) {
            return data.sort(this.compareByErrorCodeCrawlerUploadAws)
        } else if (orderOpt === 10) {
            return data.sort(this.compareByErrorCodeEtlParsingCrawlMessageException)
        } else if (orderOpt === 11) {
            return data.sort(this.compareByErrorCodeEtlDownloadHtmlS3Exception)
        } else if (orderOpt === 12) {
            return data.sort(this.compareByErrorCodeEtlException)
        } else if (orderOpt === 13) {
            return data.sort(this.compareByErrorCodeEtlAiTaggingApiException)
        } else if (orderOpt === 14) {
            return data.sort(this.compareByErrorCodeEtlRabbitmqPostDataException)
        } else if (orderOpt === 15) {
            return data.sort(this.compareByErrorCodeThumbDownloadImagesFromS3Exception)
        } else if (orderOpt === 16) {
            return data.sort(this.compareByErrorCodeThumbUploadToS3Exception)
        } else if (orderOpt === 17) {
            return data.sort(this.compareByErrorCodeThumbException)
        } else if (orderOpt === 18) {
            return data.sort(this.compareByErrorCodeThumbVideoGetThumb)
        } else if (orderOpt === 19) {
            return data.sort(this.compareByErrorCodeThumbLackMediaException)
        } else if (orderOpt === 20) {
            return data.sort(this.compareByErrorCodeDuplicateFailure)
        } else if (orderOpt === 21) {
            return data.sort(this.compareByErrorCodeDuplicateInvalidData)
        } else if (orderOpt === 22) {
            return data.sort(this.compareByErrorCodeWeightUpdateFailed)
        } else if (orderOpt === 23) {
            return data.sort(this.compareByErrorCodeWeightInvalid)
        } else if (orderOpt === 24) {
            return data.sort(this.compareByErrorCodeCmsInsertFailed)
        } else if (orderOpt === 25) {
            return data.sort(this.compareByErrorCodeCmsUnknownCategory)
        }
    }

    compareByErrorCodeCrawlerDownloadFailed(a, b) {
        const A = a.TotalByErrorCode[0]
        const B = b.TotalByErrorCode[0]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerUrlNotFound(a, b) {
        const A = a.TotalByErrorCode[1]
        const B = b.TotalByErrorCode[1]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerCannotCreateFile(a, b) {
        const A = a.TotalByErrorCode[2]
        const B = b.TotalByErrorCode[2]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerCannotCopyFile(a, b) {
        const A = a.TotalByErrorCode[3]
        const B = b.TotalByErrorCode[3]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerTooLongVideo(a, b) {
        const A = a.TotalByErrorCode[4]
        const B = b.TotalByErrorCode[4]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerIgnoreDownloadMedia(a, b) {
        const A = a.TotalByErrorCode[5]
        const B = b.TotalByErrorCode[5]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerUnknown(a, b) {
        const A = a.TotalByErrorCode[6]
        const B = b.TotalByErrorCode[6]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCrawlerUploadAws(a, b) {
        const A = a.TotalByErrorCode[7]
        const B = b.TotalByErrorCode[7]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeEtlParsingCrawlMessageException(a, b) {
        const A = a.TotalByErrorCode[8]
        const B = b.TotalByErrorCode[8]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeEtlDownloadHtmlS3Exception(a, b) {
        const A = a.TotalByErrorCode[9]
        const B = b.TotalByErrorCode[9]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeEtlException(a, b) {
        const A = a.TotalByErrorCode[10]
        const B = b.TotalByErrorCode[10]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeEtlAiTaggingApiException(a, b) {
        const A = a.TotalByErrorCode[11]
        const B = b.TotalByErrorCode[11]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeEtlRabbitmqPostDataException(a, b) {
        const A = a.TotalByErrorCode[12]
        const B = b.TotalByErrorCode[12]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeThumbDownloadImagesFromS3Exception(a, b) {
        const A = a.TotalByErrorCode[13]
        const B = b.TotalByErrorCode[13]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeThumbUploadToS3Exception(a, b) {
        const A = a.TotalByErrorCode[14]
        const B = b.TotalByErrorCode[14]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeThumbException(a, b) {
        const A = a.TotalByErrorCode[15]
        const B = b.TotalByErrorCode[15]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeThumbVideoGetThumb(a, b) {
        const A = a.TotalByErrorCode[16]
        const B = b.TotalByErrorCode[16]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeThumbLackMediaException(a, b) {
        const A = a.TotalByErrorCode[17]
        const B = b.TotalByErrorCode[17]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeDuplicateFailure(a, b) {
        const A = a.TotalByErrorCode[18]
        const B = b.TotalByErrorCode[18]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeDuplicateInvalidData(a, b) {
        const A = a.TotalByErrorCode[19]
        const B = b.TotalByErrorCode[19]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeWeightUpdateFailed(a, b) {
        const A = a.TotalByErrorCode[20]
        const B = b.TotalByErrorCode[20]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeWeightInvalid(a, b) {
        const A = a.TotalByErrorCode[21]
        const B = b.TotalByErrorCode[21]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCmsInsertFailed(a, b) {
        const A = a.TotalByErrorCode[22]
        const B = b.TotalByErrorCode[22]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    compareByErrorCodeCmsUnknownCategory(a, b) {
        const A = a.TotalByErrorCode[23]
        const B = b.TotalByErrorCode[23]
        if (A > B) {
            return -1;
        } else if (A < B) {
            return 1;
        }
    }

    totalByErrorCode(data) {
        var totalErrorCode = 0
        var elementDataError = []
        for (let j = 0; j < data[0].TotalByErrorCode.length; j++) {
            var totalElement = 0
            var objError = { titleErrorCode: "", total: 0, percentsErrorCode: 0 }
            for (let i = 0; i < data.length; i++) {
                totalElement += data[i].TotalByErrorCode[j]
            }
            totalErrorCode += totalElement
            objError.titleErrorCode = this.state.titlesErrorCode[j]
            objError.total = totalElement

            elementDataError[j] = objError
        };
        for (let i = 0; i < elementDataError.length; i++) {
            elementDataError[i].percentsErrorCode = (elementDataError[i].total / totalErrorCode * 100).toFixed(2)
        }
        this.setState({
            percentageErrorCode: elementDataError,
            totalErrorCodeStatistic: totalErrorCode,
            crawlerDownloadFailedErrorCodepercent:elementDataError[0].percentsErrorCode,
            crawlerUrlNotFoundErrorCodepercent:elementDataError[1].percentsErrorCode,
            crawlerCannotCreateFileErrorCodepercent:elementDataError[2].percentsErrorCode,
            crawlerCannotCopyFileErrorCodepercent: elementDataError[3].percentsErrorCode,
            crawlerTooLongVideoErrorCodepercent: elementDataError[4].percentsErrorCode,
            crawlerIgnoreDownloadMediaErrorCodepercent: elementDataError[5].percentsErrorCode,
            crawlerUnknownErrorCodepercent: elementDataError[6].percentsErrorCode,
            crawlerUploadAwsErrorCodepercent: elementDataError[7].percentsErrorCode,
            etlParsingCrawlMessageExceptionErrorpercent: elementDataError[8].percentsErrorCode,
            etlDownloadHtmlS3ExceptionErrorCodepercent: elementDataError[9].percentsErrorCode,
            etlExceptionErrorCodepercent: elementDataError[10].percentsErrorCode,
            etlAiTaggingApiExceptionErrorCodepercent: elementDataError[11].percentsErrorCode,
            etlRabbitmqPostDataExceptionErrorCodeStaticpercent: elementDataError[12].percentsErrorCode,
            thumbDownloadImagesFromS3ExceptionErrorCoodepercent: elementDataError[13].percentsErrorCode,
            thumbUploadToS3ExceptionErrorCode: elementDataError[14].percentsErrorCode,
            thumbExceptionErrorCodepercent: elementDataError[15].percentsErrorCode,
            thumbVideoGetThumbExceptionErrorCodepercent: elementDataError[16].percentsErrorCode,
            thumbLackMediaExceptionErrorCodepercent: elementDataError[17].percentsErrorCode,
            duplicateFailureErrorCodepercent: elementDataError[18].percentsErrorCode,
            duplicateInvalidDataErrorCodepercent: elementDataError[19].percentsErrorCode,
            weightUpdateFailedErrorCodepercent: elementDataError[20].percentsErrorCode,
            weightInvalidStatusErrorCodepercent: elementDataError[21].percentsErrorCode,
            cmsInsertFailedErrorCodepercent: elementDataError[22].percentsErrorCode,
            cmsUnknownCategoryErrorCodepercent: elementDataError[23].percentsErrorCode,
        })

    }

    showPercentErrorCode() {
        const showPercentError = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 600,
            },
            title: {
                text: 'Percenttage Error Code'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Crawler Download Failed',
                    y: Number(this.state.crawlerDownloadFailedErrorCodepercent),
                    sliced: true,
                    selected: true
                }, {
                    name: 'Crawler Url Not Found',
                    y: Number(this.state.crawlerUrlNotFoundErrorCodepercent)
                }, {
                    name: 'Crawler Cannot Create File',
                    y: Number(this.state.crawlerCannotCreateFileErrorCodepercent)
                }, {
                    name: 'Crawler Cannnot Copy File',
                    y: Number(this.state.crawlerCannotCopyFileErrorCodepercent)
                }, {
                    name: ' Crawler Too Long Video',
                    y: Number(this.state.crawlerTooLongVideoErrorCodepercent)
                }, {
                    name: 'Crawler Ignor Download Media',
                    y: Number(this.state.crawlerIgnoreDownloadMediaErrorCodepercent)
                }, {
                    name: 'Crawler Unkown',
                    y: Number(this.state.crawlerUnknownErrorCodepercent)
                }, {
                    name: 'Crawler Upload Aws',
                    y: Number(this.state.crawlerUploadAwsErrorCodepercent)
                }, {
                    name: 'ETL Parsing Crawler Message Expection',
                    y: Number(this.state.etlParsingCrawlMessageExceptionErrorpercent)
                }, {
                    name: 'ETL Download HTML S3 Exception',
                    y: Number(this.state.etlDownloadHtmlS3ExceptionErrorCodepercent)
                }, {
                    name: 'ETL Exception',
                    y: Number(this.state.etlExceptionErrorCodepercent)
                }, {
                    name: 'ETL AI Tagging API Exception',
                    y: Number(this.state.etlAiTaggingApiExceptionErrorCodepercent)
                }, {
                    name: 'ETL Rabbi TMQ Post Data Exception',
                    y: Number(this.state.etlRabbitmqPostDataExceptionErrorCodeStaticpercent)
                }, {
                    name: 'Thumb Download Images From S3 Exception',
                    y: Number(this.state.thumbDownloadImagesFromS3ExceptionErrorCoodepercent)
                }, {
                    name: 'Thumb Upload To S3 Exception',
                    y: Number(this.state.thumbUploadToS3ExceptionErrorCode)
                }, {
                    name: 'Thumb Exception',
                    y: Number(this.state.thumbExceptionErrorCodepercent)
                }, {
                    name: 'Thumb Video Get Thumb Exception',
                    y: Number(this.state.thumbVideoGetThumbExceptionErrorCodepercent)
                }, {
                    name: 'Thumb lack Media Exception',
                    y: Number(this.state.thumbLackMediaExceptionErrorCodepercent)
                }, {
                    name: 'Dupliacte Failure',
                    y: Number(this.state.duplicateFailureErrorCodepercent)
                }, {
                    name: 'Duplicate Invalid Data',
                    y: Number(this.state.duplicateInvalidDataErrorCodepercent)
                }, {
                    name: 'Weight Update Faited ',
                    y: Number(this.state.weightUpdateFailedErrorCodepercent)
                }, {
                    name: 'Weight Invalid Status',
                    y: Number(this.state.weightInvalidStatusErrorCodepercent)
                }, {
                    name: 'CMS Insert Failed',
                    y: Number(this.state.cmsInsertFailedErrorCodepercent)
                }, {
                    name: 'CMS Unkown Category',
                    y: Number(this.state.cmsUnknownCategoryErrorCodepercent)
                }

                ],
            }]
        };
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={showPercentError}
            />
        )
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
                            <CardHeader style={{ backgroundColor: '#d7efff' }} className='centered'> Percentage Status Statistic
                            </CardHeader>
                            <CardBody>

                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Stt</th>
                                            <th>StatusStatistic</th>
                                            <th>Percentage</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.percentageStatusStatistic.map((item, index) =>
                                            (<tr key={index}>
                                                <td className="centered">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <span>{item.titleStatus}</span>
                                                </td>
                                                <td>
                                                    <span>{item.percentsStatus}</span>
                                                </td>
                                                <td>
                                                    <span>{item.total}</span>
                                                </td>                                               
                                            </tr>)
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th id="total" colSpan={3}>Total Status :</th>
                                            <td className="font-weight-bold" >{this.state.totalStatusStatistic}</td>
                                        </tr>
                                        
                                        
                                    </tfoot>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }} className='centered'> Percentage ErrorCode
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Stt</th>
                                            <th>ErrorCode</th>
                                            <th>Percentage</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.percentageErrorCode.map((item, index) =>
                                            (<tr key={index}>
                                                <td className="centered">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <span>{item.titleErrorCode}</span>
                                                </td>
                                                <td>
                                                    <span>{item.percentsErrorCode}</span>
                                                </td>
                                                <td>
                                                    <span>{item.total}</span>
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th id="total" colSpan={3} >Total ErrorCode :</th>
                                            <td className="font-weight-bold">{this.state.totalErrorCodeStatistic}</td>
                                        </tr>       
                                    </tfoot>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }}>
                                <i className='fa fa-pie-chart'></i> Chart Percentage Status
                            </CardHeader>
                            <CardBody>
                                {this.showPercentStatusChart()}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={{ size: 6 }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: '#d7efff' }}>
                                <i className='fa fa-pie-chart'></i> Chart Percentage Eror Code
                            </CardHeader>
                            <CardBody>
                                {this.showPercentErrorCode()}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

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
