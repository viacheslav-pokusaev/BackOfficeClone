using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;

namespace Application.DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>, IApplicationDbContext
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public DbSet<ApplicationRole> ApplicationRoles { get; set; }

        public DbSet<UserProfile> UsersProfiles { get; set; }

        public DbSet<RequestToCreateUser> RequestToCreateUsers { get; set; }

        public DbSet<Vacation> Vacations { get; set; }

        public DbSet<SickDay> SickDays { get; set; }

        public DbSet<SizeVacation> SizeVacations { get; set; }

        public DbSet<Overtime> Overtimes { get; set; }

        public DbSet<WorkAtHome> WorkAtHomes { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<ContactPerson> ContactPersons { get; set; }

        public DbSet<UserProfileProject> UserProfileProjects { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<RequestToUpdatePassword> RequestToUpdatePasswords { get; set; }

        public DbSet<CryptKey> CryptKeys { get; set; }

        public DbSet<CryptColumn> CryptColumns { get; set; }

        public DbSet<AuditTrail> AuditTrails { get; set; }

        public DbSet<AuditTrailEntity> AuditTrailEntities { get; set; }

        public DbSet<AuditTrailValue> AuditTrailValues { get; set; }

        public DbSet<Value> Values { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

        private IAuditTrailService _auditTrailService { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IAuditTrailService auditTrailService) : base(options)
        {
            _auditTrailService = auditTrailService;
        }

        public override int SaveChanges()
        {
            var addedEntities = new List<EntityEntry>();
            var modifiedEntities = new List<EntityEntry>();
            var deletedEntities = new List<EntityEntry>();

            foreach (var entity in ChangeTracker.Entries().Where(p => p.Metadata.Name != "Application.EntitiesModels.Entities.AuditTrail" && p.Metadata.Name != "Application.EntitiesModels.Entities.AuditTrailEntity" && p.Metadata.Name != "Application.EntitiesModels.Entities.AuditTrailValue"))
            {
                if (entity.State == EntityState.Added)
                    addedEntities.Add(entity);
                else if (entity.State == EntityState.Modified)
                    modifiedEntities.Add(entity);
                else if (entity.State == EntityState.Deleted)
                    deletedEntities.Add(entity);
            }

            if (addedEntities.Count > 0 || modifiedEntities.Count > 0 || deletedEntities.Count > 0)
            {
                var auditData = _auditTrailService.FormAndSaveAuditData(addedEntities, modifiedEntities, deletedEntities);
            }
            return base.SaveChanges();
        }

        public int SaveChangesAfterChangingKey()
        {
            var auditData = _auditTrailService.FormAndSaveDataAfterChangingKey(ChangeTracker.Entries().ToList());
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationRole>()
                .Property(a => a.Description)
                .HasMaxLength(250);

            modelBuilder.Entity<ApplicationUser>()
                .Property(a => a.FirstName)
                .HasMaxLength(250);

            modelBuilder.Entity<ApplicationUser>()
                .Property(a => a.LastName)
                .HasMaxLength(250);

            modelBuilder.Entity<RequestToCreateUser>()
                .Property(r => r.Email)
                .IsRequired();

            modelBuilder.Entity<RequestToCreateUser>()
                 .Property(r => r.Password)
                 .IsRequired();

            modelBuilder.Entity<RequestToCreateUser>()
                 .Property(r => r.DateCreate)
                 .IsRequired();

            modelBuilder.Entity<SickDay>()
                 .Property(s => s.DateBegin)
                 .IsRequired();

            modelBuilder.Entity<SickDay>()
                 .Property(s => s.DateEnd)
                 .IsRequired();

            modelBuilder.Entity<SickDay>()
                 .Property(s => s.CountDays)
                 .IsRequired();

            modelBuilder.Entity<Vacation>()
                 .Property(s => s.DateBegin)
                 .IsRequired();

            modelBuilder.Entity<Vacation>()
               .Property(s => s.DateEnd)
               .IsRequired();

            modelBuilder.Entity<Vacation>()
                .Property(s => s.CountDays)
                .IsRequired();
            
            modelBuilder.Entity<Overtime>()
                 .Property(o => o.DateBegin)
                 .IsRequired();

            modelBuilder.Entity<Overtime>()
               .Property(o => o.DateEnd)
               .IsRequired();

            modelBuilder.Entity<Overtime>()
                .Property(o => o.CountDays)
                .IsRequired();

            modelBuilder.Entity<WorkAtHome>()
                .Property(w => w.Date)
                .IsRequired();

            modelBuilder.Entity<SizeVacation>()
                .Property(s => s.CountDay)
                .IsRequired()
                .HasDefaultValue(0);

            modelBuilder.Entity<SizeVacation>()
                .HasAlternateKey(s => s.Year);          

            modelBuilder.Entity<Vacation>()
                .HasOne(v => v.UserProfile)
                .WithMany(up => up.Vacations)
                .HasForeignKey(v => v.UserProfileId);

            modelBuilder.Entity<Overtime>()
                .HasOne(o => o.UserProfile)
                .WithMany(up => up.Overtimes)
                .HasForeignKey(o => o.UserProfileId);

            modelBuilder.Entity<SickDay>()
                .HasOne(s => s.UserProfile)
                .WithMany(up => up.SickDays)
                .HasForeignKey(s => s.UserProfileId);

            modelBuilder.Entity<WorkAtHome>()
                .HasOne(w => w.UserProfile)
                .WithMany(up => up.WorkAtHomes)
                .HasForeignKey(w => w.UserProfileId);

            modelBuilder.Entity<UserProfile>()
                .HasOne(u => u.ApplicationUser)
                .WithOne(a => a.UserProfile);

            modelBuilder.Entity<UserProfile>()
                .HasMany(u => u.Projects)
                .WithOne(p => p.UserProfile)
                .HasForeignKey(u => u.UserProfileId);

            modelBuilder.Entity<Project>()
                .HasOne(p => p.Client)
                .WithMany(c => c.Projects)
                .HasForeignKey(p => p.ClientId);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Projects)
                .WithOne(p => p.Client);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.ContactPersons)
                .WithOne(cp => cp.Client);

            modelBuilder.Entity<ContactPerson>()
                .HasOne(cp => cp.Client)
                .WithMany(c => c.ContactPersons)
                .HasForeignKey(cp => cp.ClientId);

            modelBuilder.Entity<UserProfileProject>()
                .HasKey(up => up.Id);

            modelBuilder.Entity<UserProfileProject>()
                .HasOne(up => up.UserProfile)
                .WithMany(u => u.Projects)
                .HasForeignKey(up => up.UserProfileId);

            modelBuilder.Entity<UserProfileProject>()
                .HasOne(up => up.Project)
                .WithMany(p => p.Emploees)
                .HasForeignKey(up => up.ProjectId);

            modelBuilder.Entity<Image>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<Image>()
                .Property(i => i.Data).IsRequired();

            modelBuilder.Entity<AuditTrailEntity>()
                .HasOne(p => p.AuditTrail)
                .WithMany(b => b.AuditTrailEntities)
                .HasForeignKey(p => p.AuditTrailId);

            modelBuilder.Entity<AuditTrailValue>()
              .HasOne(p => p.AuditTrailEntity)
              .WithMany(b => b.AuditTrailValues)
              .HasForeignKey(p => p.AuditTrailEntityId);

            modelBuilder.Entity<Value>()
                .HasOne(v => v.AuditTrailEntity)
                .WithMany(ate => ate.Values)
                .HasForeignKey(v => v.AuditTrailEntityId);

            modelBuilder.Entity<Feedback>()
               .HasKey(f => f.Id);

            //modelBuilder.Entity<AuditTrailEntity>()
            //    .HasOne(ate => ate.Parent)
            //    .WithMany().
            //    HasForeignKey(ate => ate.AuditTrailEntityParentId);
        }

    }
}
