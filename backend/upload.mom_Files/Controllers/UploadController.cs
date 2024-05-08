using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using upload.mom_Files.Models;

namespace upload.mom_Files.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly DatabaseContext _context;

    public UploadController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> UploadFile(IFormFile[] files)
    {
        if (files.Length == 0) return BadRequest(new { error = "No files were provided" });

        // Define the path to save the file
        var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

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
            }
        }

        // Create a new file model
        var fileModel = new UploadedFile(uploadId, files.Select(f => f.FileName).ToArray(), zipPath,
            (int)new FileInfo(zipPath).Length, DateTime.UtcNow, 2 * 60 * 60);

        // Add the file to the database
        _context.Files.Add(fileModel);
        await _context.SaveChangesAsync();

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