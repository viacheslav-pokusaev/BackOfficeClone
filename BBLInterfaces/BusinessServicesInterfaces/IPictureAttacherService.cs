using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IPictureAttacherService
    {
        string GetBase64String(string url = "");
        byte[] GetPictureData(int id);
        int AddPicture(byte[] picture);
        bool DeletePicture(int id);
    }
}
