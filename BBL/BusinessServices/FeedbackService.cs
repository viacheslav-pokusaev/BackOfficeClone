using Application.BBL.Mapper;
using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.BBL.BusinessServices
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IDbContextFactory _dbContextFactory;

        public FeedbackService(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public FeedbackViewModel Add(FeedbackViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                context.Feedbacks.Add(new Feedback() { UserId = model.UserId, AuthorId = model.AuthorId, ProjectName = model.ProjectName, Position = model.Position, Description = model.Feedback});
                context.SaveChanges();
            }

            return model;
        }

        public FeedbackViewModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var feedback = context.Feedbacks.Include(f => f.Id == id).FirstOrDefault(f => f.Id == id);

                if (feedback == null)
                    throw new Exception("Feedback not found");

                return new FeedbackViewModel() { UserId = feedback.UserId, AuthorId = feedback.AuthorId, ProjectName = feedback.ProjectName, Position = feedback.Position, Feedback = feedback.Description, AuthorFullName = feedback.Author.FirstName + " " + feedback.Author.LastName};
            }
        }

        public IEnumerable<FeedbackViewModel> GetByUserId(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var feedbacks = context.Feedbacks.Where(f => f.UserId == id).Include(f => f.Author).ToList();

                if (feedbacks == null)
                    throw new Exception("Feedbacks not found");

                return feedbacks.Select(f => new FeedbackViewModel() { Id = f.Id, UserId = f.UserId, AuthorId = f.AuthorId, ProjectName = f.ProjectName, Position = f.Position, Feedback = f.Description, AuthorFullName = f.Author.FirstName + " " + f.Author.LastName });
            }
        }

        public FeedbackViewModel Remove(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var feedback = context.Feedbacks.FirstOrDefault(f => f.Id == id);
                context.Feedbacks.Remove(feedback);
                context.SaveChanges();
                return null;
            }
        }

        public FeedbackViewModel Update(FeedbackViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var feedback = context.Feedbacks.FirstOrDefault(f => f.Id == model.Id);
                feedback.ProjectName = model.ProjectName;
                feedback.Position = model.Position;
                feedback.Description = model.Feedback;
                context.Feedbacks.Update(feedback);
                context.SaveChanges();
                return model;
            }
        }
    }
}
