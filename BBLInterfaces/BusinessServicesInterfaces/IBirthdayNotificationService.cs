﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IBirthdayNotificationService
    {
        void CheckBirthday(Enum checkPeriod);
    }
}
