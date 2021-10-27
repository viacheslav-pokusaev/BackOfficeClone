using Application.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Application.BBLInterfaces.BusinessServicesInterfaces;
using Microsoft.Win32;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.EntityFrameworkCore.Extensions.Internal;
using Microsoft.Extensions.Configuration;
using System.Threading;
using Application.EntitiesModels.Models;
using System.Globalization;
using Microsoft.AspNetCore.Identity;
using Application.EntitiesModels.Entities;
using static Application.EntitiesModels.Models.BirthdayNotificationInfo;

namespace Application.BBL.BusinessServices
{
    public class BirthdayNotificationService : IBirthdayNotificationService
    {
        private readonly IConfiguration _configuration;
        private readonly IDbContextFactory _dbContextFactory;
        private ISendEmailService _sendEmailService;

        private List<BirthdayNotificationInfo> allCollegues = new List<BirthdayNotificationInfo>();
        private List<BirthdayNotificationInfo> birthdayMonthCollegues = new List<BirthdayNotificationInfo>();
        private List<BirthdayNotificationInfo> birthdayTwoWeekCollegues = new List<BirthdayNotificationInfo>();
        private List<BirthdayNotificationInfo> birthdayWeekCollegues = new List<BirthdayNotificationInfo>();

        private List<EmailAddress> toEmail = new List<EmailAddress>();

        public BirthdayNotificationService(
            IConfiguration configuration,
            IDbContextFactory dbContextFactory,
            ISendEmailService sendEmailService, UserManager<ApplicationUser> userManager)
        {
            _configuration = configuration;
            _dbContextFactory = dbContextFactory;
            _sendEmailService = sendEmailService;
        }

        private void InitAllCollegues()
        {
            using (var context = _dbContextFactory.Create())
            {
                allCollegues = context.ApplicationUsers
                    .Select(s => new BirthdayNotificationInfo
                    {
                        FullName = s.FirstName + " " + s.LastName,
                        Birthday = s.UserProfile != null ? s.UserProfile.DateBirthday : new DateTime(),
                        RecipientEmail = s.Email,
                    }).ToList();
            }
        }

        public void CheckBirthday(Enum checkingUpcomingBirthdays)
        {
            InitAllCollegues();

            if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Week))
            {
                short countDaysInWeek = (short) UpcomingBirthdays.Week;
                birthdayWeekCollegues =
                    allCollegues
                    .Where(u => Math.Abs(u.Birthday.DayOfYear - DateTime.Now.DayOfYear) == countDaysInWeek)
                    .Select(s => s).ToList();
            }
            else if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.TwoWeek))
            {
                short countDaysInTwoWeek = (short) UpcomingBirthdays.TwoWeek;
                birthdayTwoWeekCollegues =
                    allCollegues
                    .Where(u => Math.Abs(u.Birthday.DayOfYear - DateTime.Now.DayOfYear) == countDaysInTwoWeek)
                    .Select(s => s).ToList();
            }
            else if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Month))
            {
                short DaysInMonth = (short) UpcomingBirthdays.Month;
                birthdayMonthCollegues =
                    allCollegues
                    .Where(u => Math.Abs(u.Birthday.DayOfYear - DateTime.Now.DayOfYear) <= DaysInMonth + 1)
                    .Select(s => s).ToList();
            }

            if (birthdayMonthCollegues.Count > 0 || birthdayWeekCollegues.Count > 0 || birthdayTwoWeekCollegues.Count > 0)
            {
                GenereteRecipients(checkingUpcomingBirthdays);
                if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Month) && birthdayMonthCollegues.Count > 0)
                    GenerateEmail(emailSubject: "List of " + DateTime.Now.ToString("MMMM", CultureInfo.InvariantCulture) + " upcoming birthdays!", checkingUpcomingBirthdays);

                else
                if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.TwoWeek) && birthdayTwoWeekCollegues.Count > 0)
                {
                    GenerateEmail(emailSubject: "Soon Birthday! List of two week birthdays!", checkingUpcomingBirthdays);
                }

                else
                if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Week) && birthdayWeekCollegues.Count > 0)
                {
                    GenerateEmail(emailSubject: "Soon Birthday! List of week birthdays!", checkingUpcomingBirthdays);
                }



            }
        }

        private void GenereteRecipients(Enum checkingUpcomingBirthdays)
        {
            if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Month))
            {
                var allColleguesExceptBirthdayCollegue = allCollegues.Except(birthdayMonthCollegues);
                foreach (var recipient in allColleguesExceptBirthdayCollegue)
                {
                    toEmail.Add(new EmailAddress(recipient.RecipientEmail));
                }
            }
            else if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Week))
            {
                var allColleguesExceptBirthdayCollegue = allCollegues.Except(birthdayWeekCollegues);
                foreach (var recipient in allColleguesExceptBirthdayCollegue)
                {
                    toEmail.Add(new EmailAddress(recipient.RecipientEmail));
                }
            }
            else if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.TwoWeek))
            {
                var allColleguesExceptBirthdayCollegue = allCollegues.Except(birthdayTwoWeekCollegues);
                foreach (var recipient in allColleguesExceptBirthdayCollegue)
                {
                    toEmail.Add(new EmailAddress(recipient.RecipientEmail));
                }
            }
        }

        private void GenerateEmail(string emailSubject, Enum checkingUpcomingBirthdays)
        {
            var plainTextContent = "Notification about birthday!";
            var htmlContent = "<p>" + "We will have a birthday boys soon!</p>";
            string infotmationAboutBitrthday = "";
            if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Month))
                foreach (var collegue in birthdayMonthCollegues)
                {
                    infotmationAboutBitrthday +=
                        "<p>" +
                        collegue.FullName + " - " +
                        collegue.Birthday.ToShortDateString() +
                        "</p>";
                }
            else if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.TwoWeek))
            {
                infotmationAboutBitrthday +=
                        "<p>After 14 days</p>";
                foreach (var collegue in birthdayTwoWeekCollegues)
                {
                    infotmationAboutBitrthday +=
                        "<p>" +
                        collegue.FullName + " - " +
                        collegue.Birthday.ToShortDateString() +
                        "</p>";
                }
            }
            else if (checkingUpcomingBirthdays.Equals(UpcomingBirthdays.Week))
            {
                infotmationAboutBitrthday +=
                        "<p>After 7 days</p>";
                foreach (var collegue in birthdayWeekCollegues)
                {
                    infotmationAboutBitrthday +=
                        "<p>" +
                        collegue.FullName + " - " +
                        collegue.Birthday.ToShortDateString() +
                        "</p>";
                }
            }

            htmlContent += infotmationAboutBitrthday;
            _sendEmailService.SendEmail(toEmail, emailSubject, plainTextContent, htmlContent);
            ClearLists();
        }

        private void ClearLists()
        {
            birthdayMonthCollegues.Clear();
            birthdayWeekCollegues.Clear();
            toEmail.Clear();
            allCollegues.Clear();
        }
    }
}
