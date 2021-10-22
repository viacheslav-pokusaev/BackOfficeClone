using Application.EntitiesModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IFeedbackService
    {
        FeedbackViewModel Add(FeedbackViewModel model);
        FeedbackViewModel Remove(int id);
        FeedbackViewModel Update(FeedbackViewModel model);
        FeedbackViewModel GetById(int id);
        IEnumerable<FeedbackViewModel> GetByUserId(int id);
    }
}
