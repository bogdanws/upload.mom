using Microsoft.Extensions.Options;

namespace upload.mom_Files.Services;

public class FileCleanupService : IHostedService
{
    private readonly ILogger<FileCleanupService> _logger;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private Timer? _timer;
    private StorageOptions _options;

    public FileCleanupService(ILogger<FileCleanupService> logger, IServiceScopeFactory serviceScopeFactory, IOptions<StorageOptions> options)
    {
        _logger = logger;
        _serviceScopeFactory = serviceScopeFactory;
        _options = options.Value;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("File cleanup service started");

        _timer = new Timer(CleanupFiles, null, TimeSpan.FromSeconds(_options.CleanupInterval), TimeSpan.FromSeconds(_options.CleanupInterval));

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("File cleanup service stopped");

        _timer?.Change(Timeout.Infinite, 0);
        _timer?.Dispose();

        return Task.CompletedTask;
    }

    private void CleanupFiles(object? state)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        var files = context.Files.Where(f => f.UploadDate.AddSeconds(f.Lifetime) < DateTime.UtcNow).ToList();

        foreach (var file in files)
        {
            context.Files.Remove(file);
            context.SaveChanges();

            var uploadPath = Path.GetDirectoryName(file.Path);
            if (Directory.Exists(uploadPath))
            {
                Directory.Delete(uploadPath, true);
            }
        }

        _logger.LogInformation($"Removed {files.Count} files");
    }
}