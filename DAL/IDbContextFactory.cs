namespace Application.DAL
{
    public interface IDbContextFactory
    {
        IApplicationDbContext Create();
    }
}
