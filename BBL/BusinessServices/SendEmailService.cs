using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBL.BusinessServices
{
    public class SendEmailService : ISendEmailService
    {
        private readonly IConfiguration _configuration;
        private ILogger<SendEmailService> _logger;

        public SendEmailService(IConfiguration configuration, ILogger<SendEmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public void SendEmail(List<EmailAddress> toEmail, string emailSubject, string plainTextContent, string htmlContent)
        {
            var client = new SendGridClient(_configuration.GetValue<string>("SendGrid:apiKey"));
            var fromEmail = new EmailAddress(_configuration.GetValue<string>("SendGrid:from"));
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(fromEmail, toEmail, emailSubject, plainTextContent, htmlContent);

            try
            {
                client.SendEmailAsync(msg).ContinueWith((res) =>
                {
                    var sendResult = res.Result.Body.ReadAsStringAsync();
                    if (sendResult.Result == "")
                        _logger.LogInformation("Email sent");
                    else
                        _logger.LogError("Email didn't send! " + sendResult.Result);
                });
            }
            catch (Exception ex)
            {
                _logger.LogError("Unexpected error in SendEmailService! " + ex.Message);
                return;
            }
        }
    }
}
