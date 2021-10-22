using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Application.EntitiesModels.Entities;
using Microsoft.Extensions.Logging;

namespace Application.BBL.BusinessServices
{
    public class PictureAttacherService : IPictureAttacherService
    {
        private readonly IDbContextFactory _dbContextFactory;
        private ILogger<UserViewServices> _logger;

        public PictureAttacherService(IDbContextFactory dbContextFactory, 
            ILogger<UserViewServices> logger)
        {
            _dbContextFactory = dbContextFactory;
            _logger = logger;
        }

        public int AddPicture(byte[] picture)
        {
            using (var context = _dbContextFactory.Create())
            {
                var image = new Image()
                {
                    Data = picture
                };
                context.Images.Add(image);
                context.SaveChanges();

                return image.Id;
            }
        }
     
        public bool DeletePicture(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var image = context.Images.FirstOrDefault(i => i.Id == id);
                if (image == null)
                    throw new Exception("Image was not found ");

                context.Images.Remove(image);

                context.SaveChanges();

                return true;
            }
        }

        public byte[] GetPictureData(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var image = context.Images.Where(i => i.Id == id).FirstOrDefault();

                if (image == null)
                    throw new Exception("Image was not found");

                return image.Data;
            }
        }

        public string GetBase64String(string url = "")
        {
            try
            {
                byte[] data;
                if (url != "")
                {
                    int id = int.Parse(url.Split('/').Last());
                    data = GetPictureData(id);
                }
                else
                {
                    int defaultImgId = 1;
                    data = GetPictureData(defaultImgId);
                }
                string base64String = Convert.ToBase64String(data, 0, data.Length);
                var src = "data:image/jpg;base64," + base64String;
                return src;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "";
            }
        }
    }
}
