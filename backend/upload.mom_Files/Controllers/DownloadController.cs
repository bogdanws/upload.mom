using Microsoft.AspNetCore.Mvc;
using upload.mom_Files.Models;

namespace upload.mom_Files.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DownloadController : ControllerBase
{
    private readonly DatabaseContext _context;

    public DownloadController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet("files")]
    public async Task<IActionResult> GetFiles(
        [FromQuery(Name = "id")] string id
    )
    {
        var file = await _context.Files.FindAsync(id);

        if (file == null) return NotFound(new { error = "File not found" });

        UploadedFileDTO fileDTO = new(file);
        return Ok(fileDTO);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> DownloadFile(string id)
    {
        var file = await _context.Files.FindAsync(id);

        if (file == null) return NotFound(new { error = "File not found" });

        var path = file.Path;
        if (!System.IO.File.Exists(path)) return NotFound(new { error = "File does not exist on the server" });

        var fileName = Path.GetFileName(path);
        return PhysicalFile(path, "application/zip", fileName);
    }
}