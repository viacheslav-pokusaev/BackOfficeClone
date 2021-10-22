using Application.EntitiesModels.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Application.DAL
{
    public interface IApplicationDbContext : IDisposable
    {
        DbSet<UserProfile> UsersProfiles { get; set; }

        DbSet<ApplicationUser> ApplicationUsers { get; set; }

        DbSet<ApplicationRole> ApplicationRoles { get; set; }

        DbSet<RequestToCreateUser> RequestToCreateUsers { get; set; }

        DbSet<Vacation> Vacations { get; set; }

        DbSet<SickDay> SickDays { get; set; }

        DbSet<SizeVacation> SizeVacations { get; set; }

        DbSet<Overtime> Overtimes { get; set; }

        DbSet<WorkAtHome> WorkAtHomes { get; set; }

        DbSet<Project> Projects { get; set; }

        DbSet<Client> Clients { get; set; }

        DbSet<ContactPerson> ContactPersons { get; set; }

        DbSet<UserProfileProject> UserProfileProjects { get; set; }

        DbSet<Image> Images { get; set; }

        DbSet<RequestToUpdatePassword> RequestToUpdatePasswords { get; set; }

        DbSet<CryptKey> CryptKeys { get; set; }

        DbSet<CryptColumn> CryptColumns { get; set; }

        DbSet<AuditTrail> AuditTrails { get; set; }

        DbSet<AuditTrailEntity> AuditTrailEntities { get; set; }

        DbSet<AuditTrailValue> AuditTrailValues { get; set; }

        DbSet<Value> Values { get; set; }

        DbSet<Feedback> Feedbacks { get; set; }

        int SaveChanges();

        int SaveChangesAfterChangingKey();
    }
}
