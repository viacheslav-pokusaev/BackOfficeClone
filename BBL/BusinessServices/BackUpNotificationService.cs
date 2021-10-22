using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.BBL.BusinessServices
{
    public class BackUpNotificationService : IBackUpNotificationService
    {
        private readonly IConfiguration _configuration;
        private ISendEmailService _sendEmailService;

        private readonly UserManager<ApplicationUser> _userManager;
        private IList<ApplicationUser> itUsers;
        private List<EmailAddress> toEmail = new List<EmailAddress>();

        public BackUpNotificationService(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager, 
            ISendEmailService sendEmailService)
        {
            _configuration = configuration;
            _userManager = userManager;
            _sendEmailService = sendEmailService;
        }


        private void InitColleguesBackUp()
        {
            itUsers = _userManager.GetUsersInRoleAsync("IT_Infracstructure").Result;
        }

        public void CheckBackUp()
        {
            InitColleguesBackUp();
            GenereteRecipients();
            SendEmail();
        }

        private void GenereteRecipients()
        {
            foreach (var itUser in itUsers)
            {
                toEmail.Add(new EmailAddress(itUser.Email));
            }
        }

        private void SendEmail()
        {
            var plainTextContent = "Notification about birthday!";
            var htmlContent = "<p>" + "List of people, who responcibility on BackUp</p>";
            foreach (var itUser in itUsers)
            {
                htmlContent +=
                    "<p>" +
                    itUser.FirstName + " " + itUser.LastName + " - " +
                    itUser.Email +
                    "</p>";
            }
            string emailSubject = "Notification about BackUp all systems";

            _sendEmailService.SendEmail(toEmail, emailSubject, plainTextContent, htmlContent);

            ClearLists();
        }

        private void ClearLists()
        {
            toEmail.Clear();
            itUsers.Clear();
        }
    }
}
