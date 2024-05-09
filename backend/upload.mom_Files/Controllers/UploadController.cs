using Microsoft.Extensions.Options;
    private readonly ILogger<UploadController> _logger;
    private StorageOptions _options;
    public UploadController(DatabaseContext context, ILogger<UploadController> logger, IOptions<StorageOptions> options)
        _logger = logger;
        _options = options.Value;
        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), _options.UploadPath);

                // Delete the file from the upload directory
                System.IO.File.Delete(filePath);
        // Check how many uploads have been made in the last 24 hours
        string ipAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        var uploadsToday =
            _context.Files.Count(f => f.IpAddress == ipAddress && f.UploadDate > DateTime.UtcNow.AddDays(-1));
        // Check if the user has exceeded the upload limit
        if (uploadsToday >= _options.MaxUploadsPerDay)
            return BadRequest(new { error = "You have exceeded the upload limit" });

        // Create a new UploadedFile object
        var newFile = new UploadedFile(uploadId, files.Select(f => f.FileName).ToArray(), zipPath,
            (int)new FileInfo(zipPath).Length, DateTime.UtcNow, _options.UploadLifetime, ipAddress);
        _context.Files.Add(newFile);
        _logger.LogInformation($"Uploaded {files.Length} files with id {uploadId} from {ipAddress}");
