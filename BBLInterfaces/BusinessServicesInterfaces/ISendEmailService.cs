using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface ISendEmailService
    {
        void SendEmail(List<EmailAddress> toEmail, string emailSubject, string plainTextContent, string htmlContent);
    }
}
