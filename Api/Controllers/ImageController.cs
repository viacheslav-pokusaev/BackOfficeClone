using Application.BBLInterfaces.BusinessServicesInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Application.Api.Controllers
{
    public class ImageController : ApplicationApiController
    {
        private IPictureAttacherService _pictureAttacherService;

        public ImageController(IPictureAttacherService pictureAttacherService)
        {
            _pictureAttacherService = pictureAttacherService;
        }
        [Authorize]
        [HttpPost]
        [Route("~/api/uploadImage")]
        public IActionResult UploadImage(IFormFile file)
        {
            try
            {
                if (file == null) throw new Exception("File is null");
                if (file.Length == 0) throw new Exception("File is empty");

                byte[] fileData = null;
                using (var memoryStream = file.OpenReadStream())
                {
                    using (var binaryReader = new BinaryReader(memoryStream))
                    {
                        fileData = binaryReader.ReadBytes((int)file.Length);
                    }
                }
                var result = _pictureAttacherService.AddPicture(fileData);

                if (result > 0)
                    return Json(new { link = "/api/getImage/" + result });
                else
                    throw new Exception("Image was not found");

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }


        [HttpGet]
        [Route("~/api/getImage/{id:int}")]
        public IActionResult GetImage(int id)
        {
            var result = _pictureAttacherService.GetPictureData(id);
            if (result.Length > 0)
            {
                return File(result, "images/jpeg");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Image was not found");
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("~/api/deleteImage/{id:int}")]
        public IActionResult DeleteImage(int id)
        {
            return InvokeMethodWithParam(_pictureAttacherService.DeletePicture, id);
        }
    }
}
