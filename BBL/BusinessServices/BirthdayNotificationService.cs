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

namespace Application.BBL.BusinessServices
{
    public class BirthdayNotificationService : IBirthdayNotificationService
    {
        private readonly IConfiguration _configuration;
        private readonly IDbContextFactory _dbContextFactory;
        private ISendEmailService _sendEmailService;

        private List<BirthdayNotificationInfo> allCollegues = new List<BirthdayNotificationInfo>();
        private List<BirthdayNotificationInfo> birthdayMonthCollegues = new List<BirthdayNotificationInfo>();
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

        public void CheckBirthday(bool checkingMonthListOfBirthday)
        {
            InitAllCollegues();

            if (!checkingMonthListOfBirthday)
            {
                short countDaysInWeek = 7;
                birthdayWeekCollegues =
                    allCollegues
                    .Where(u => Math.Abs(u.Birthday.DayOfYear - DateTime.Now.DayOfYear) == countDaysInWeek)
                    .Select(s => s).ToList();
            }
            else
            {
                short DaysInMonth = 31;
                birthdayMonthCollegues =
                    allCollegues
                    .Where(u => Math.Abs(u.Birthday.DayOfYear - DateTime.Now.DayOfYear) <= DaysInMonth + 1)
                    .Select(s => s).ToList();
            }

            if (birthdayMonthCollegues.Count > 0 || birthdayWeekCollegues.Count > 0)
            {
                GenereteRecipients(checkingMonthListOfBirthday);
                if (checkingMonthListOfBirthday)
                    GenerateEmail(emailSubject: "List of " + DateTime.Now.ToString("MMMM", CultureInfo.InvariantCulture) + " coming birthdays!", sendMonthListOfBirthday: true);
                else
                if (birthdayWeekCollegues.Count > 0)
                {
                    GenerateEmail(emailSubject: "Soon Birthday! List of week birthdays!", sendMonthListOfBirthday: false);
                }
            }
        }

        private void GenereteRecipients(bool checkingMonthListOfBirthday)
        {
            if (checkingMonthListOfBirthday)
            {
                var allColleguesExceptBirthdayCollegue = allCollegues.Except(birthdayMonthCollegues);
                foreach (var recipient in allColleguesExceptBirthdayCollegue)
                {
                    toEmail.Add(new EmailAddress(recipient.RecipientEmail));
                }
            }
            else
            {
                var allColleguesExceptBirthdayCollegue = allCollegues.Except(birthdayWeekCollegues);
                foreach (var recipient in allColleguesExceptBirthdayCollegue)
                {
                    toEmail.Add(new EmailAddress(recipient.RecipientEmail));
                }
            }
        }

        private void GenerateEmail(string emailSubject, bool sendMonthListOfBirthday)
        {
            var plainTextContent = "Notification about birthday!";
            var htmlContent = "<p>" + "We will have a birthday boys soon!</p>";
            string infotmationAboutBitrthday = "";
            if (sendMonthListOfBirthday)
                foreach (var collegue in birthdayMonthCollegues)
                {
                    infotmationAboutBitrthday +=
                        "<p>" +
                        collegue.FullName + " - " +
                        collegue.Birthday.ToShortDateString() +
                        "</p>";
                }
            else
                foreach (var collegue in birthdayWeekCollegues)
                {
                    infotmationAboutBitrthday +=
                        "<p>" +
                        "After 7 days" +
                        "</p>" +
                        "<p>" +
                        collegue.FullName + " - " +
                        collegue.Birthday.ToShortDateString() +
                        "</p>";
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
