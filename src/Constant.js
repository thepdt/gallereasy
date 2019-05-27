const constant = {
    // Crawl Task Status
	// For post
	StatusWait				    : 0,
	StatusCrawling			    : 1,
	StatusCrawlError            : 2,
	StatusCrawlUploadError	    : 3,
	StatusCrawlCompleted	    : 9,

	// For post
	StatusETL				    : 10,
	StatusETLError			    : 11,
	StatusETLCompleted		    : 19,

	// For media
	StatusDownloading		    : 20,
	StatusDownloadError		    : 21,
	StatusDownloadUploadError   : 22,
	StatusDownloadCompleted		: 29,

	// For post
	StatusAllCompleted			: 30,

	///////////////////////////////////////////////////
	////Crawl ETL Error Code
	SUCCESS   								: 810,
	DOWNLOAD_HTML_S3_EXCEPTION 				: 811,
	ETL_EXCEPTION  							: 812,
	AI_TAGGING_API_EXCEPTION  				: 813,
	CRAWL_DOWMLOAD_IMAGE_API_EXCEPTION  	: 814,
	CRAWL_DOWMLOAD_VIDEO_API_EXCEPTION 		: 815,
	CMS_API_DUPLICATE_ARTICLE_ID_EXCEPTION 	: 816,
	CMS_API_EXCEPTION  						: 817,
}

export default constant