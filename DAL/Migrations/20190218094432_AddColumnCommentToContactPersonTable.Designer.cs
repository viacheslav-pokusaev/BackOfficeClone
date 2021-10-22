﻿// <auto-generated />
using Application.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Application.DAL.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190218094432_AddColumnCommentToContactPersonTable")]
    partial class AddColumnCommentToContactPersonTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Application.EntitiesModels.Entities.ApplicationRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName")
                        .HasMaxLength(250);

                    b.Property<bool>("IsEnabled");

                    b.Property<string>("LastName")
                        .HasMaxLength(250);

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<string>("Description");

                    b.Property<string>("OrganizationName");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.ContactPerson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClientId");

                    b.Property<string>("Comment");

                    b.Property<string>("CommunicationChannel");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("ContactPersons");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.CryptColumn", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ColumnName");

                    b.Property<string>("TableName");

                    b.HasKey("Id");

                    b.ToTable("CryptColumns");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.CryptKey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ChangingDate");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("CryptKeys");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Data")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Overtime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<int>("CountDays");

                    b.Property<DateTime>("DateBegin");

                    b.Property<DateTime>("DateEnd");

                    b.Property<int>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("UserProfileId");

                    b.ToTable("Overtimes");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClientId");

                    b.Property<string>("Comment");

                    b.Property<DateTime?>("DateBegin");

                    b.Property<DateTime?>("DateEnd");

                    b.Property<int>("EmploeeCount");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.RequestToCreateUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateBirthday");

                    b.Property<DateTime>("DateCreate");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Phone")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("RequestToCreateUsers");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.RequestToUpdatePassword", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("NewPassword");

                    b.HasKey("Id");

                    b.ToTable("RequestToUpdatePasswords");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.SickDay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<int>("CountDays");

                    b.Property<DateTime>("DateBegin");

                    b.Property<DateTime>("DateEnd");

                    b.Property<int>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("UserProfileId");

                    b.ToTable("SickDays");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.SizeVacation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CountDay")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasAlternateKey("Year");

                    b.ToTable("SizeVacations");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.UserProfile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ApplicationUserId");

                    b.Property<string>("Avatar");

                    b.Property<string>("Comment");

                    b.Property<DateTime?>("DateBeginTrialWork");

                    b.Property<DateTime?>("DateBeginWork");

                    b.Property<DateTime>("DateBirthday");

                    b.Property<string>("Hobbies");

                    b.Property<string>("ResidentialAddress");

                    b.Property<string>("Skills");

                    b.Property<string>("Skype");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId")
                        .IsUnique();

                    b.ToTable("UsersProfiles");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.UserProfileProject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<DateTime?>("DateFinishWork");

                    b.Property<DateTime?>("DateStartWork");

                    b.Property<string>("Position");

                    b.Property<int>("ProjectId");

                    b.Property<string>("Status");

                    b.Property<int>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UserProfileId");

                    b.ToTable("UserProfileProjects");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Vacation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<int>("CountDays");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<DateTime>("DateBegin");

                    b.Property<DateTime>("DateEnd");

                    b.Property<string>("Status");

                    b.Property<int>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("UserProfileId");

                    b.ToTable("Vacations");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.WorkAtHome", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment");

                    b.Property<DateTime>("Date");

                    b.Property<int>("UserProfileId");

                    b.HasKey("Id");

                    b.HasIndex("UserProfileId");

                    b.ToTable("WorkAtHomes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.ContactPerson", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.Client", "Client")
                        .WithMany("ContactPersons")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Overtime", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.UserProfile", "UserProfile")
                        .WithMany("Overtimes")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Project", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.Client", "Client")
                        .WithMany("Projects")
                        .HasForeignKey("ClientId");
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.SickDay", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.UserProfile", "UserProfile")
                        .WithMany("SickDays")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.UserProfile", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.ApplicationUser", "ApplicationUser")
                        .WithOne("UserProfile")
                        .HasForeignKey("Application.EntitiesModels.Entities.UserProfile", "ApplicationUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.UserProfileProject", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.Project", "Project")
                        .WithMany("Emploees")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Application.EntitiesModels.Entities.UserProfile", "UserProfile")
                        .WithMany("Projects")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.Vacation", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.UserProfile", "UserProfile")
                        .WithMany("Vacations")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Application.EntitiesModels.Entities.WorkAtHome", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.UserProfile", "UserProfile")
                        .WithMany("WorkAtHomes")
                        .HasForeignKey("UserProfileId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.ApplicationRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.ApplicationRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Application.EntitiesModels.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Application.EntitiesModels.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
