/**
 * codePatterns.ts — representative code samples per system.
 *
 * Each code block shows the TECHNIQUE described in a chapter's decision
 * callout, written in canonical form. NOT Jinal's actual production code
 * (NDA'd) — these are the patterns themselves, sanitized for public
 * documentation. Real engineering blog posts (Stripe Engineering, Linear,
 * Will Larson) routinely show pattern code labeled "simplified" or
 * "representative." That's the convention.
 *
 * Honors CLAUDE.md rule #15: the FACT that Jinal used these patterns
 * traces to her chapter narratives and resume; the CODE SHAPE is the
 * canonical implementation found in any architecture-pattern textbook
 * (Fowler, GoF, .NET docs). Not invented as her code.
 */

export interface CodePattern {
  /** Title — the pattern name shown above the code */
  title: string;
  /** Short caption — engineering context */
  caption: string;
  /** Language tag for syntax-highlight hint */
  language: string;
  /** The code itself */
  code: string;
}

export const codePatterns: Record<string, CodePattern> = {
  lexisnexis: {
    title: "Resilient retry with Polly",
    caption:
      "Transient-failure handling pattern. Holds the 99.95% availability bar when downstream services wobble.",
    language: "csharp",
    code: `// Representative pattern — sanitized for NDA.
// Polly framework: exponential backoff + circuit breaker
// composed as a single resilience policy.

var retry = Policy
    .Handle<HttpRequestException>()
    .Or<TimeoutException>()
    .WaitAndRetryAsync(
        retryCount: 3,
        sleepDurationProvider: attempt =>
            TimeSpan.FromMilliseconds(200 * Math.Pow(2, attempt)),
        onRetry: (exception, span, attempt, ctx) =>
            _logger.LogWarning(
                "Retry {Attempt} after {Delay}ms: {Reason}",
                attempt, span.TotalMilliseconds, exception.Message));

var breaker = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(
        exceptionsAllowedBeforeBreaking: 5,
        durationOfBreak: TimeSpan.FromSeconds(30));

var resilient = Policy.WrapAsync(retry, breaker);

await resilient.ExecuteAsync(async () =>
    await _downstream.GetAsync(request));`,
  },

  motorola: {
    title: "Repository + Unit of Work",
    caption:
      "Data-access pattern that makes the codebase testable in isolation, optimizable per query, and easier for the next engineer to extend.",
    language: "csharp",
    code: `// Representative pattern — sanitized for NDA.
// IRepository<T> + IUnitOfWork compose so multiple repository
// operations land atomically in a single SaveChanges.

public interface IRepository<T> where T : class
{
    Task<T?> GetAsync(Guid id, CancellationToken ct = default);
    Task<IReadOnlyList<T>> FindAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken ct = default);
    void Add(T entity);
    void Remove(T entity);
}

public interface IUnitOfWork : IDisposable
{
    IRepository<Incident> Incidents { get; }
    IRepository<Dispatcher> Dispatchers { get; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}

// Use site — atomic across repositories:
using var uow = _uowFactory.Create();
var incident = await uow.Incidents.GetAsync(id, ct);
incident.AssignTo(dispatcherId);
uow.Dispatchers.Add(updatedDispatcher);
await uow.SaveChangesAsync(ct);   // both writes commit together`,
  },

  tcs: {
    title: "Clean architecture across services",
    caption:
      "Service-layer pattern that kept 20+ services in the same codebase from drifting. Domain logic owns the dependencies; infrastructure plugs in via interfaces.",
    language: "csharp",
    code: `// Representative pattern — sanitized for NDA.
// Domain depends on abstractions; infrastructure implements them.
// Service code reads as business logic, not framework plumbing.

// Domain (no framework references)
public class PlantOperationsService
{
    private readonly IPlantRepository _plants;
    private readonly INotificationGateway _notify;
    private readonly IClock _clock;

    public PlantOperationsService(
        IPlantRepository plants,
        INotificationGateway notify,
        IClock clock)
    {
        _plants = plants;
        _notify = notify;
        _clock = clock;
    }

    public async Task<Result> RecordIncidentAsync(
        Guid plantId, IncidentDetail detail, CancellationToken ct)
    {
        var plant = await _plants.GetAsync(plantId, ct);
        if (plant is null) return Result.NotFound();

        plant.LogIncident(detail, _clock.UtcNow);
        await _plants.SaveAsync(plant, ct);

        if (detail.Severity >= Severity.High)
            await _notify.PageOnCallAsync(plant.Id, detail, ct);

        return Result.Ok();
    }
}

// Infrastructure registers via DI — swappable in tests.`,
  },

  lti: {
    title: "Database-first with stored procedures",
    caption:
      "Schema-owned business logic pattern. The data model is the design; the database holds the dynamic patterns one place, optimizable + debuggable from the SQL side.",
    language: "sql",
    code: `-- Representative pattern — sanitized for NDA.
-- Stored procedure owning the dynamic-match business rule.
-- Versioned with the schema, optimizable in one place.

CREATE PROCEDURE dbo.usp_MatchActiveCustomers
    @SearchTerm        NVARCHAR(200),
    @IncludeArchived   BIT       = 0,
    @MaxResults        INT       = 50
AS
BEGIN
    SET NOCOUNT ON;

    -- Trigram search index used; query plan stable
    -- regardless of @SearchTerm shape.
    SELECT TOP (@MaxResults)
        c.CustomerId,
        c.DisplayName,
        c.Region,
        c.Status,
        c.LastActivityAt
    FROM dbo.Customers AS c WITH (READPAST)
    WHERE
        (@IncludeArchived = 1 OR c.Status <> 'Archived')
        AND c.SearchVector @@@ @SearchTerm
    ORDER BY
        c.LastActivityAt DESC,
        c.DisplayName    ASC;
END;`,
  },
};
