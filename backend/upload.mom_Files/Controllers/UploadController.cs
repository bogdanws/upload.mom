using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using upload.mom_Files.Models;

namespace upload.mom_Files.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly ILogger<UploadController> _logger;
    private StorageOptions _options;

    public UploadController(DatabaseContext context, ILogger<UploadController> logger, IOptions<StorageOptions> options)
    {
        _context = context;
        _logger = logger;
        _options = options.Value;
    }

    [HttpPost]
    public async Task<IActionResult> UploadFile(IFormFile[] files)
    {
        if (files.Length == 0) return BadRequest(new { error = "No files were provided" });

        // Define the path to save the file
        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), _options.UploadPath);

        // Ensure the directory exists
        Directory.CreateDirectory(uploadPath);

        // Create a new upload id
        var uploadId = GenerateUploadString();

        // Define the zip file path
        var zipPath = Path.Combine(uploadPath, $"{uploadId}.zip");

        // Create a new zip file
        using (var zip = ZipFile.Open(zipPath, ZipArchiveMode.Create))
        {
            foreach (var file in files)
            {
                // Define the file path
                var filePath = Path.Combine(uploadPath, file.FileName);

                // Save the file to the upload directory
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Add the file to the zip
                zip.CreateEntryFromFile(filePath, file.FileName);

                // Delete the file from the upload directory
                System.IO.File.Delete(filePath);
            }
        }

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

        // Add the file to the database
        _context.Files.Add(newFile);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Uploaded {filesCount} files with id {uploadId} from {ipAddress}", files.Length, uploadId,
            ipAddress);

        return Ok(new { uploadId });
    }

    private readonly Random _random = new();

    private string GenerateUploadString(int length = 4)
    {
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789".ToCharArray();
        var uploadId = "";
        for (var i = 0; i < length; i++) uploadId += chars[_random.Next(0, chars.Length)];

        // Check if the upload id already exists
        if (_context.Files.Any(x => x.Id == uploadId))
            // Recursively call the method with a longer length
            return GenerateUploadString(length + 1);

        return uploadId;
    }
}