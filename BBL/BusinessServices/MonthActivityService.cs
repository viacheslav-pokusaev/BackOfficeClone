using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Application.BBL.BusinessServices
{
    public class MonthActivityService : IMonthActivityService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static readonly string ApplicationName = "Dot Tutorials";
        static readonly string sheet = "October'21";
        static readonly string SpreadsheetId = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";

        static SheetsService service;
        public List<List<MonthActivityModel>> GetAllVacationsFromSheet()
        {
            GoogleCredential credential;
            //Reading Credentials File...
            using (var stream = new FileStream("inlaid-crowbar-330810-0492784c4579.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
            }

            // Creating Google Sheets API service...
            service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Specifying Column Range for reading...
            var range = $"{sheet}!A:AJ";
            var request = service.Spreadsheets.Values.Get(SpreadsheetId, range);
            // Ecexuting Read Operation...
            var response = request.Execute();
            // Getting all records from Column A to AJ...
            var sheetValues = response.Values;
            var readSheetResponce = new List<List<MonthActivityModel>>();

            int rowIndex = 0;
            int columnIndex = 0;

            foreach(var sheetRow in sheetValues)
            {
                var responceBuff = new List<MonthActivityModel>();
                foreach(var sheetValue in sheetRow)
                {
                    responceBuff.Add(new MonthActivityModel() { RowIndex = rowIndex, ColumnIndex = columnIndex, Data = sheetValue.ToString() });
                    columnIndex++;
                }
                readSheetResponce.Add(responceBuff);
                columnIndex = 0;
                rowIndex++;
            }
            return readSheetResponce;
        }

        public bool UpdateVacationOnSheet(MonthActivityModel vacation)
        {
            throw new NotImplementedException();
        }
    }
}
