using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace upload.mom_Files.Models;

public class UploadedFile
{
    [Comment("Unique identifier for the file")]
    [MaxLength(100)]
    public string Id { get; set; }

    public string[] Files { get; set; }

    [Comment("Local path to the file")]
    [MaxLength(100)]
    public string Path { get; set; }

    public int Size { get; set; }

    public DateTime UploadDate { get; set; }
    public int Lifetime { get; set; }

    public UploadedFile(string id, string[] files, string path, int size, DateTime uploadDate, int lifetime)
    {
        Id = id;
        Files = files;
        Path = path;
        Size = size;
        UploadDate = uploadDate;
        Lifetime = lifetime;
    }
}

public class UploadedFileDTO
{
    public string Id { get; set; }
    public string[] Files { get; set; }
    public int Size { get; set; }

    public UploadedFileDTO(UploadedFile uploadedFile)
    {
        Id = uploadedFile.Id;
        Files = uploadedFile.Files;
        Size = uploadedFile.Size;
    }
}