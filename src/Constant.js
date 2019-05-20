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
	StatusAllCompleted			: 30
}

export default constant