USE BackOfficeDev
GO

insert AspNetRoles ( ConcurrencyStamp, Description, Name, NormalizedName) values (N'9cf76af0-4a61-4748-b31f-b943e6c41a05', N'Full rights role', N'Admin', N'ADMIN')
insert AspNetRoles ( ConcurrencyStamp, Description, Name, NormalizedName) values (N'7bb2be1b-2014-4b45-a620-cead84002b77', N'Limited rights role', N'User', N'USER')
declare @RoleAdminId int
declare @RoleUserId int
select @RoleUserId = ( select id from AspNetRoles
where Name = N'User')
select @RoleAdminId = ( select id from AspNetRoles
where Name = N'Admin')

/* Vitaly */
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values (0, N'3d29ed93-9a65-404d-b87b-05f763b83900', CAST(N'2018-03-27T11:48:11.1104914' AS DateTime2), N'vitaly.kiriloff@gmail.com', 1, N'Vitaly', 1, N'Kirilov', 1, NULL, N'VITALY.KIRILOFF@GMAIL.COM', N'VITALY.KIRILOFF@GMAIL.COM', N'AQAAAAEAACcQAAAAEGFlf6iwIKjSTxMfJXeOY9lV1cP3ICkN92gFtSv5h0pjJx8odYzxBIhgBBxq5FKbNw==', N'+380504532696', 0, N'aedcbe5f-ac24-4445-88e7-f705bc99763a', 0, N'vitaly.kiriloff@gmail.com')
declare @vitalykiriloffgmailcomId int
select @vitalykiriloffgmailcomId = ( select id from AspNetUsers
where Email = N'vitaly.kiriloff@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@vitalykiriloffgmailcomId, @RoleAdminId)
insert UsersProfiles (ApplicationUserId, Comment, DateBeginWork, DateBirthday) values ( @vitalykiriloffgmailcomId, N'Begin work isn''t correct.', CAST(N'2015-07-01T00:00:00.0000000' AS DateTime2), CAST(N'1978-12-23T00:00:00.0000000' AS DateTime2))

/* Sergey */
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values (0, N'60999037-ff3c-4493-a7d8-506e8a221275', CAST(N'2018-03-27T11:48:11.2315142' AS DateTime2), N'kykyfyfy888@gmail.com', 1, N'Sergey', 1, N'Sachko', 1, NULL, N'KYKYFYFY888@GMAIL.COM', N'KYKYFYFY888@GMAIL.COM', N'AQAAAAEAACcQAAAAEInK2//ORdNyaC+NB0h2loG8dSl3ovKBvPcra0xpKv5uHUjMHbVCj12PZjLqMktFHw==', N'+380632503262', 0, N'a418fd22-ab31-4051-a694-b50f5fc81ebd', 0, N'kykyfyfy888@gmail.com')
declare @kykyfyfy888gmailcomId int
declare @profileSergeyId int
select @kykyfyfy888gmailcomId = (select id from AspNetUsers
where Email = N'kykyfyfy888@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@kykyfyfy888gmailcomId, @RoleUserId)
insert UsersProfiles(ApplicationUserId, Comment, DateBeginWork, DateBirthday) values (@kykyfyfy888gmailcomId, N'', CAST(N'2017-05-01T00:00:00.0000000' AS DateTime2), CAST(N'1994-08-08T00:00:00.0000000' AS DateTime2))

select @profileSergeyId = (select id from UsersProfiles
where ApplicationUserId = @kykyfyfy888gmailcomId)

insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileSergeyId, NULL, CAST(N'2018-01-02T00:00:00.0000000' AS DateTime2), CAST(N'2018-04-05T00:00:00.0000000' AS DateTime2), 4)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileSergeyId, NULL, CAST(N'2018-03-09T00:00:00.0000000' AS DateTime2), CAST(N'2018-03-09T00:00:00.0000000' AS DateTime2), 1)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileSergeyId, NULL, CAST(N'2018-04-04T00:00:00.0000000' AS DateTime2), CAST(N'2018-04-04T00:00:00.0000000' AS DateTime2), 1)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileSergeyId, N'Для правильной работы', CAST(N'2017-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2017-12-31T00:00:00.0000000' AS DateTime2), 11)

