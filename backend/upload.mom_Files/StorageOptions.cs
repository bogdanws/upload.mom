namespace upload.mom_Files;

public class StorageOptions
{
    public const string Position = "StorageSettings";

    public int UploadLifetime { get; set; }
    public string UploadPath { get; set; }
    public int MaxUploadSize { get; set; }
    public int MaxUploadsPerDay { get; set; }
    public int CleanupInterval { get; set; }
}