/*Pavel Bulash*/
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values (0, N'f0bb2bac-7190-4de3-9655-5bcf85ddec83', CAST(N'2018-03-27T20:04:03.3290003' AS DateTime2), N'pavel.bulash@gmail.com', 1, N'Pavel', 1, N'Bulash', 1, NULL, N'PAVEL.BULASH@GMAIL.COM', N'PAVEL.BULASH@GMAIL.COM', N'AQAAAAEAACcQAAAAECLDPm+BHxA+tarv9h6MoMdAcnN4LBa+3MPvJjJv1xZO6Ebl7mWeKoUurKbtBh3aZg==', N'+380665735625', 0, N'f86e1004-f78d-49b1-87d0-68ca107bce9a', 0, N'pavel.bulash@gmail.com')
declare @pavelbulashgmailcomId int
declare @profileBulashId int
select @pavelbulashgmailcomId = (select id from AspNetUsers
where Email = N'pavel.bulash@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@pavelbulashgmailcomId, @RoleUserId)
insert UsersProfiles (ApplicationUserId, Comment, DateBeginWork, DateBirthday) values (@pavelbulashgmailcomId, NULL, CAST(N'2016-08-01T00:00:00.0000000' AS DateTime2), CAST(N'1988-03-03T00:00:00.0000000' AS DateTime2))

select @profileBulashId = (select id from UsersProfiles
where ApplicationUserId = @pavelbulashgmailcomId)

insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileBulashId, NULL, CAST(N'2018-01-02T00:00:00.0000000' AS DateTime2), CAST(N'2018-04-08T00:00:00.0000000' AS DateTime2), 5)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileBulashId, NULL, CAST(N'2017-08-14T00:00:00.0000000' AS DateTime2), CAST(N'2017-08-18T00:00:00.0000000' AS DateTime2), 5)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileBulashId, NULL, CAST(N'2017-07-07T00:00:00.0000000' AS DateTime2), CAST(N'2017-07-11T00:00:00.0000000' AS DateTime2), 3)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileBulashId, NULL, CAST(N'2017-05-08T00:00:00.0000000' AS DateTime2), CAST(N'2017-05-08T00:00:00.0000000' AS DateTime2), 1)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileBulashId, NULL, CAST(N'2017-01-03T00:00:00.0000000' AS DateTime2), CAST(N'2017-01-06T00:00:00.0000000' AS DateTime2), 4)
insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileBulashId, N'Для правильной работы', CAST(N'2016-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2016-12-31T00:00:00.0000000' AS DateTime2), 8)

/*Konstantin*/
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values (0, N'd9be6629-ff79-404c-a1c8-a62e60916ff4', CAST(N'2018-03-27T20:16:12.8758934' AS DateTime2), N'k.i.geiko@gmail.com', 1, N'Konstiantyn', 1, N'Geiko', 1, NULL, N'K.I.GEIKO@GMAIL.COM', N'K.I.GEIKO@GMAIL.COM', N'AQAAAAEAACcQAAAAEN7VbpKaZDS5k7ViEV5ROHPxQUn2IyeDeRZJ+k/9MALtxVzvp3ourtrPkzJ9Aspp2Q==', N'+380503622500', 0, N'd2ddf9cd-a522-4b81-89a7-1a8e832eb7b8', 0, N'k.i.geiko@gmail.com')
declare @kigeikogmailcomId int
declare @profileKonstantinId int

select @kigeikogmailcomId = (select id from AspNetUsers
where Email = N'k.i.geiko@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@kigeikogmailcomId, @RoleUserId)
INSERT UsersProfiles (ApplicationUserId, Comment, DateBeginWork, DateBirthday) values (@kigeikogmailcomId, N'Birthday isn''t correct', CAST(N'2017-06-01T03:00:00.0000000' AS DateTime2), CAST(N'1990-01-01T00:00:00.0000000' AS DateTime2))

select @profileKonstantinId = (select id from UsersProfiles
where ApplicationUserId = @kigeikogmailcomId)

insert Vacations (UserProfileId, Comment, DateBegin, DateEnd, CountDays) values (@profileKonstantinId, N'Для правильной работы', CAST(N'2017-12-31T00:00:00.0000000' AS DateTime2), CAST(N'2017-12-31T00:00:00.0000000' AS DateTime2), 11)

/*Pavel Pikuza*/
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values ( 0, N'94d7a658-5f19-4b5e-9048-214bd2bf9864', CAST(N'2018-03-28T17:12:25.2612515' AS DateTime2), N'pavel.pikuza1@gmail.com', 1, N'Pavel', 1, N'Pikuza', 1, NULL, N'PAVEL.PIKUZA1@GMAIL.COM', N'PAVEL.PIKUZA1@GMAIL.COM', N'AQAAAAEAACcQAAAAELtM0OKiuszpmkms3WvFFYn96FbEny6sYZ8s2CNA0Gowf8f0A1Q3lqClazfPEc80gA==', N'+380631722018', 0, N'497793b6-0348-45e6-a598-2db556ddb3e3', 0, N'pavel.pikuza1@gmail.com')
declare @pavelpikuza1gmailcomId int
select @pavelpikuza1gmailcomId = ( select id from AspNetUsers
where Email = N'pavel.pikuza1@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@pavelpikuza1gmailcomId, @RoleUserId)
INSERT UsersProfiles (ApplicationUserId, Comment, DateBeginWork, DateBirthday) values (@pavelpikuza1gmailcomId, N'Begin work isn''t correct.', CAST(N'2016-08-13T00:00:00.0000000' AS DateTime2), CAST(N'1996-01-17T00:00:00.0000000' AS DateTime2))


/*Jarik*/
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values (0, N'e3473572-1fac-45e4-9569-f82e1f788210', CAST(N'2018-04-06T16:50:48.0873699' AS DateTime2), N'jarekrzdbk@gmail.com', 1, N'Jaroslav', 1, N'Rozdobudko', 1, NULL, N'JAREKRZDBK@GMAIL.COM', N'JAREKRZDBK@GMAIL.COM', N'AQAAAAEAACcQAAAAENlMKPRu5uZsx2ajEY/B7NKkbKKHhPUtDzvbptBCiHvCicIqmn5F4mq6YJzdXtGFRQ==', N'+380931144083', 0, N'a1be845b-24ae-4edc-b992-9ab824b00a71', 0, N'jarekrzdbk@gmail.com')
declare @jarekrzdbkgmailcomId int
select @jarekrzdbkgmailcomId = ( select id from AspNetUsers
where Email = N'jarekrzdbk@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@jarekrzdbkgmailcomId, @RoleUserId)
INSERT UsersProfiles (ApplicationUserId, Comment, DateBeginWork, DateBirthday) values (@jarekrzdbkgmailcomId, N'Birthday isn''t correct.', CAST(N'2015-07-01T00:00:00.0000000' AS DateTime2), CAST(N'1990-01-01T00:00:00.0000000' AS DateTime2))


/*Dmitriy*/
insert AspNetUsers (AccessFailedCount, ConcurrencyStamp, CreatedDate, Email, EmailConfirmed, FirstName, IsEnabled, LastName, LockoutEnabled, LockoutEnd, NormalizedEmail, NormalizedUserName, PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName) values (0, N'0eac7bc7-f7dc-45dc-bf63-054857dc637c', CAST(N'2018-04-06T16:54:26.2656870' AS DateTime2), N'dmitrijkripak@gmail.com', 1, N'Dmitrij', 1, N'Kripak', 1, NULL, N'DMITRIJKRIPAK@GMAIL.COM', N'DMITRIJKRIPAK@GMAIL.COM', N'AQAAAAEAACcQAAAAEOYajcHblOhx8S96p+FZ4NX/Bs+WunQPIaqUTS/SutOj0CcTvBYT8eIa/1DHNO/gYQ==', N'+380505589338', 0, N'4827f4b4-cda9-40e9-b296-de603d1c7beb', 0, N'dmitrijkripak@gmail.com')
declare @dmitrijkripakgmailcomId int
select @dmitrijkripakgmailcomId = ( select id from AspNetUsers
where Email = N'dmitrijkripak@gmail.com')

insert AspNetUserRoles (UserId, RoleId) values (@dmitrijkripakgmailcomId, @RoleUserId)
insert UsersProfiles (ApplicationUserId, Comment, DateBeginWork, DateBirthday) values (@dmitrijkripakgmailcomId, N'Begin work isn''t correct.', CAST(N'2018-06-13T00:00:00.0000000' AS DateTime2), CAST(N'1985-05-13T00:00:00.0000000' AS DateTime2))

insert SizeVacations (CountDay, Year) values (20, 2015)
insert SizeVacations (CountDay, Year) values (20, 2016)
insert SizeVacations (CountDay, Year) values (20, 2017)
insert SizeVacations (CountDay, Year) values (20, 2018)

